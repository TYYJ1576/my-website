import bcrypt from 'bcryptjs'
import type { NextAuthOptions } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@auth/mongodb-adapter'

import { connectDB } from '@/lib/mongodb/mongodb'
import UserModel from '@/models/User'
import client from '../mongodb/db'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const GOOGLE_SMTP_PASS = process.env.GOOGLE_SMTP_PASS

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    EmailProvider({
      server: {
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
          user: EMAIL_ADDRESS!,
          pass: GOOGLE_SMTP_PASS!,
        },
      },
      from: EMAIL_ADDRESS!,
    }),
    credentials({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // find the email and temporary take out password
        await connectDB()
        const user = await UserModel.findOne({
          email: credentials?.email,
        }).select('+password')

        // throw errors
        if (!user) throw new Error('Invalid Email')
        if (!user.password) {
          throw new Error('User exists')
        }

        // compare password and throw error if not matched
        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        )
        if (!passwordMatch) throw new Error('Incorrect Password')

        // check if the email is verified
        const userWithEmailVerified = await UserModel.findOne({
          email: credentials?.email,
          emailVerified: { $exists: true },
        })
        if (!userWithEmailVerified) {
          throw new Error('Email not verified')
        }

        return user
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/dev/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + '/auth'
    },
    async signIn(params) {
      const { user, account, profile, email } = params
      if (account?.provider === 'email' && user.email) {
        if (email?.verificationRequest === true) {
          try {
            // remove the old token for the same email address if the user ask for another email
            const db = client.db()
            await db
              .collection('verification_tokens')
              .deleteMany({ identifier: user.email })
          } catch (e) {
            console.error('Failed to delete extra tokens from database')
          }
        }
      }
      return true
    },
  },
}

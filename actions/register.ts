'use server'

import bcrypt from 'bcryptjs'

import { connectDB } from '@/lib/mongodb/mongodb'
import User from '@/models/User'
import { SignInSchema } from '@/lib/zod/schema'
import { ValidateWithZod } from '@/lib/zod/validation'
import { SignInDataType, AuthResponseType } from '@/lib/types'

/**
 * Registers a new user with email, name, and password.
 *
 * Workflow:
 * - Validates input data using Zod schema.
 * - Checks if user already exists and has verified email.
 * - Hashes password before saving.
 * - Upserts (creates or updates) user in the database.
 *
 * @param {SignInDataType} values The user's registration data.
 * @returns {Promise<AuthResponseType>}
 *  - success: Returned if the user is registered successfully.
 *  - error: Returned if there is a general error.
 *  - fieldErrors: Detailed field validation errors (if any).
 */

export const register = async (
  values: SignInDataType
): Promise<AuthResponseType> => {
  try {
    // Validate input data with Zod schema
    const verifiedData = ValidateWithZod(SignInSchema, values)
    if (!verifiedData.success) {
      return { error: 'Validation failed', fieldErrors: verifiedData.errors }
    }

    // Extract validated fields
    const { email, password, name } = verifiedData.data

    // Connect to MongoDB
    await connectDB()

    // Check if a user with this email and a verified email already exists
    const userWithEmailVerified = await User.findOne({
      email: email,
      emailVerified: { $exists: true },
    })
    if (userWithEmailVerified) {
      return { error: 'User exists' }
    }

    // Hash the user's password securely
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new user or update an unverified user with the same email
    await User.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        providerType: 'email',
      },
      {
        upsert: true,
        new: true,
      }
    )

    // Return success message
    return { success: 'Registration successful' }
  } catch (err) {
    // Handle unexpected errors
    console.log({ message: 'Unexpected error', details: err })
    return { error: 'Registration failed' }
  }
}

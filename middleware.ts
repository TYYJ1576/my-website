import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/dev',
    error: '/dev',
  },
  callbacks: {
    authorized({ token }) {
      return !!token
    },
  },
})

export const config = { matcher: ['/auth/:path*'] }

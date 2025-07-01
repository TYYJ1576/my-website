'use server'

import { connectDB } from '@/lib/mongodb/mongodb'
import User from '@/models/User'
import { AuthResponseType, VerifyResetTokenType } from '@/lib/types'

/**
 * Verifies a password reset token and optionally extends its expiry.
 *
 * Workflow:
 * - Destructure input parameters, defaulting addTime to true.
 * - Find a user with the given reset token.
 * - Check if the reset token is still valid (not expired).
 *
 * @param {VerifyResetTokenType} params The user's registration data.
 * @returns {Promise<AuthResponseType>}
 *  - success: Token is verified successfully.
 *  - error: Returned if there is a general error.
 *  - fieldErrors: Detailed field validation errors (if any).
 */

async function VerifyResetToken(
  params: VerifyResetTokenType
): Promise<AuthResponseType> {
  try {
    // Extract input parameters, defaulting addTime to true
    const { token, addTime = true } = params

    // Connect to MongoDB
    await connectDB()

    // Find a user with the given reset token
    const userData = await User.findOne({ resetToken: token })
    if (!userData) {
      return { error: 'Token not found' }
    }

    // Check if the reset token is still valid (not expired)
    if (userData.resetTokenExpiry.getTime() - Date.now() > 0) {
      if (addTime) {
        const newTime = new Date(Date.now() + 600000)
        await User.findOneAndUpdate(
          { _id: userData._id },
          { $set: { resetTokenExpiry: newTime } },
          { new: true }
        )
      }
      return { success: 'Token verification successful' }
    } else {
      await User.findOneAndUpdate(
        { _id: userData._id },
        { $unset: { resetToken: '', resetTokenExpiry: null } },
        { new: true }
      )
      return { error: 'Token expired' }
    }
  } catch (err) {
    // Handle unexpected errors
    console.log({ message: 'Unexpected error', details: err })
    return { error: 'Token verification failed' }
  }
}
export default VerifyResetToken

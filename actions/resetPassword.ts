'use server'

import bcrypt from 'bcryptjs'

import { connectDB } from '@/lib/mongodb/mongodb'
import User from '@/models/User'
import { ResetSchema } from '@/lib/zod/schema'
import { ResetPassType, AuthResponseType } from '@/lib/types'
import { ValidateWithZod } from '@/lib/zod/validation'
import VerifyResetToken from './verifyResetToken'

/**
 * Resets a user's password using a reset token.
 *
 * Workflow:
 * - Validate the new password format with Zod schema.
 * - Verify the reset token is valid and not expired.
 * - Connect to the database.
 * - Hash the new password securely.
 * - Update the user's password and clear the reset token/expiry.
 * - Handle and respond to errors appropriately.
 *
 * @param {ResetPassType} values the object containing the new password and the reset token.
 * @returns {Promise<AuthResponseType>}
 *  - success: Returned if the user’s password is reset successfully.
 *  - error: Returned if there is a general error.
 *  - fieldErrors: Detailed field validation errors (if any).
 */

export async function resetPassword(
  values: ResetPassType
): Promise<AuthResponseType> {
  try {
    // Validate password format using Zod schema
    const verifiedData = ValidateWithZod(ResetSchema, values)
    if (!verifiedData.success) {
      return { error: 'Validation failed', fieldErrors: verifiedData.errors }
    }

    // Extract reset token and validated password
    const token = verifiedData.data.token
    const verifiedPass = verifiedData.data.password

    // Verify the reset token (checks validity and expiry)
    const res = await VerifyResetToken({ token })
    if (res.error) {
      return { error: res.error }
    }

    // Connect to MongoDB
    await connectDB()

    // Hash the new password securely
    const hashedPassword = await bcrypt.hash(verifiedPass, 10)

    // Update user's password and clear reset token/expiry
    const updatedUser = await User.findOneAndUpdate(
      { resetToken: token },
      {
        $set: {
          password: hashedPassword,
          resetToken: '',
          resetTokenExpiry: null,
        },
      },
      {
        new: true,
      }
    )

    // If the user could not be updated, return an error
    if (!updatedUser) {
      return { error: 'Update password failed' }
    }

    // Success: password successfully reset
    return { success: 'Password reset successful' }
  } catch (err) {
    // Handle any unexpected errors
    console.log({ message: 'Unexpected error', details: err })
    return { error: 'Password reset failed' }
  }
}

'use server'

import { randomBytes } from 'crypto'

import { connectDB } from '@/lib/mongodb/mongodb'
import User from '@/models/User'
import { ValidateWithZod } from '@/lib/zod/validation'
import { EmailSchema } from '@/lib/zod/schema'
import { AuthResponseType } from '@/lib/types'

/**
 * Handles sending a password reset email.
 *
 * Workflow:
 * - Validate the input email.
 * - Connect to the database.
 * - Generate a reset token and its expiry time.
 * - Find and update the user (set token and expiry).
 * - If user not found or email not verified, return an error.
 * - Send a reset email with a secure link.
 * - Catch and handle any unexpected errors.
 *
 * @param {string} email - The user's email address to reset.
 * @returns {Promise<AuthResponseType>}
 *  - success: Returned if reset email is sent successfully.
 *  - error: Returned if there is a general error.
 *  - fieldErrors: Detailed field validation errors (if any).
 */

export async function sendResetEmail(email: string): Promise<AuthResponseType> {
  try {
    // Validate the email format using Zod schema
    const inputData = { email: email }
    const verifiedData = ValidateWithZod(EmailSchema, inputData)
    if (!verifiedData.success) {
      return { error: 'Verification failed', fieldErrors: verifiedData.errors }
    }

    // Connect to MongoDB
    await connectDB()

    // Generate a secure reset token and set expiry to 1 hour from now
    const resetToken = randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000)

    // Extract the validated email
    const verifiedEmail = verifiedData.data.email

    // Find the user by verifiedEmail and providerType, and set token/expiry
    const updatedUser = await User.findOneAndUpdate(
      {
        email: verifiedEmail,
        providerType: 'email',
        emailVerified: { $exists: true },
      },
      { $set: { resetToken: resetToken, resetTokenExpiry: resetTokenExpiry } },
      { new: true }
    )

    // If user not found or email not verified, return error message
    if (!updatedUser) {
      return { error: "User not found / User's email not verified" }
    }

    // Assemble the reset URL to be sent in the email
    const resetUrl = `http://localhost:3000/reset-password/${encodeURIComponent(
      resetToken
    )}`

    // Send the reset email (using your email API), with both text and HTML content
    await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Reset Password',
        text: `Press the button to reset your password: ${resetUrl}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <title>Reset Password</title>
            <style>
              body {
                background-color: white;
                margin: 0;
                padding: 0;
                font-family: system-ui, sans-serif;
                color: #27272a; /* dark:text-neutral-200 fallback */
              }
              @media (prefers-color-scheme: dark) {
                body {
                  background-color: #000000;
                  color: #e4e4e7; /* dark:text-neutral-200 */
                }
                .container {
                  background-color: #000000;
                  box-shadow:
                    0 1px 0 0 #27272a inset,
                    0 -1px 0 0 #27272a inset;
                }
                .btn {
                  background: linear-gradient(225deg, #18181b, #121212);
                  box-shadow:
                    0 1px 0 0 #27272a inset,
                    0 -1px 0 0 #27272a inset;
                }
              }
              .container {
                max-width: 384px; /* max-w-md */
                width: 100%;
                margin: 8vh auto 0 auto;
                padding: 2rem; /* p-8 */
                background-color: white;
                border-radius: 1rem; /* rounded-2xl */
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                box-sizing: border-box;
              }
              h2 {
                font-size: 1.25rem; /* text-xl */
                font-weight: 700;
                margin-bottom: 2rem; /* pb-8 */
                color: #27272a; /* text-neutral-800 */
              }
              .btn {
                display: block;
                width: 100%;
                height: 40px; /* h-10 */
                border-radius: 0.375rem; /* rounded-md */
                background: linear-gradient(225deg, #000000, #525252); /* from-black to-neutral-600 */
                color: white;
                font-weight: 500;
                font-family: inherit;
                border: none;
                cursor: pointer;
                position: relative;
                box-shadow:
                  inset 0 1px 0 0 #ffffff66,
                  inset 0 -1px 0 0 #ffffff66;
                text-align: center;
                line-height: 40px;
                text-decoration: none;
                user-select: none;
              }
              .btn:hover {
                opacity: 0.9;
              }
              a {
                color: inherit;
                text-decoration: none;
                display: block;
                width: 100%;
                height: 100%;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Press the button to reset your password</h2>
              <button class="btn">
                <a href="${resetUrl}">Reset →</a>
              </button>
            </div>
          </body>
          </html>
          `,
      }),
    })

    // Return success message
    return { success: 'Sending email successful' }
  } catch (err) {
    // Handle unexpected errors
    console.log({ message: 'Unexpected error', details: err })
    return { error: 'Sending email failed' }
  }
}

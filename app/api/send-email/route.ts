import nodemailer from 'nodemailer'
import { google } from 'googleapis'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID_1
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET_1
const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN

// Validate environment variables at initialization
if (
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !GOOGLE_REDIRECT_URL ||
  !EMAIL_ADDRESS ||
  !GOOGLE_REFRESH_TOKEN
) {
  throw new Error('Missing required environment variables for email sending')
}

const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
)

oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
})

interface MailRequestBody {
  to: string
  subject: string
  text: string
  html?: string
}

/**
 * API Route Handler to send email via Gmail OAuth2 and Nodemailer.
 * Expects JSON body: { to, subject, text, html? }
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const { to, subject, text, html } = (await req.json()) as MailRequestBody

    // Basic mail data validation
    const accessTokenResponse = await oauth2Client.getAccessToken()
    const accessToken = accessTokenResponse.token
    if (!accessToken) throw new Error('Failed to retrieve access token')

    // Get OAuth2 access token
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: EMAIL_ADDRESS,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken,
      },
    })

    // Build email options
    const mailOptions = {
      from: EMAIL_ADDRESS,
      to,
      subject,
      text,
      html,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)

    // Return success (only messageId for privacy)
    return new Response(JSON.stringify({ message: 'Email sent', info }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error: any) {
    // Log the complete error for debugging
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}

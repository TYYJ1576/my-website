'use server'

import nodemailer from 'nodemailer'

const EMAIL_SERVER_USER = process.env.EMAIL_SERVER_USER
const EMAIL_SERVER_PASSWORD = process.env.EMAIL_SERVER_PASSWORD
const EMAIL_SERVER_HOST = process.env.EMAIL_SERVER_HOST
const EMAIL_FROM = process.env.EMAIL_FROM

const transporter = nodemailer.createTransport({
  host: EMAIL_SERVER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_SERVER_USER,
    pass: EMAIL_SERVER_PASSWORD,
  },
})

export async function sendMail({
  sendTo,
  subject,
  text,
  html,
}: {
  sendTo?: string
  subject: string
  text: string
  html?: string
}) {
  try {
    const isVerified = await transporter.verify()
  } catch (err) {
    console.log('Error Found', EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, err)
    return
  }
  const info = await transporter.sendMail({
    from: EMAIL_FROM,
    to: sendTo,
    subject: subject,
    text: text,
    html: html ? html : '',
  })
  console.log('Message Sent', info.messageId)
  console.log('Mail sent to', sendTo)
  return info
}

import * as z from 'zod/v4'

const EmailSchema = z.object({
  email: z.email(),
})

export default EmailSchema

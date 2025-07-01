import * as z from 'zod/v4'

const SendResetSchema = z.object({
  email: z.email(),
})
export default SendResetSchema

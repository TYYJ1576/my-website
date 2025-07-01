import * as z from 'zod/v4'

const LogInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default LogInSchema

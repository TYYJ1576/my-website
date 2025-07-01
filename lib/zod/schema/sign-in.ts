import * as z from 'zod/v4'

const SignInSchema = z.object({
  name: z.string(),
  email: z.string().email().min(6),
  password: z.string().min(8),
})

export default SignInSchema

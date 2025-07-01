import * as z from 'zod/v4'

const ResetSchema = z.object({
  password: z.string().min(8),
  token: z
    .string()
    .length(64)
    .regex(/^[a-f0-9]{64}$/),
})

export default ResetSchema

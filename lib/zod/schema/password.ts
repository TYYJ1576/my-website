import * as z from 'zod/v4'

const PassSchema = z.object({
  password: z.string().min(8),
})

export default PassSchema

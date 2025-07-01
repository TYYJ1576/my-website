import * as z from 'zod/v4'

/**
 * Validates an unknown data object with a given Zod schema.
 * Returns either the parsed data (if valid) or a field error map (if invalid).
 *
 * @template T The type the schema validates to.
 * @param schema - The Zod schema to validate with.
 * @param data   - The data to validate (likely an object).
 * @returns      - { success: true, data } if valid, or { success: false, errors } if invalid.
 */
export function ValidateWithZod<T>(
  schema: z.ZodType<T>,
  data: unknown
):
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> } {
  // Use Zod's safeParse to validate data without throwing on failure
  const result = schema.safeParse(data)

  if (result.success) {
    // On success, return the parsed data
    return { success: true, data: result.data }
  } else {
    // On failure, build a map of field errors
    const fieldErrors: Record<string, string> = {}

    // Extract field errors using Zod's flattenError utility
    // Each field key maps to an array of error messages
    const fieldErrorsObj = z.flattenError(result.error).fieldErrors as Record<
      string,
      string[]
    >

    // For each field, use only the first error message
    for (const key in fieldErrorsObj) {
      const messages = fieldErrorsObj[key]
      if (messages && messages.length > 0) {
        fieldErrors[key] = messages[0]
      }
    }

    return { success: false, errors: fieldErrors }
  }
}

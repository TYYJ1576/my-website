'use client'

import { FormEvent, useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { LabelInputContainer } from '@/components/form'
import { Label, Input } from '@/components/ui'
import { ValidateWithZod } from '@/lib/zod/validation'
import { BottomGradient } from '@/components/form'
import { sendResetEmail } from '@/actions/sendResetEmail'
import { SendResetSchema } from '@/lib/zod/schema'
import { cn } from '@/lib/utils'

function ResetPage() {
  // ====== Local State Management ======
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string | undefined
  }>({})

  // ====== Send Reset Email Mutation ======
  const sendResetMutation = useMutation({
    mutationFn: (email: string) => sendResetEmail(email),
    onSuccess: (res: any) => {
      if (res.error) {
        setError(res.error)
        setFieldErrors({})
        if (res.fieldErrors) {
          setFieldErrors(res.fieldErrors)
        }

        console.log({ message: 'Reset failed', details: res.error })
      } else {
        setError(undefined)
        setFieldErrors({})
        setEmail('')
        console.log({ message: 'Email sent successfully', details: res })
      }
    },
  })

  // ====== Email Change Handler ======
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // ====== Form Submit Handler ======
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    sendResetMutation.reset()

    const formData = new FormData(e.currentTarget)
    const resetData = { email: String(formData.get('email') || '') }

    const validationResult = ValidateWithZod(SendResetSchema, resetData)
    if (!validationResult.success) {
      setFieldErrors(validationResult.errors)
      setError(undefined)
      return
    }

    sendResetMutation.mutate(validationResult.data.email)
  }

  return (
    <div className="max-w-md mx-auto p-4 md:p-8 mt-[8vh] rounded-none md:rounded-2xl shadow-input bg-white dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Enter your email to reset password
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={!!fieldErrors.email}
            disabled={sendResetMutation.isPending}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
          )}
        </LabelInputContainer>

        <div aria-live="polite">
          {error && (
            <div className="text-sm font-medium mb-4 text-red-500 leading-none">
              {error}
            </div>
          )}
          {sendResetMutation.isSuccess && !error && (
            <div className="text-sm font-medium mb-4 text-green-500 leading-none">
              Email sent
            </div>
          )}
        </div>

        <button
          className={cn(
            'group/btn relative block h-10 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]',
            sendResetMutation.isPending
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-br from-black to-neutral-600 dark:bg-zinc-800 cursor-pointer'
          )}
          disabled={sendResetMutation.isPending}
        >
          {sendResetMutation.isPending ? (
            <Loader2Icon className="animate-spin mx-auto" />
          ) : (
            <>Send &rarr;</>
          )}

          <BottomGradient />
        </button>
      </form>
    </div>
  )
}
export default ResetPage

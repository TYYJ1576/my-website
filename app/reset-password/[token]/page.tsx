'use client'

import { useState, useEffect, FormEvent } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Loader2Icon } from 'lucide-react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { LabelInputContainer, BottomGradient } from '@/components/form'
import { Label, Input } from '@/components/ui'
import VerifyResetToken from '@/actions/verifyResetToken'
import { ValidateWithZod } from '@/lib/zod/validation'
import { resetPassword } from '@/actions/resetPassword'

import { PassSchema } from '@/lib/zod/schema'
import { cn } from '@/lib/utils'

interface RetPassPageProps {
  params: Promise<{ token: string }>
}

/**
 * ResetPage component for reset user's password.
 * Features:
 * - Verifies the reset token from params
 * - Lets the user set a new password
 * - Handles form validation, error, and loading states
 * - Redirects to login on success
 */
function ResetPassPage({ params }: RetPassPageProps) {
  // ====== Local State Management ======
  const paramsData = React.use(params)
  const { token } = paramsData
  const router = useRouter()

  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string | undefined
  }>({})
  const [formError, setFormError] = useState<string | undefined>(undefined)

  // ====== Token Verification Query ======
  const {
    data: verifyResult,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['verifyToken', token],
    queryFn: () => VerifyResetToken({ token }),
    retry: false,
  })

  // ====== Reset Password Mutation ======
  const mutation = useMutation({
    mutationFn: (newPassword: string) =>
      resetPassword({ password: newPassword, token }),
    onSuccess: (res: any) => {
      if (res.error) {
        setFormError(res.error)
        setFieldErrors({})
        if (res.fieldErrors) {
          setFormError(undefined)
          setFieldErrors(res.fieldErrors)
        }
        console.log({ message: 'Reset password failed', details: res.error })
      } else if (res.success) {
        setFormError(undefined)
        setFieldErrors({})
        console.log({
          message: 'Password reset successful',
          details: res.success,
        })
        router.push('/dev/login')
      } else {
        setFormError('Unexpected error')
      }
    },
  })

  // ====== Form Submission Handler ======
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFieldErrors({})
    setFormError(undefined)

    const formData = new FormData(e.currentTarget)
    const password = String(formData.get('password') || '')

    // Validate input with zod
    const validationResult = ValidateWithZod(PassSchema, { password })
    if (!validationResult.success) {
      setFieldErrors(validationResult.errors)
      return
    }

    // Mutatae
    mutation.mutate(validationResult.data.password)
  }

  // Loading state while verifying token
  if (isLoading)
    return (
      <div className="max-w-md mx-auto p-4 md:p-8 mt-[8vh] rounded-none md:rounded-2xl shadow-input bg-white dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Loading...
        </h2>
      </div>
    )

  // Invalid or expired token UI
  if (isError || !verifyResult?.success)
    return (
      <div className="max-w-md mx-auto p-4 md:p-8 mt-[8vh] rounded-none md:rounded-2xl shadow-input bg-white dark:bg-black">
        <h2 className="text-xl font-bold text-red-600">
          {verifyResult?.error || (error as Error)?.message || 'Invalid token'}
        </h2>
      </div>
    )

  // Main password reset form
  return (
    <div className="max-w-md mx-auto p-4 md:p-8 mt-[8vh] rounded-none md:rounded-2xl shadow-input bg-white dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Enter your new password
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            error={!!fieldErrors.password}
            disabled={mutation.isPending}
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}
        </LabelInputContainer>

        {formError && (
          <div className="text-sm font-medium mb-4 text-red-500 leading-none">
            {formError}
          </div>
        )}

        <button
          className={cn(
            'group/btn relative block h-10 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]',
            mutation.isPending
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-br from-black to-neutral-600 dark:bg-zinc-800 cursor-pointer'
          )}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Loading...' : 'Confirm →'}

          <BottomGradient />
        </button>
      </form>
    </div>
  )
}

export default ResetPassPage

'use client'

import { FormEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconBrandGoogle } from '@tabler/icons-react'
import { signIn } from 'next-auth/react'
import { Loader2Icon } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { register } from '@/actions/register'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { SignInSchema } from '@/lib/zod/schema'
import { ValidateWithZod } from '@/lib/zod/validation'
import { SignInDataType } from '@/lib/types'
import { BottomGradient, LabelInputContainer } from '@/components/form'

/**
 * RegisterPage component for user registration.
 * Features:
 * - Handles user registration
 * - Validates input with Zod schema
 * - Sends verification email upon success
 * - Manages error and loading states
 * - Supports Google OAuth registration
 */

function RegisterPage() {
  // ====== Local State Management ======
  const [error, setError] = useState<string>()
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string | undefined
  }>({})
  const [send, setSend] = useState<boolean>(false)

  // ====== Email Sending Mutation ======
  const emailMutation = useMutation({
    mutationFn: (email: string) => signIn('email', { email, redirect: false }),
    onSuccess: (res: any) => {
      console.log({ message: 'Email send succeed', details: res })
    },
    onError: (res: any) => {
      console.log({ message: 'Email send failed', details: res.error })
    },
  })

  // ====== Registration Mutation ======
  const registerMutation = useMutation({
    mutationFn: (signData: SignInDataType) => register(signData),
    onSuccess: (res: any) => {
      console.log({ message: 'Registration succeed', details: res })
    },
    onError: (res: any) => {
      console.log({ message: 'Registration failed', details: res.error })
    },
  })

  // ====== Form Submission Handler ======
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    const signData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const validationResult = ValidateWithZod(SignInSchema, signData)
    if (!validationResult.success) {
      setFieldErrors(validationResult.errors)
      return
    }

    registerMutation.mutate(validationResult.data, {
      onSuccess: (res: any) => {
        if (res.error) {
          setError(res.error)
          if (res.fieldErrors) {
            setFieldErrors(res.fieldErrors)
          } else {
            setFieldErrors({})
          }
          setSend(false)
        } else {
          emailMutation.mutate(validationResult.data.email, {
            onSuccess: () => {
              form.reset()
              setFieldErrors({})
              setError(undefined)
              setSend(true)
            },
          })
        }
      },
    })
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-[8vh]">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Register a new acount
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Username</Label>
          <Input
            id="name"
            placeholder="Username"
            type="name"
            name="name"
            error={!!fieldErrors.name}
            disabled={registerMutation.isPending || emailMutation.isPending}
          />
          {fieldErrors.name && (
            <p className="text-red-500 text-sm">{fieldErrors.name}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="email"
            type="email"
            name="email"
            error={!!fieldErrors.email}
            disabled={registerMutation.isPending || emailMutation.isPending}
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm">{fieldErrors.email}</p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            placeholder="Password"
            type="password"
            name="password"
            error={!!fieldErrors.password}
            disabled={registerMutation.isPending || emailMutation.isPending}
          />
          {fieldErrors.password && (
            <p className="text-red-500 text-sm">{fieldErrors.password}</p>
          )}
        </LabelInputContainer>
        {error && (
          <div className="text-sm font-medium mb-4 text-red-500 leading-none">
            {error}
          </div>
        )}
        {send && (
          <div className="text-sm font-medium mb-4 text-green-500 leading-none">
            Email sent
          </div>
        )}
        <button
          disabled={registerMutation.isPending || emailMutation.isPending}
          className={cn(
            'group/btn relative block h-10 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]',
            registerMutation.isPending || emailMutation.isPending
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-br from-black to-neutral-600 dark:bg-zinc-800'
          )}
        >
          {registerMutation.isPending || emailMutation.isPending ? (
            <Loader2Icon className="animate-spin mx-auto" />
          ) : (
            <p>Sign up &rarr;</p>
          )}

          <BottomGradient />
        </button>
        <div>
          {registerMutation.isPending || emailMutation.isPending ? (
            <p className="text-sm text-[#888] transition duration-150 ease">
              Already have an account?
            </p>
          ) : (
            <Link
              href="/dev/login"
              className="text-sm text-[#888] transition duration-150 ease hover:text-black dark:hover:text-white"
            >
              Already have an account?
            </Link>
          )}
        </div>
        <div>
          {registerMutation.isPending || emailMutation.isPending ? (
            <p className="text-sm text-[#888] transition duration-150 ease">
              Reset Password
            </p>
          ) : (
            <Link
              href="/dev/send-reset"
              className="text-sm text-[#888] transition duration-150 ease hover:text-black dark:hover:text-white"
            >
              Reset Password
            </Link>
          )}
        </div>
        <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
      <div className="flex flex-col space-y-4">
        <button
          className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
          onClick={() => signIn('google')}
        >
          <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            Google
          </span>
          <BottomGradient />
        </button>
      </div>
    </div>
  )
}
export default RegisterPage

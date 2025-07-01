'use client'

import { FormEvent, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IconBrandGoogle } from '@tabler/icons-react'
import { Loader2Icon } from 'lucide-react'

import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import { LogInSchema } from '@/lib/zod/schema'
import { ValidateWithZod } from '@/lib/zod/validation'
import { useMutation } from '@tanstack/react-query'
import { BottomGradient, LabelInputContainer } from '@/components/form'
import { LogInDataType } from '@/lib/types'

/**
 * LoginPage component for user authentication.
 * Features:
 * - Email/password login
 * - Google OAuth login
 * - Resend verification email
 * - Inline error and loading state handling
 */
function LoginPage() {
  // ====== Local State Management ======
  const [error, setError] = useState<string>()
  const [sendEmail, setSendEmail] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{
    [key: string]: string | undefined
  }>({})
  const [email, setEmail] = useState('')

  const router = useRouter()

  // ====== Credential Sign-in Mutation ======
  const signinMutation = useMutation({
    mutationFn: ({ email, password }: LogInDataType) =>
      signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      }),
    onSuccess: (res: any) => {
      if (res.error) {
        switch (res.error) {
          case 'Invalid Email':
            setFieldErrors({ email: res.error })
            setError(undefined)
            setSendEmail(false)
            break
          case 'Incorrect Password':
            setFieldErrors({ password: res.error })
            setError(undefined)
            setSendEmail(false)
            break
          case 'Email not verified':
            setFieldErrors({})
            setError(res.error)
            setSendEmail(true)
            break
          default:
            setFieldErrors({})
            setError(res.error)
            setSendEmail(false)
        }
        console.log({ message: 'Login failed', details: res.error })
      } else {
        router.push('/auth')
        console.log({ message: 'Login successfully', details: res })
      }
    },
  })

  // ====== Resend Verification Email Mutation ======
  const resendMutation = useMutation({
    mutationFn: (email: string) => signIn('email', { email, redirect: false }),
    onSuccess: (res: any) => {
      setError(undefined)
      setFieldErrors({})
      setSendEmail(false)

      console.log({ message: 'Email sent', details: res })
    },
    onError: (res: any) => {
      setError(res.error)
      setFieldErrors({})
      setSendEmail(false)

      console.log({ message: 'Resent email failed', details: res.error })
    },
  })

  // ====== Google OAuth Login Mutation ======
  const googleMutation = useMutation({
    mutationFn: () => signIn('google', { redirect: false }),
    onSuccess: (res: any) => {
      setError(undefined)
      setFieldErrors({})
      setSendEmail(false)

      console.log({ message: 'Google login', details: res })
    },
    onError: (res: any) => {
      setError(res.error)
      setFieldErrors({})
      setSendEmail(false)

      console.log({ message: 'Google login failed', details: res.error })
    },
  })

  // ====== Input Handlers ======
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // ====== Form Submission Handler ======
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFieldErrors({})
    resendMutation.reset()

    const formData = new FormData(event.currentTarget)
    const loginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    const validationResult = ValidateWithZod(LogInSchema, loginData)
    if (!validationResult.success) {
      setFieldErrors(validationResult.errors)
      return
    }

    signinMutation.mutate(validationResult.data)
  }

  // ====== Resend Email Handler ======
  const sendHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setError(undefined)
    setFieldErrors({})

    if (!email) {
      setFieldErrors({ email: 'Please provide your email address' })
      return
    }

    resendMutation.mutate(email)
  }

  // ====== Google Sign-in Handler ======
  const googleHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setError(undefined)
    setFieldErrors({})
    setSendEmail(false)

    googleMutation.mutate()
  }

  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black mt-[8vh]">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to edit content of the website
      </p>

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
            disabled={resendMutation.isPending || signinMutation.isPending}
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
            disabled={signinMutation.isPending}
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

        {resendMutation.isSuccess && (
          <div className="text-sm font-medium mb-4 text-green-500 leading-none">
            Email sent
          </div>
        )}

        {sendEmail && (
          <div className="text-sm font-medium mb-4 text-blue-500 leading-none">
            {resendMutation.isPending ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <button
                className="bg-white dark:bg-black cursor-pointer hover:underline"
                onClick={sendHandler}
              >
                Resend Email
              </button>
            )}
          </div>
        )}

        <button
          className={cn(
            'group/btn relative block h-10 w-full rounded-md font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]',
            resendMutation.isPending || signinMutation.isPending
              ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-br from-black to-neutral-600 dark:bg-zinc-800 cursor-pointer'
          )}
          disabled={resendMutation.isPending || signinMutation.isPending}
        >
          {resendMutation.isPending || signinMutation.isPending ? (
            <Loader2Icon className="animate-spin mx-auto" />
          ) : (
            <>Log in &rarr;</>
          )}

          <BottomGradient />
        </button>

        <div>
          {resendMutation.isPending || signinMutation.isPending ? (
            <p className="text-sm text-[#888] transition duration-150 ease">
              Don't have an account?
            </p>
          ) : (
            <Link
              href="/dev/register"
              className="text-sm text-[#888] transition duration-150 ease hover:text-black dark:hover:text-white"
            >
              Don't have an account?
            </Link>
          )}
        </div>
        <div>
          {resendMutation.isPending || signinMutation.isPending ? (
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
          className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626] cursor-pointer"
          onClick={(e) => googleHandler(e)}
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
export default LoginPage

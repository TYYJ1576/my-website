import { ProjectsDocument } from '@/models/Projects'

export interface SidebarProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface NameLogoProps {
  color: string
}

export interface DevPageProps {
  isDevPage: boolean
}

export interface LogInDataType {
  email: string
  password: string
}

export interface SignInDataType {
  name: string
  email: string
  password: string
}

export interface AuthResponseType {
  success?: string
  error?: string
  fieldErrors?: Record<string, string>
}

export interface ResetPassType {
  password: string
  token: string
}

export interface VerifyResetTokenType {
  token: string
  addTime?: boolean
}

export interface BasicInfo {
  _id: string
  title: string
  description: string
  tags: string[]
}

export interface PageBrowserResponseType {
  success?: string
  error?: string
  data?: ProjectsDocument | null
}

export interface BasicInfoResponseType {
  success?: string
  error?: string
  data?: BasicInfo[] | null
}

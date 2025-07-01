'use client'
import { useRouter } from 'next/navigation'
import type { BasicInfo } from '@/lib/types'

export default function ProjectCard({
  _id,
  title,
  description,
  tags,
}: BasicInfo) {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/projects/${_id}`)}
      className="h-auto min-h-48 w-full min-w-84 rounded-lg hover:animate-pulse bg-neutral-100 dark:bg-neutral-800 cursor-pointer hover: border-1 hover:border-neutral-800 hover:shadow-xl/20 dark:hover:border-gray-200 dark:hover:shadow-zinc-500/100 p-6"
      tabIndex={0}
      role="button"
      onKeyDown={(e) =>
        (e.key === 'Enter' || e.key === ' ') && router.push(`/projects/${_id}`)
      }
      style={{ outline: 'none' }}
    >
      <h2 className="m-2 text-xl font-bold">{title}</h2>
      <p className="m-2 mr-[12vw] ml-4">{description}</p>
      <div className="m-2 text-sm ml-4 text-gray-500 dark:text-gray-400">
        {tags.join(' | ')}
      </div>
    </div>
  )
}

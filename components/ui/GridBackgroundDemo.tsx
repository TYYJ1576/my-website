import { cn } from '@/lib/utils'

export function GridBackgroundDemo() {
  return (
    <div className="fixed inset-x-0 top-[var(--nav-height)] -z-10 h-[calc(100vh-var(--nav-height))] w-full bg-white dark:bg-black">
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#d4d4d4_2px,transparent_1px),linear-gradient(to_bottom,#d4d4d4_2px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_2px,transparent_1px),linear-gradient(to_bottom,#262626_2px,transparent_1px)]'
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    </div>
  )
}

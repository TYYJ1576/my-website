import * as React from 'react'
import { cn } from '@/lib/utils'
import { useMotionTemplate, useMotionValue, motion } from 'motion/react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    const radius = 100 // hover 光暈半徑
    const [visible, setVisible] = React.useState(false)

    let mouseX = useMotionValue(0)
    let mouseY = useMotionValue(0)

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + 'px' : '0px'
              } circle at ${mouseX}px ${mouseY}px,
              ${error ? '#ef4444' : '#3b82f6'},
              transparent 80%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={cn(
          'group/input rounded-lg p-[2px] transition duration-300',
          error ? 'shadow-[0_0_0_2px_rgba(239,68,68,0.7)]' : 'shadow-input'
        )}
      >
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400
             dark:placeholder-text-neutral-600 placeholder:text-neutral-400
             focus-visible:outline-none
             disabled:cursor-not-allowed disabled:opacity-50
             dark:bg-zinc-800 dark:text-white
             dark:shadow-[0px_0px_1px_1px_#404040]
             dark:focus-visible:ring-neutral-600`,
            error
              ? 'focus-visible:ring-2 focus-visible:ring-red-500'
              : 'focus-visible:ring-[2px] focus-visible:ring-neutral-400',
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  }
)
Input.displayName = 'Input'

export { Input }

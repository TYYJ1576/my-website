export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-var(--nav-height))]">
      <div
        className="
          inline-block w-16 h-16 border-4 
          border-zinc-200 dark:border-zinc-800
          border-t-zinc-800 dark:border-t-zinc-200
          rounded-full animate-spin
        "
      ></div>
    </div>
  )
}

function ProjectTitle({ title }: { title: string }) {
  return (
    <section>
      <h1 className="text-3xl sm:text-5xl font-bold leading-10 sm:leading-14 mb-6 sm:mb-8 mt-4 sm:mt-5 text-zinc-800 dark:text-zinc-100">
        {title}
      </h1>
      <hr className="my-8 border-t border-gray-300" />
    </section>
  )
}
export default ProjectTitle

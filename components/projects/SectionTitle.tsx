function SectionTitle({ title, id }: { title: String; id?: string }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-[27px] font-bold leading-9 sm:leading-13 mt-6 sm:mt-8"
    >
      {title}
    </h2>
  )
}
export default SectionTitle

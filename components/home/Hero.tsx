import { GridBackgroundDemo } from '../ui/GridBackgroundDemo'
import { TextGenerateEffect } from '../ui/TextGenerateEffect'

function Hero() {
  const heading1 = 'Hello, My name is Johnny.'
  const headint2 =
    'I am an engineering student with a strength in programming to bring ideas to reality.'

  return (
    <>
      <GridBackgroundDemo />
      <div className="flex flex-col gap-4.5 min-h-[calc(100vh-var(--nav-height)-12.3rem)] justify-center items-center text-center">
        <TextGenerateEffect
          duration={4}
          filter={false}
          words={heading1}
          className="text-6xl font-bold font-serif"
        />
        <TextGenerateEffect
          duration={4}
          filter={false}
          words={headint2}
          className="text-2xl font-serif"
        />
      </div>
    </>
  )
}
export default Hero

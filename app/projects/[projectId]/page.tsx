import { EB_Garamond } from 'next/font/google'

import { getPage } from '@/lib/services/getPage'
import ProjectTitle from '@/components/projects/ProjectTitle'
import Paragraph from '@/components/projects/Paragraph'
import { ProjectMain, SingleProject } from '@/models/Projects'
import SectionTitle from '@/components/projects/SectionTitle'
import ContentSwitch from '@/components/projects/ContentSwitch'

type Params = Promise<{ projectId: string }>
export const revalidate = 1000

const ebGaramondFont = EB_Garamond({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-garamond',
})

export default async function SingleProjectPage({
  params,
}: {
  params: Params
}) {
  const { projectId } = await params
  const res = await getPage(projectId)

  if ('error' in res || !res.data) {
    return <div>Project not found.</div>
  }

  return (
    <main
      className={`mx-auto max-w-5xl px-4 sm:px-8 lg:px-16 ${ebGaramondFont.variable}`}
    >
      <ProjectTitle title={res.data.title} />
      <div className="px-8">
        <section>
          <Paragraph contents={res.data.introduction} />
        </section>
        <section>
          <h2 className="scroll-mt-24 text-[27px] font-bold leading-9 sm:leading-13 mt-6 sm:mt-8">
            Table of Contents
          </h2>
          <div className="ml-4 bg-zinc-100 p-4">
            <ul className="space-y-0.5">
              {res.data.main.map((mainData: ProjectMain, i: number) => (
                <li key={i}>
                  <a
                    href={`#section-${i}`}
                    className="text-blue-600 hover:underline"
                  >
                    {mainData.subtitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          {res.data.main.map((mainData: ProjectMain, i: number) => (
            <div key={i}>
              <SectionTitle title={mainData.subtitle} id={`section-${i}`} />
              <div className="ml-4">
                {mainData.contents.map((data: SingleProject, j: number) => (
                  <ContentSwitch key={j} content={data} />
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

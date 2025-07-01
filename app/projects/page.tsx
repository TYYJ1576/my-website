import { getProjectInfo } from '@/lib/services/project'
import ProjectCard from '@/components/projects/ProjectCard'
import { BasicInfo } from '@/lib/types'

export const revalidate = 3600

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default async function ProjectPage() {
  const projectData = await getProjectInfo()

  await delay(1500)

  if (
    !projectData.success ||
    !projectData.data ||
    projectData.data.length === 0
  ) {
    return (
      <div className="p-8">
        <p>Failed to load project data or no projects found.</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap gap-24">
        <div className="mx-auto flex flex-col w-full gap-8">
          {projectData.data.map((project: BasicInfo) => (
            <ProjectCard key={project._id} {...project} />
          ))}
        </div>
      </div>
    </div>
  )
}

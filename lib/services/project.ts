import { connectDB } from '@/lib/mongodb/mongodb'
import { ProjectsBrowserResponseType } from '@/lib/types'
import { Projects } from '@/models'

export const getProjectInfo =
  async (): Promise<ProjectsBrowserResponseType> => {
    try {
      await connectDB()

      const projectsInfo = await Projects.find(
        {},
        { _id: 1, title: 1, description: 1, tags: 1 }
      ).lean()

      const safeProjectsInfo = projectsInfo.map((p: any) => ({
        ...p,
        _id: p._id?.toString?.() ?? '',
      }))

      return {
        success: 'Fetching data successful',
        data: safeProjectsInfo,
      }
    } catch (err) {
      console.log({
        message: 'Fetching projects basic information failed',
        details: err,
      })
      return { error: 'Fetching projects basic information failed' }
    }
  }

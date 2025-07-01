import { connectDB } from '@/lib/mongodb/mongodb'
import { BasicInfo, BasicInfoResponseType } from '@/lib/types'
import { Projects } from '@/models'

export const getProjectInfo = async (): Promise<BasicInfoResponseType> => {
  try {
    await connectDB()

    const rawProjects = await Projects.find(
      {},
      { _id: 1, title: 1, description: 1, tags: 1 }
    ).lean()

    const safeProjectsInfo: BasicInfo[] = (rawProjects as unknown[]).map(
      (p: any) => ({
        _id: p._id?.toString?.() ?? '',
        title: p.title ?? '',
        description: p.description ?? '',
        tags: p.tags ?? [],
      })
    )

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

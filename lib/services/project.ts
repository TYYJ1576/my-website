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

    const safeProjectsInfo: BasicInfo[] = (
      rawProjects as Record<string, unknown>[]
    ).map((p) => ({
      _id:
        p._id &&
        typeof (p._id as { toString: () => string }).toString === 'function'
          ? (p._id as { toString: () => string }).toString()
          : '',
      title: typeof p.title === 'string' ? p.title : '',
      description: typeof p.description === 'string' ? p.description : '',
      tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
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

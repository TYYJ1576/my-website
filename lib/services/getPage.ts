import { connectDB } from '@/lib/mongodb/mongodb'
import { PageBrowserResponseType } from '@/lib/types'
import { Projects } from '@/models'
import { ProjectsDocument } from '@/models/Projects'
import { Types } from 'mongoose'

export const getPage = async (
  _id: string
): Promise<PageBrowserResponseType> => {
  'use cache'
  try {
    await connectDB()

    // Get only basic information from all the projects
    const projectsInfo = (await Projects.findOne({
      _id: new Types.ObjectId(_id),
    }).lean()) as ProjectsDocument | null

    if (!projectsInfo) {
      return { error: 'Project not found' }
    }

    const safeProjectInfo = {
      ...projectsInfo,
      _id: projectsInfo._id?.toString?.() ?? '',
    }

    return {
      success: 'Fetching data successful',
      data: safeProjectInfo,
    }
  } catch (err) {
    console.log({
      message: 'Fetching projects basic information failed',
      details: err,
    })
    return { error: 'Fetching projects basic information failed' }
  }
}

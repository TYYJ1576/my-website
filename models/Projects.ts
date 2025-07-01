import mongoose, { Schema, model, Document, Types } from 'mongoose'

export type ContentType = 'paragraph' | 'image' | 'youtube' | 'code'

export interface SingleProject {
  type: ContentType
  text?: string
  imageUrl?: string
  alt?: string
  width?: number
  height?: number
  youtubeUrl?: string
  code?: string
  language?: string
}

export interface ProjectMain {
  subtitle: string
  contents: SingleProject[]
}

export interface ProjectsDocument {
  _id: string
  title: string
  description: string
  introduction: string
  tags: string[]
  main: ProjectMain[]
}

const ContentSchema = new Schema<SingleProject>(
  {
    type: {
      type: String,
      required: true,
      enum: ['paragraph', 'image', 'youtube', 'code'],
    },
    text: String,
    imageUrl: String,
    alt: String,
    width: Number,
    height: Number,
    youtubeUrl: String,
    code: String,
    language: String,
  },
  { _id: false }
)

const MainSchema = new Schema<ProjectMain>(
  {
    subtitle: { type: String, required: true },
    contents: { type: [ContentSchema], default: [] },
  },
  { _id: false }
)

const ProjectsSchema = new Schema<ProjectsDocument>(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
    },
    introduction: {
      type: String,
      required: [true, 'Introduction is required'],
    },
    tags: {
      type: [String],
      required: [true, 'Tags are required'],
      default: [],
    },
    main: {
      type: [MainSchema],
      required: true,
    },
  },
  { timestamps: true }
)

const Projects =
  mongoose.models?.Projects ||
  model<ProjectsDocument>('Projects', ProjectsSchema)
export default Projects

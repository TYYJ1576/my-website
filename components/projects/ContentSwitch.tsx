import { SingleProject } from '@/models/Projects'
import Paragraph from './Paragraph'
import CodeBlock from './CodeBlock'
import ImageBlock from './ImageBlock'
import YoutubePlayer from './YoutubePlayer'

function ContentSwitch({ content }: { content: SingleProject }) {
  switch (content.type) {
    case 'paragraph':
      return <Paragraph contents={content.text as string} />
    case 'code':
      return (
        <CodeBlock
          language={content.language as string}
          code={content.code as string}
        />
      )
    case 'image':
      return (
        <ImageBlock
          src={content.imageUrl as string}
          alt={content.alt as string}
          width={content.width as number}
          height={content.height as number}
        />
      )
    case 'youtube':
      return <YoutubePlayer url={content.youtubeUrl as string} />
    default:
      return <div>Error Found</div>
  }
}
export default ContentSwitch

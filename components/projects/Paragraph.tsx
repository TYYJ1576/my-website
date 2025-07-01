import ReactMarkdown from 'react-markdown'

type ParagraphProps = { contents: string }

function Paragraph({ contents }: ParagraphProps) {
  return (
    <div className="text-[20px] font-normal leading-8 sm:leading-12 mt-6 sm:mt-8 font-p">
      <ReactMarkdown
        components={{
          a: (props) => (
            <a
              {...props}
              className="text-blue-700 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            />
          ),
        }}
      >
        {contents}
      </ReactMarkdown>
    </div>
  )
}
export default Paragraph

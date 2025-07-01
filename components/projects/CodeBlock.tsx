import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <SyntaxHighlighter language={language} style={oneLight}>
      {code}
    </SyntaxHighlighter>
  )
}
export default CodeBlock

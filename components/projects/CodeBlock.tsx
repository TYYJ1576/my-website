import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

function CodeBlock({ language, code }: { language: String; code: String }) {
  const requiredLanguage = String(language)
  const requiredCode = String(code)
  return (
    <SyntaxHighlighter language={requiredLanguage} style={oneLight}>
      {requiredCode}
    </SyntaxHighlighter>
  )
}
export default CodeBlock

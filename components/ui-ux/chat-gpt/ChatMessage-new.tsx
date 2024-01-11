import { FaRobot, FaUserCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { CodeComponent } from "react-markdown/lib/ast-to-react";
import styles from "./ChatMessage.module.scss";
import CopyButton from "./CopyButton";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CSSProperties } from "react";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  isUser: boolean;
  message: string;
}

interface CodeBlockProps {
  value: string;
}

const customStyle: Record<string, CSSProperties> = {
  ...dark,
  'code[class*="language-"]': {
    // Styles for code elements
    fontSize: "1.25rem",
    lineHeight: "1.5",
  },
  // You can add more specific selectors and styles as needed
};

// Custom renderer for the code block
const CodeBlock: CodeComponent = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <div className={styles.codeBlock}>
      <SyntaxHighlighter style={customStyle} language={match[1]} PreTag="div">
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <CopyButton textToCopy={String(children)} />
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const ChatMessage = ({ isUser, message }: Props) => {
  // Apply different styles based on the speaker
  const messageStyles = isUser
    ? "bg-blue-100 text-right"
    : "bg-white text-left ml-5";
  const iconStyles = isUser ? "justify-end" : "justify-start";
  const Icon = isUser ? FaUserCircle : FaRobot;

  return (
    <div className={`flex ${iconStyles} my-5`}>
      <Icon className={`flex-shrink-0 h-8 w-8 ${isUser ? "mr-4" : "ml-4"}`} />
      <div className={`mb-8 rounded-lg flex-grow ${messageStyles}`}>
        <section className={styles.messageContainer}>
          <pre>
            <ReactMarkdown
              components={{
                code: CodeBlock,
              }}
            >
              {message}
            </ReactMarkdown>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default ChatMessage;

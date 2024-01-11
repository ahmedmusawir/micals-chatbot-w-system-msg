import { CodeComponent } from "react-markdown/lib/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CSSProperties } from "react";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import CopyButton from "@/components/ui-ux/moose-gpt-3/CopyButton";
import styles from "@/components/ui-ux/moose-gpt-3/ChatMessage.module.scss";

export const customStyle: Record<string, CSSProperties> = {
  ...dark,
  'code[class*="language-"]': {
    // Styles for code elements
    fontSize: "1.25rem",
    lineHeight: "1.5",
  },
};

// Custom renderer for the code block
export const CodeBlock: CodeComponent = ({
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

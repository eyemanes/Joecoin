'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownPaneProps {
  content: string;
}

export default function MarkdownPane({ content }: MarkdownPaneProps) {
  return (
    <div className="markdown-content">
      <ReactMarkdown
        components={{
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,
          p: ({ children }) => <p>{children}</p>,
          ul: ({ children }) => <ul>{children}</ul>,
          li: ({ children }) => <li>{children}</li>,
          code: ({ children }) => <code>{children}</code>,
          blockquote: ({ children }) => <blockquote>{children}</blockquote>,
          strong: ({ children }) => <strong>{children}</strong>,
          em: ({ children }) => <em>{children}</em>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

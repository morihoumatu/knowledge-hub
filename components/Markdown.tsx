'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/tokyo-night-dark.css';
import TableOfContents from './TableOfContents';

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <TableOfContents content={content} />
      </div>
      
      <div className="lg:col-span-3">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, [rehypeHighlight, { detect: true, ignoreMissing: true }]]}
          className="markdown-content"
          components={{
            // ヘッダーにIDを追加してアンカーリンクを可能にする
            h1: ({ node, ...props }) => <h1 id={createIdFromText(props.children)} className="scroll-m-20 text-3xl font-bold tracking-tight mt-10 mb-4" {...props} />,
            h2: ({ node, ...props }) => <h2 id={createIdFromText(props.children)} className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-3" {...props} />,
            h3: ({ node, ...props }) => <h3 id={createIdFromText(props.children)} className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-2" {...props} />,
            h4: ({ node, ...props }) => <h4 id={createIdFromText(props.children)} className="scroll-m-20 text-lg font-semibold tracking-tight mt-4 mb-2" {...props} />,
            
            // リンクを新しいタブで開くように設定
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-primary underline underline-offset-4 hover:text-primary/80"
                target={props.href?.startsWith('http') ? '_blank' : undefined}
                rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              />
            ),
            
            // コードブロックのカスタマイズ
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || '');
              const language = match ? match[1] : '';
              
              if (inline) {
                return (
                  <code
                    className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }
              
              return (
                <div className="group relative">
                  {language && (
                    <div className="absolute right-2 top-2 z-10 bg-secondary/80 text-secondary-foreground rounded px-1 py-0.5 text-xs font-medium">
                      {language}
                    </div>
                  )}
                  <pre className="mb-4 mt-4 overflow-x-auto rounded-lg bg-muted p-4">
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                </div>
              );
            },
            
            // 画像のカスタマイズ
            img: ({ node, ...props }) => {
              const src = props.src?.startsWith('/')
                ? `/docs/markdown/assets${props.src}`
                : props.src;
              
              return (
                <div className="my-6">
                  <img
                    {...props}
                    src={src}
                    className="rounded-lg max-w-full h-auto"
                    loading="lazy"
                  />
                  {props.alt && (
                    <p className="mt-2 text-sm text-center text-muted-foreground">
                      {props.alt}
                    </p>
                  )}
                </div>
              );
            },
            
            // その他のHTML要素のカスタマイズ
            p: ({ node, ...props }) => <p className="leading-7 [&:not(:first-child)]:mt-6" {...props} />,
            ul: ({ node, ...props }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />,
            ol: ({ node, ...props }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />,
            blockquote: ({ node, ...props }) => (
              <blockquote className="border-l-4 border-primary/20 pl-4 italic text-muted-foreground my-6" {...props} />
            ),
            hr: ({ node, ...props }) => <hr className="my-8 border-border" {...props} />,
            table: ({ node, ...props }) => (
              <div className="my-6 w-full overflow-x-auto">
                <table className="w-full border-collapse border border-border" {...props} />
              </div>
            ),
            th: ({ node, ...props }) => <th className="border border-border bg-muted px-4 py-2 text-left font-semibold" {...props} />,
            td: ({ node, ...props }) => <td className="border border-border px-4 py-2" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// テキストからIDを生成するヘルパー関数
function createIdFromText(children: React.ReactNode): string {
  if (!children) return '';
  
  // ReactNodeから文字列を抽出
  const text = React.Children.toArray(children)
    .map(child => {
      if (typeof child === 'string') return child;
      if (typeof child === 'number') return child.toString();
      if (React.isValidElement(child) && child.props.children) 
        return createIdFromText(child.props.children);
      return '';
    })
    .join('');
  
  // 日本語も含めてURLに適した形式に変換
  return text
    .replace(/\s+/g, '-') // スペースをハイフンに変換
    .toLowerCase() // 小文字に変換
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\-]/g, ''); // 英数字、日本語、ハイフン以外を削除
}
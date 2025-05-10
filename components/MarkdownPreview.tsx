'use client';

import Markdown from '@/components/Markdown';

interface MarkdownPreviewProps {
  content: string;
}

export default function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <div className="text-muted-foreground text-center py-8">
        プレビューする内容がありません
      </div>
    );
  }

  return (
    <div className="prose prose-blue dark:prose-invert max-w-none">
      <Markdown content={content} />
    </div>
  );
}
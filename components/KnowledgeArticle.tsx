'use client';

import { Knowledge } from '@/lib/types';
import Markdown from '@/components/Markdown';
import TagList from '@/components/TagList';
import RelatedKnowledge from '@/components/RelatedKnowledge';

interface KnowledgeArticleProps {
  knowledge: Knowledge;
  relatedItems: Knowledge[];
}

export default function KnowledgeArticle({ knowledge, relatedItems }: KnowledgeArticleProps) {
  return (
    <>
      <article className="mt-6 bg-card p-6 rounded-lg shadow-sm">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-card-foreground">{knowledge.title}</h1>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2">
            <div className="text-muted-foreground">
              作成日: {new Date(knowledge.created).toLocaleDateString('ja-JP')}
              {knowledge.updated && ` (更新: ${new Date(knowledge.updated).toLocaleDateString('ja-JP')})`}
            </div>
            
            {knowledge.tags && knowledge.tags.length > 0 && (
              <TagList tags={knowledge.tags} />
            )}
          </div>
          
          {knowledge.description && (
            <div className="mt-4 p-4 bg-muted rounded-md text-muted-foreground">
              {knowledge.description}
            </div>
          )}
        </header>
        
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <Markdown content={knowledge.content} />
        </div>
      </article>
      
      {relatedItems.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">関連ナレッジ</h2>
          <RelatedKnowledge items={relatedItems} />
        </div>
      )}
    </>
  );
}
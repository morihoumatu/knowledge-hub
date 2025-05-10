import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Markdown from '@/components/Markdown';
import Breadcrumb from '@/components/Breadcrumb';
import TagList from '@/components/TagList';
import RelatedKnowledge from '@/components/RelatedKnowledge';
import Header from '@/components/Header';
import { getKnowledgeBySlug, getAllKnowledgeItems } from '@/lib/knowledge';

// 動的なメタデータの生成
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const knowledge = await getKnowledgeBySlug(params.slug);
  
  if (!knowledge) {
    return {
      title: 'ナレッジが見つかりませんでした | IT技術ナレッジベース',
    };
  }
  
  return {
    title: `${knowledge.title} | IT技術ナレッジベース`,
    description: knowledge.description || `${knowledge.title}に関する技術ナレッジ`,
  };
}

export default async function KnowledgePage({ params }: { params: { slug: string } }) {
  const knowledge = await getKnowledgeBySlug(params.slug);
  
  if (!knowledge) {
    notFound();
  }
  
  // 関連ナレッジの取得（同じタグを持つ他のナレッジ）
  const allItems = await getAllKnowledgeItems();
  const relatedItems = allItems
    .filter(item => 
      item.slug !== knowledge.slug && 
      item.tags?.some(tag => knowledge.tags?.includes(tag))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { name: 'ホーム', href: '/' },
            { name: knowledge.title, href: `/knowledge/${knowledge.slug}` },
          ]} 
        />
        
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
      </main>
    </div>
  );
}
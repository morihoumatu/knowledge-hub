import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import Header from '@/components/Header';
import dynamic from 'next/dynamic';
import { getKnowledgeBySlug, getAllKnowledgeItems } from '@/lib/knowledge';

// Import the client component dynamically
const KnowledgeArticle = dynamic(() => import('@/components/KnowledgeArticle'), {
  ssr: true
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const knowledge = await getKnowledgeBySlug(decodeURIComponent(params.slug));
  
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

export async function generateStaticParams() {
  const knowledgeItems = await getAllKnowledgeItems();
  return knowledgeItems.map((item) => ({
    slug: encodeURIComponent(item.slug),
  }));
}

export default async function KnowledgePage({ params }: { params: { slug: string } }) {
  const knowledge = await getKnowledgeBySlug(decodeURIComponent(params.slug));
  
  if (!knowledge) {
    notFound();
  }
  
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
            { name: knowledge.title, href: `/knowledge/${encodeURIComponent(knowledge.slug)}` },
          ]} 
        />
        
        <KnowledgeArticle 
          knowledge={knowledge}
          relatedItems={relatedItems}
        />
      </main>
    </div>
  );
}
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import KnowledgeForm from '@/components/KnowledgeForm';
import { getKnowledgeBySlug } from '@/lib/knowledge';

export const metadata = {
  title: 'ナレッジ編集 | IT技術ナレッジベース',
  description: 'IT技術ナレッジの編集',
};

export default async function EditPage({ params }: { params: { slug: string } }) {
  const knowledge = await getKnowledgeBySlug(decodeURIComponent(params.slug));
  
  if (!knowledge) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { name: 'ホーム', href: '/' },
            { name: knowledge.title, href: `/knowledge/${encodeURIComponent(knowledge.slug)}` },
            { name: '編集', href: `/edit/${encodeURIComponent(knowledge.slug)}` },
          ]} 
        />
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-6">ナレッジ編集</h1>
          <KnowledgeForm 
            mode="edit"
            initialData={knowledge}
          />
        </div>
      </main>
    </div>
  );
}
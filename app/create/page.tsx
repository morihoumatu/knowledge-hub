import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import KnowledgeForm from '@/components/KnowledgeForm';

export const metadata = {
  title: 'ナレッジ投稿 | IT技術ナレッジベース',
  description: '新しいIT技術ナレッジを投稿',
};

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { name: 'ホーム', href: '/' },
            { name: 'ナレッジ投稿', href: '/create' },
          ]} 
        />
        
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-6">ナレッジ投稿</h1>
          <KnowledgeForm />
        </div>
      </main>
    </div>
  );
}
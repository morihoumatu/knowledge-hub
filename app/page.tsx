import { Metadata } from 'next';
import ClientHome from '@/components/ClientHome';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'IT技術ナレッジベース',
  description: 'IT技術に関する知識を管理・検索できるシステム',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ClientHome />
    </div>
  );
}
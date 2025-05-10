import Link from 'next/link';
import Header from '@/components/Header';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <FileQuestion className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-foreground mb-4">ページが見つかりません</h1>
          <p className="text-xl text-muted-foreground mb-8">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
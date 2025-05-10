'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Knowledge } from '@/lib/types';
import Markdown from '@/components/Markdown';
import TagList from '@/components/TagList';
import RelatedKnowledge from '@/components/RelatedKnowledge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

interface KnowledgeArticleProps {
  knowledge: Knowledge;
  relatedItems: Knowledge[];
}

export default function KnowledgeArticle({ knowledge, relatedItems }: KnowledgeArticleProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/knowledge/${knowledge.slug}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'ナレッジの削除に失敗しました');
      }

      toast({
        title: '削除完了',
        description: 'ナレッジを削除しました',
      });

      // ホームページにリダイレクト
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error('削除エラー:', error);
      toast({
        variant: 'destructive',
        title: 'エラー',
        description: error instanceof Error ? error.message : '削除に失敗しました。もう一度お試しください。',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <article className="mt-6 bg-card p-6 rounded-lg shadow-sm">
        <header className="mb-6">
          <div className="flex justify-between items-start gap-4">
            <h1 className="text-3xl font-bold text-card-foreground">{knowledge.title}</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/edit/${knowledge.slug}`)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                編集
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" />
                    削除
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>ナレッジを削除しますか？</AlertDialogTitle>
                    <AlertDialogDescription>
                      この操作は取り消せません。ナレッジは完全に削除されます。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      {isDeleting ? '削除中...' : '削除する'}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
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
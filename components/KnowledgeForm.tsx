'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import MarkdownPreview from '@/components/MarkdownPreview';

const formSchema = z.object({
  title: z.string()
    .min(1, '必須項目です')
    .max(100, '100文字以内で入力してください'),
  description: z.string()
    .max(300, '300文字以内で入力してください')
    .optional(),
  tags: z.string()
    .transform(val => val.split(',').map(tag => tag.trim()).filter(Boolean)),
  content: z.string()
    .min(1, '必須項目です')
    .max(50000, '50,000文字以内で入力してください'),
});

type FormData = z.infer<typeof formSchema>;

export default function KnowledgeForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      tags: '',
      content: '',
    },
  });

  const content = watch('content');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/knowledge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          created: new Date().toISOString(),
        }),
      });

      const responseData = await response.text();
      
      if (!response.ok) {
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        throw new Error(`API Error: ${response.status} ${responseData}`);
      }

      toast({
        title: '投稿完了',
        description: 'ナレッジを投稿しました',
      });

      router.push('/');
    } catch (error) {
      console.error('投稿エラー:', error);
      toast({
        variant: 'destructive',
        title: 'エラー',
        description: error instanceof Error ? error.message : '投稿に失敗しました。もう一度お試しください。',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">タイトル</Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="例: Dockerの基本コマンド"
          />
          {errors.title && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{errors.title.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <Label htmlFor="description">説明（オプション）</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="ナレッジの簡単な説明を入力してください"
          />
          {errors.description && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{errors.description.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <Label htmlFor="tags">タグ（カンマ区切り）</Label>
          <Input
            id="tags"
            {...register('tags')}
            placeholder="例: Docker, コンテナ, インフラ"
          />
          {errors.tags && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{errors.tags.message}</AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="content">本文（Markdown形式）</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? 'エディタに戻る' : 'プレビュー'}
            </Button>
          </div>

          {isPreview ? (
            <div className="min-h-[400px] p-4 border rounded-md bg-card">
              <MarkdownPreview content={content} />
            </div>
          ) : (
            <Textarea
              id="content"
              {...register('content')}
              className="min-h-[400px] font-mono"
              placeholder="# タイトル

## はじめに

本文を入力してください..."
            />
          )}
          {errors.content && (
            <Alert variant="destructive" className="mt-2">
              <AlertDescription>{errors.content.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/')}
        >
          キャンセル
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          投稿する
        </Button>
      </div>
    </form>
  );
}
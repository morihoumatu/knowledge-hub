'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // エラーをログに記録
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <AlertCircle className="h-24 w-24 text-destructive mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-foreground mb-4">エラーが発生しました</h1>
        <p className="text-xl text-muted-foreground mb-6">
          申し訳ありませんが、問題が発生しました。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            もう一度試す
          </button>
          <Link 
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
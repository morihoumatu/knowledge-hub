'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { BookOpen, PlusCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* ロゴとタイトル */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="hidden md:inline-block font-bold text-lg">IT技術ナレッジベース</span>
            <span className="inline-block md:hidden font-bold text-lg">IT知識庫</span>
          </Link>
        </div>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            ホーム
          </Link>
          <Link 
            href="/category" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/category" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            カテゴリ
          </Link>
          <Link 
            href="/about" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            使い方
          </Link>
          <Link href="/create">
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              投稿する
            </Button>
          </Link>
          <ThemeToggle />
        </nav>

        {/* モバイルメニューボタン */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/create">
            <Button size="sm" variant="ghost">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label="メニューを開く"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="md:hidden border-b">
          <div className="container py-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className={cn(
                "px-2 py-1 rounded-md text-sm font-medium",
                pathname === "/" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              ホーム
            </Link>
            <Link 
              href="/category" 
              className={cn(
                "px-2 py-1 rounded-md text-sm font-medium",
                pathname === "/category" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              カテゴリ
            </Link>
            <Link 
              href="/about" 
              className={cn(
                "px-2 py-1 rounded-md text-sm font-medium",
                pathname === "/about" ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              使い方
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
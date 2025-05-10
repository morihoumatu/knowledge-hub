import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex" aria-label="パンくずリスト">
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => {
          // 最後の項目かどうかをチェック
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.href} className="flex items-center text-sm">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              )}
              
              {isLast ? (
                // 最後の項目はリンクではなくテキストとして表示
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                // それ以外の項目はリンクとして表示
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
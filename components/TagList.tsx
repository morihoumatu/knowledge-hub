'use client';

import Link from 'next/link';
import { Tag as TagIcon } from 'lucide-react';

interface TagListProps {
  tags: string[];
  limit?: number;
}

export default function TagList({ tags, limit }: TagListProps) {
  // タグの表示数を制限（省略可能）
  const displayTags = limit ? tags.slice(0, limit) : tags;
  
  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map(tag => (
        <Link 
          key={tag} 
          href={`/?tag=${encodeURIComponent(tag)}`}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground text-xs font-medium transition-colors"
        >
          <TagIcon className="h-3 w-3" />
          {tag}
        </Link>
      ))}
      
      {limit && tags.length > limit && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">
          +{tags.length - limit}
        </span>
      )}
    </div>
  );
}
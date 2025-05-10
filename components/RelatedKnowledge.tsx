'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import { KnowledgeItem } from '@/lib/types';

interface RelatedKnowledgeProps {
  items: KnowledgeItem[];
}

export default function RelatedKnowledge({ items }: RelatedKnowledgeProps) {
  if (items.length === 0) return null;
  
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {items.map(item => (
        <Link 
          key={item.slug}
          href={`/knowledge/${item.slug}`}
          className="group flex flex-col h-full rounded-lg border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:border-primary/30"
        >
          <div className="flex items-start gap-2">
            <BookOpen className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium text-card-foreground group-hover:text-primary line-clamp-2">
                {item.title}
              </h3>
              
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <span>{new Date(item.created).toLocaleDateString('ja-JP')}</span>
                <ChevronRight className="h-3 w-3 ml-auto text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
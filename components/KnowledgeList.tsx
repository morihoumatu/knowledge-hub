'use client';

import Link from 'next/link';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import { KnowledgeItem } from '@/lib/types';
import { motion } from 'framer-motion';

interface KnowledgeListProps {
  items: KnowledgeItem[];
}

export default function KnowledgeList({ items }: KnowledgeListProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Link href={`/knowledge/${item.slug}`}>
            <div className="group flex flex-col h-full rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary">{item.title}</h2>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
              </div>
              
              {item.description && (
                <p className="mt-2 text-muted-foreground line-clamp-2">{item.description}</p>
              )}
              
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(item.created).toLocaleDateString('ja-JP')}</span>
                </div>
                
                {item.tags && item.tags.length > 0 && (
                  <div className="flex items-center gap-1 flex-wrap">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="inline-block px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Tag as TagIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: { name: string; count: number }[];
  selectedTags: string[];
  onSelectTag: (tag: string) => void;
}

export default function TagFilter({ tags, selectedTags, onSelectTag }: TagFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (tags.length === 0) return null;

  return (
    <div className="bg-card rounded-lg border border-border p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <TagIcon className="h-4 w-4 text-primary" />
          <span>タグ</span>
        </h2>
        <button 
          onClick={toggleExpand} 
          className="text-muted-foreground hover:text-foreground transition"
          aria-label={isExpanded ? 'タグを折りたたむ' : 'タグを展開する'}
        >
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="space-y-1 mt-2">
          {tags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => onSelectTag(tag.name)}
              className={cn(
                "flex items-center justify-between w-full px-2 py-1.5 text-sm rounded-md transition",
                selectedTags.includes(tag.name)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <span className="truncate">{tag.name}</span>
              <span className="ml-auto text-xs font-medium bg-muted rounded-full px-2 py-0.5">
                {tag.count}
              </span>
            </button>
          ))}
        </div>
      )}
      
      {selectedTags.length > 0 && (
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">選択中のタグ</span>
            <button
              onClick={() => selectedTags.forEach(tag => onSelectTag(tag))}
              className="text-xs text-primary hover:underline"
            >
              クリア
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedTags.map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
              >
                {tag}
                <button
                  onClick={() => onSelectTag(tag)}
                  className="h-3 w-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 inline-flex items-center justify-center"
                  aria-label={`${tag}を除外`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
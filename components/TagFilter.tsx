'use client';

import { useState } from 'react';
import { Tag as TagIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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

  const TagList = () => (
    <div className="space-y-1">
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
  );

  const SelectedTags = () => (
    selectedTags.length > 0 && (
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
        <div className="flex flex-wrap gap-1">
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
    )
  );

  if (tags.length === 0) return null;

  // モバイル表示用のシート
  const MobileTagFilter = () => (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            <TagIcon className="h-4 w-4 mr-2" />
            タグでフィルター
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>タグでフィルター</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <TagList />
            <SelectedTags />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );

  // デスクトップ表示用のサイドバー
  const DesktopTagFilter = () => (
    <div className="hidden lg:block bg-card rounded-lg border border-border p-4 shadow-sm">
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
        <>
          <TagList />
          <SelectedTags />
        </>
      )}
    </div>
  );

  return (
    <>
      <MobileTagFilter />
      <DesktopTagFilter />
    </>
  );
}
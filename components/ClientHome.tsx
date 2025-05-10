'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import KnowledgeList from '@/components/KnowledgeList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import { useToast } from '@/hooks/use-toast';
import { KnowledgeItem } from '@/lib/types';

interface ClientHomeProps {
  initialKnowledgeItems: KnowledgeItem[];
}

export default function ClientHome({ initialKnowledgeItems }: ClientHomeProps) {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  
  // 状態管理
  const [knowledgeItems] = useState(initialKnowledgeItems);
  const [filteredItems, setFilteredItems] = useState(initialKnowledgeItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<{ name: string; count: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  // 初期化処理
  useEffect(() => {
    // URLからタグを取得
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTags([tagParam]);
    }
    
    // 全タグを抽出して重複を排除
    const tags = knowledgeItems.flatMap(item => item.tags || []);
    const uniqueTags = [...new Set(tags)].sort();
    setAvailableTags(uniqueTags.map(tag => ({ 
      name: tag, 
      count: tags.filter(t => t === tag).length 
    })));
  }, [searchParams, knowledgeItems]);

  // 検索とフィルタリング
  useEffect(() => {
    if (knowledgeItems.length === 0) return;
    
    let results = [...knowledgeItems];
    
    // 検索語でフィルタリング
    if (searchTerm) {
      if (useRegex) {
        try {
          const regex = new RegExp(searchTerm, 'i');
          results = results.filter(item => 
            regex.test(item.title) || 
            regex.test(item.description || '') ||
            regex.test(item.content || '')
          );
        } catch (error) {
          console.error('正規表現エラー:', error);
        }
      } else {
        const lowerSearchTerm = searchTerm.toLowerCase();
        results = results.filter(item => 
          item.title.toLowerCase().includes(lowerSearchTerm) || 
          item.description?.toLowerCase().includes(lowerSearchTerm) ||
          item.content?.toLowerCase().includes(lowerSearchTerm)
        );
      }
    }
    
    // タグでフィルタリング
    if (selectedTags.length > 0) {
      results = results.filter(item => 
        selectedTags.every(tag => item.tags?.includes(tag))
      );
    }
    
    setFilteredItems(results);
  }, [searchTerm, selectedTags, knowledgeItems, useRegex]);

  // 検索ハンドラー
  const handleSearch = (term: string, regex: boolean) => {
    setSearchTerm(term);
    setUseRegex(regex);
  };

  // タグ選択ハンドラー
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-foreground">IT技術ナレッジベース</h1>
      
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <TagFilter 
            tags={availableTags} 
            selectedTags={selectedTags} 
            onSelectTag={handleTagSelect} 
          />
        </div>
        
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <p className="text-muted-foreground mb-4">
                {filteredItems.length}件のナレッジが見つかりました
              </p>
              
              <KnowledgeList items={filteredItems} />
              
              {filteredItems.length === 0 && (
                <div className="text-center py-12 bg-muted rounded-lg">
                  <p className="text-lg text-muted-foreground">検索条件に一致するナレッジが見つかりませんでした。</p>
                  <p className="text-muted-foreground">検索語やタグを変更してお試しください。</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
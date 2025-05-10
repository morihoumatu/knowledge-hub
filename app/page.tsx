import { useState } from 'react';
import { Metadata } from 'next';
import KnowledgeList from '@/components/KnowledgeList';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import Header from '@/components/Header';
import { getAllKnowledgeItems } from '@/lib/knowledge';

export const metadata: Metadata = {
  title: 'IT技術ナレッジベース',
  description: 'IT技術に関する知識を管理・検索できるシステム',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ClientHome />
    </div>
  );
}

// クライアントコンポーネント
'use client';

import { useEffect } from 'react';

function ClientHome() {
  // 状態管理
  const [knowledgeItems, setKnowledgeItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getAllKnowledgeItems();
        setKnowledgeItems(items);
        setFilteredItems(items);
        
        // 全タグを抽出して重複を排除
        const tags = items.flatMap(item => item.tags || []);
        const uniqueTags = [...new Set(tags)].sort();
        setAvailableTags(uniqueTags.map(tag => ({ name: tag, count: tags.filter(t => t === tag).length })));
        
        setIsLoading(false);
      } catch (error) {
        console.error('ナレッジデータの取得に失敗しました:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // 検索とフィルタリング
  useEffect(() => {
    if (knowledgeItems.length === 0) return;
    
    let results = [...knowledgeItems];
    
    // 検索語でフィルタリング
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      results = results.filter(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) || 
        item.description?.toLowerCase().includes(lowerSearchTerm) ||
        item.content?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // タグでフィルタリング
    if (selectedTags.length > 0) {
      results = results.filter(item => 
        selectedTags.every(tag => item.tags?.includes(tag))
      );
    }
    
    setFilteredItems(results);
  }, [searchTerm, selectedTags, knowledgeItems]);

  // 検索ハンドラー
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // タグ選択ハンドラー
  const handleTagSelect = (tag) => {
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
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <TagFilter 
            tags={availableTags} 
            selectedTags={selectedTags} 
            onSelectTag={handleTagSelect} 
          />
        </div>
        
        <div className="md:col-span-3">
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
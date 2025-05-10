'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import { Folder, ChevronRight, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { getAllKnowledgeItems } from '@/lib/knowledge';
import { KnowledgeItem } from '@/lib/types';

export default function CategoryPage() {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [categories, setCategories] = useState<Record<string, KnowledgeItem[]>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getAllKnowledgeItems();
        setKnowledgeItems(items);
        
        // タグをカテゴリとして使用し、タグごとにナレッジをグループ化
        const categorized: Record<string, KnowledgeItem[]> = {};
        
        items.forEach(item => {
          (item.tags || []).forEach(tag => {
            if (!categorized[tag]) {
              categorized[tag] = [];
            }
            categorized[tag].push(item);
          });
        });
        
        setCategories(categorized);
        setIsLoading(false);
      } catch (error) {
        console.error('カテゴリデータの取得に失敗しました:', error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { name: 'ホーム', href: '/' },
            { name: 'カテゴリ', href: '/category' },
          ]} 
        />
        
        <h1 className="text-3xl font-bold mb-6 text-foreground">カテゴリ別ナレッジ</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {Object.keys(categories).length > 0 ? (
              Object.entries(categories)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([category, items], index) => (
                  <motion.div
                    key={category}
                    className="bg-card rounded-lg border border-border shadow-sm p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Folder className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold text-card-foreground">
                        {category} <span className="text-muted-foreground text-sm">({items.length}件)</span>
                      </h2>
                    </div>
                    
                    <div className="grid gap-2">
                      {items.map(item => (
                        <Link 
                          key={item.slug} 
                          href={`/knowledge/${item.slug}`}
                          className="flex items-center justify-between p-3 rounded-md hover:bg-muted group"
                        >
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground group-hover:text-primary truncate">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {new Date(item.created).toLocaleDateString('ja-JP')}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))
            ) : (
              <div className="text-center py-12 bg-muted rounded-lg">
                <Tag className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium text-foreground">カテゴリが見つかりません</p>
                <p className="text-muted-foreground mt-2">
                  ナレッジにタグを追加すると、カテゴリとして自動的に分類されます。
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
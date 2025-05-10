import Header from '@/components/Header';
import Breadcrumb from '@/components/Breadcrumb';
import { Info, Book, Tag, Search, FileText } from 'lucide-react';

export const metadata = {
  title: '使い方 | IT技術ナレッジベース',
  description: 'IT技術ナレッジベースの使い方ガイド',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={[
            { name: 'ホーム', href: '/' },
            { name: '使い方', href: '/about' },
          ]} 
        />
        
        <div className="mt-6 bg-card p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold text-card-foreground mb-6 flex items-center gap-2">
            <Info className="h-8 w-8 text-primary" />
            IT技術ナレッジベースの使い方
          </h1>
          
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="lead">
              IT技術ナレッジベースは、技術ドキュメントやナレッジを簡単に管理・検索できるシステムです。
              このガイドでは、システムを効果的に使うための基本的な使い方を説明します。
            </p>
            
            <h2 className="flex items-center gap-2 mt-8">
              <Book className="h-6 w-6 text-primary" />
              ナレッジの閲覧
            </h2>
            <p>
              ホームページでは、登録されているすべてのナレッジアイテムが表示されます。
              各アイテムはカード形式で表示され、タイトル、作成日、タグなどの基本情報を確認できます。
              特定のナレッジを閲覧するには、該当するカードをクリックして詳細ページに移動します。
            </p>
            
            <h2 className="flex items-center gap-2 mt-8">
              <Search className="h-6 w-6 text-primary" />
              検索とフィルタリング
            </h2>
            <p>
              上部の検索バーを使用して、キーワードでナレッジを検索できます。
              タイトル、説明、本文の中からキーワードに一致するナレッジが表示されます。
              また、左側のサイドバーにあるタグフィルターを使って、特定のタグを持つナレッジだけを絞り込むことができます。
              複数のタグを選択すると、選択したすべてのタグを持つナレッジだけが表示されます。
            </p>
            
            <h2 className="flex items-center gap-2 mt-8">
              <Tag className="h-6 w-6 text-primary" />
              タグによるナビゲーション
            </h2>
            <p>
              各ナレッジには関連するタグが付けられています。タグをクリックすると、そのタグを持つナレッジのみを表示するフィルターが適用されます。
              ナレッジの詳細ページでも関連タグが表示され、関連するトピックへの素早いナビゲーションが可能です。
            </p>
            
            <h2 className="flex items-center gap-2 mt-8">
              <FileText className="h-6 w-6 text-primary" />
              ナレッジの管理（ファイルシステム）
            </h2>
            <p>
              このシステムでは、Markdownファイルを使用してナレッジを管理しています。
              新しいナレッジを追加するには、<code>docs/markdown/</code> ディレクトリに新しいMarkdownファイル（.md）を作成します。
              ファイルの先頭には、FrontMatterと呼ばれるYAML形式のメタデータを記述します。例えば：
            </p>
            
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{`---
title: ナレッジのタイトル
description: 簡単な説明
tags: [タグ1, タグ2, タグ3]
created: 2024-05-10
updated: 2024-05-15  # 省略可能
---

# 本文のコンテンツ
ここからMarkdown形式で本文を記述します。`}</code>
            </pre>
            
            <p>
              ファイルを保存すると、システムが自動的に新しいナレッジとして認識します。
              更新する場合も同様に、既存のMarkdownファイルを編集して保存するだけです。
            </p>
            
            <div className="bg-primary/10 p-4 rounded-md border-l-4 border-primary mt-8">
              <h3 className="text-lg font-medium text-foreground">ヒント</h3>
              <p className="mt-1">
                このシステムはローカル環境で動作するため、外部サービスやデータベースに依存せずに、
                Markdownファイルのみでナレッジを管理できます。
                GitなどのバージョンレジストリでMarkdownファイルを管理すれば、履歴管理や共同編集も可能です。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
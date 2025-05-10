import path from 'path';
import { KnowledgeItem } from './types';

// サンプルデータ（実際のアプリケーションでは API を使用してデータを取得）
const sampleKnowledge: KnowledgeItem[] = [
  {
    slug: 'git基礎',
    title: 'Gitの基本',
    description: 'バージョン管理システムGitの基本的な使い方について解説します',
    tags: ['Git', 'バージョン管理', 'コマンドライン'],
    created: '2024-05-10T00:00:00.000Z',
    updated: '2024-05-15T00:00:00.000Z',
    content: `
# Gitの基本

## はじめに

Gitは分散型バージョン管理システムで、ソフトウェア開発において最も広く使われているツールの一つです。このドキュメントでは、Gitの基本的な概念と一般的なコマンドについて説明します。

## 基本コマンド

### リポジトリの初期化

新しいGitリポジトリを作成するには：

\`\`\`bash
git init
\`\`\`

### 変更のステージング

ファイルの変更をステージングエリアに追加するには：

\`\`\`bash
git add <ファイル名>
\`\`\`

すべての変更を追加するには：

\`\`\`bash
git add .
\`\`\`

### コミット

変更を記録（コミット）するには：

\`\`\`bash
git commit -m "コミットメッセージ"
\`\`\`

### リモートリポジトリの操作

リモートリポジトリを追加するには：

\`\`\`bash
git remote add origin <リポジトリURL>
\`\`\`

変更をプッシュするには：

\`\`\`bash
git push origin <ブランチ名>
\`\`\`

リモートの変更を取得するには：

\`\`\`bash
git pull origin <ブランチ名>
\`\`\`

## まとめ

Gitは強力なバージョン管理ツールであり、多くのコマンドとオプションがあります。このドキュメントでは基本的なコマンドのみを紹介しましたが、実務では他にも多くの機能を活用することができます。
`
  },
  {
    slug: 'PostgreSQLの導入',
    title: 'PostgreSQLの導入',
    description: 'PostgreSQLデータベースの基本的なセットアップと使い方',
    tags: ['PostgreSQL', 'データベース', 'SQL', 'バックエンド'],
    created: '2024-05-12T00:00:00.000Z',
    content: `
# PostgreSQLの導入方法

## はじめに

PostgreSQLは、高度な機能を持つオープンソースのリレーショナルデータベース管理システム（RDBMS）です。このドキュメントでは、PostgreSQLの基本的なインストール方法と初期設定について解説します。

## インストール

### Ubuntuの場合

\`\`\`bash
sudo apt update
sudo apt install postgresql postgresql-contrib
\`\`\`

### macOSの場合（Homebrewを使用）

\`\`\`bash
brew install postgresql
\`\`\`

### Windowsの場合

1. [PostgreSQL公式ウェブサイト](https://www.postgresql.org/download/windows/)からインストーラーをダウンロード
2. インストーラーを実行し、画面の指示に従う

## まとめ

PostgreSQLは強力で柔軟なデータベース管理システムであり、多くのアプリケーションで利用されています。基本的なインストールと設定を行えば、すぐに使い始めることができます。
`
  }
];

// すべてのナレッジアイテムを取得する関数
export async function getAllKnowledgeItems(): Promise<KnowledgeItem[]> {
  return sampleKnowledge;
}

// スラッグからナレッジアイテムを取得する関数
export async function getKnowledgeBySlug(slug: string): Promise<KnowledgeItem | null> {
  const decodedSlug = decodeURIComponent(slug);
  const item = sampleKnowledge.find(item => item.slug === decodedSlug);
  return item || null;
}
import fs from 'fs';
import path from 'path';
import { KnowledgeItem } from './types';
import matter from 'gray-matter';

// Markdownファイルが格納されるディレクトリパス
const KNOWLEDGE_DIRECTORY = path.join(process.cwd(), 'docs/markdown');

// すべてのナレッジアイテムを取得する関数
export async function getAllKnowledgeItems(): Promise<KnowledgeItem[]> {
  try {
    // docs/markdown ディレクトリが存在しない場合は作成
    if (!fs.existsSync(KNOWLEDGE_DIRECTORY)) {
      fs.mkdirSync(KNOWLEDGE_DIRECTORY, { recursive: true });
      // サンプルファイルを作成
      createSampleMarkdownFiles();
    }

    // ディレクトリ内のMarkdownファイルの一覧を取得
    const fileNames = fs.readdirSync(KNOWLEDGE_DIRECTORY);
    const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

    // 各ファイルを読み込んでメタデータと内容を抽出
    const knowledgeItems = await Promise.all(
      markdownFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const filePath = path.join(KNOWLEDGE_DIRECTORY, fileName);
        
        // ファイルの内容を読み込む
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // gray-matter を使用してfront matterとコンテンツを分離
        const { data, content } = matter(fileContents);
        
        // ナレッジアイテムを作成
        const knowledgeItem: KnowledgeItem = {
          slug,
          title: data.title || slug, // タイトルがない場合はファイル名を使用
          tags: data.tags || [],
          created: data.created ? new Date(data.created).toISOString() : new Date().toISOString(),
          updated: data.updated ? new Date(data.updated).toISOString() : undefined,
          description: data.description || '',
          content: content,
        };
        
        return knowledgeItem;
      })
    );

    // 作成日の降順でソート（新しいものが先頭に）
    return knowledgeItems.sort((a, b) => {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    });
  } catch (error) {
    console.error('ナレッジアイテムの取得中にエラーが発生しました:', error);
    return [];
  }
}

// スラッグからナレッジアイテムを取得する関数
export async function getKnowledgeBySlug(slug: string): Promise<KnowledgeItem | null> {
  try {
    const filePath = path.join(KNOWLEDGE_DIRECTORY, `${slug}.md`);
    
    // ファイルが存在しない場合はnullを返す
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    // ファイルの内容を読み込む
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // gray-matter を使用してfront matterとコンテンツを分離
    const { data, content } = matter(fileContents);
    
    // ナレッジアイテムを作成
    const knowledgeItem: KnowledgeItem = {
      slug,
      title: data.title || slug, // タイトルがない場合はファイル名を使用
      tags: data.tags || [],
      created: data.created ? new Date(data.created).toISOString() : new Date().toISOString(),
      updated: data.updated ? new Date(data.updated).toISOString() : undefined,
      description: data.description || '',
      content: content,
    };
    
    return knowledgeItem;
  } catch (error) {
    console.error(`スラッグ "${slug}" のナレッジアイテムの取得中にエラーが発生しました:`, error);
    return null;
  }
}

// サンプルのMarkdownファイルを作成する関数
function createSampleMarkdownFiles() {
  const gitBasics = {
    frontMatter: `---
title: Gitの基本
description: バージョン管理システムGitの基本的な使い方について解説します
tags: [Git, バージョン管理, コマンドライン]
created: 2024-05-10
updated: 2024-05-15
---`,
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

## ブランチの操作

### ブランチの作成と切り替え

新しいブランチを作成するには：

\`\`\`bash
git branch <ブランチ名>
\`\`\`

ブランチを切り替えるには：

\`\`\`bash
git checkout <ブランチ名>
\`\`\`

作成と切り替えを同時に行うには：

\`\`\`bash
git checkout -b <ブランチ名>
\`\`\`

### ブランチのマージ

別のブランチの変更を現在のブランチにマージするには：

\`\`\`bash
git merge <ブランチ名>
\`\`\`

## 状態確認

### 変更の確認

現在の変更状態を確認するには：

\`\`\`bash
git status
\`\`\`

### コミット履歴の確認

コミット履歴を確認するには：

\`\`\`bash
git log
\`\`\`

グラフィカルに表示するには：

\`\`\`bash
git log --graph --oneline --all
\`\`\`

## まとめ

Gitは強力なバージョン管理ツールであり、多くのコマンドとオプションがあります。このドキュメントでは基本的なコマンドのみを紹介しましたが、実務では他にも多くの機能を活用することができます。
`
  };

  const postgresqlSetup = {
    frontMatter: `---
title: PostgreSQLの導入
description: PostgreSQLデータベースの基本的なセットアップと使い方
tags: [PostgreSQL, データベース, SQL, バックエンド]
created: 2024-05-12
---`,
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

## 基本的な設定

### サービスの開始

#### Ubuntuの場合

\`\`\`bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
\`\`\`

#### macOSの場合

\`\`\`bash
brew services start postgresql
\`\`\`

### 初期ユーザーとデータベースの作成

PostgreSQLをインストールすると、デフォルトで\`postgres\`というユーザーが作成されます。このユーザーを使って初期設定を行います。

\`\`\`bash
sudo -u postgres psql
\`\`\`

PostgreSQLのコマンドラインインターフェイス（psql）で以下のコマンドを実行：

\`\`\`sql
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydatabase;
GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;
\\q
\`\`\`

## 基本的なSQL操作

データベースに接続：

\`\`\`bash
psql -U myuser -d mydatabase
\`\`\`

### テーブルの作成

\`\`\`sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

### データの挿入

\`\`\`sql
INSERT INTO users (username, email)
VALUES ('testuser', 'test@example.com');
\`\`\`

### データの取得

\`\`\`sql
SELECT * FROM users;
\`\`\`

## PostgreSQLの主な特徴

- ACID準拠のトランザクション
- 複雑なクエリのサポート
- トリガーとストアドプロシージャ
- 地理情報システム（PostGIS拡張機能）
- JSON/JSONBデータ型のサポート
- 高度な全文検索機能

## まとめ

PostgreSQLは強力で柔軟なデータベース管理システムであり、多くのアプリケーションで利用されています。基本的なインストールと設定を行えば、すぐに使い始めることができます。
`
  };

  // サンプルファイルを書き込む
  fs.writeFileSync(
    path.join(KNOWLEDGE_DIRECTORY, 'git基礎.md'),
    `${gitBasics.frontMatter}\n\n${gitBasics.content}`
  );

  fs.writeFileSync(
    path.join(KNOWLEDGE_DIRECTORY, 'PostgreSQLの導入.md'),
    `${postgresqlSetup.frontMatter}\n\n${postgresqlSetup.content}`
  );
}
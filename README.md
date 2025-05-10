# IT技術ナレッジベース管理システム

ローカル環境で完結する、IT技術ナレッジを管理・閲覧するための日本語UIシステムです。Markdown形式のナレッジを簡単に追加・管理・検索できます。

## 機能

- Markdownファイルの閲覧（シンタックスハイライト付き）
- タグ、全文検索によるフィルタリング
- レスポンシブUI対応
- テーマ切替（ライト/ダーク）
- ローカルファイルベースの管理（外部サービス不要）

## セットアップ

### 必要条件

- Node.js 16.x 以上
- npm 7.x 以上

### インストール手順

1. リポジトリをクローンするか、ZIPファイルをダウンロードして解凍します。

```bash
git clone https://github.com/yourusername/it-knowledge-base.git
cd it-knowledge-base
```

2. 依存関係をインストールします。

```bash
npm install
```

3. 開発サーバーを起動します。

```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてアプリケーションを表示します。

## ナレッジの追加方法

1. `docs/markdown/` ディレクトリにMarkdownファイル（.md）を作成します。
2. ファイルの先頭に以下のようなFrontMatterを追加してメタデータを定義します。

```markdown
---
title: ナレッジのタイトル
description: 簡単な説明（オプション）
tags: [タグ1, タグ2, タグ3]
created: 2024-05-10
updated: 2024-05-15  # オプション
---

# 本文の内容

ここからMarkdown形式で文章を記述します。
```

3. 保存すると、システムが自動的に新しいナレッジとして認識します。

## プロジェクト構成

```
/
├── app/                  # Next.jsのアプリケーションルート
│   ├── globals.css       # グローバルスタイル
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # ホームページ
│   ├── knowledge/        # ナレッジ詳細ページ
│   ├── category/         # カテゴリページ
│   └── about/            # 使い方ページ
├── components/           # 共通コンポーネント
├── lib/                  # ユーティリティ関数
├── docs/                 # ナレッジファイル
│   └── markdown/         # Markdownファイル
├── public/               # 静的ファイル
└── ...
```

## カスタマイズ

### テーマの変更

テーマカラーは `app/globals.css` ファイル内のCSS変数を編集することで変更できます。

### 新機能の追加

このプロジェクトはNext.jsで構築されているため、React/Next.jsの知識があれば、比較的簡単に機能を拡張できます。

## ビルドとデプロイ

本番用にビルドするには以下のコマンドを実行します。

```bash
npm run build
```

ビルド後のファイルは `out` ディレクトリに生成され、任意のWebサーバーでホストできます。

## ライセンス

[MIT](LICENSE)
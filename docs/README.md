# ナレッジベースのドキュメント

このディレクトリには、IT技術ナレッジベースのMarkdownファイルが保存されています。

## ディレクトリ構造

- `markdown/` - Markdownファイル(.md)を格納するディレクトリ

## ナレッジファイルの作成方法

1. `markdown/` ディレクトリに新しい `.md` ファイルを作成します
2. ファイル名は日本語でも英語でも構いません（例: `git基礎.md`, `docker-compose.md`）
3. ファイルの先頭に以下の形式でFrontMatterを記述します:

```
---
title: タイトル
description: 簡単な説明
tags: [タグ1, タグ2, タグ3]
created: 2024-05-15
updated: 2024-05-16  # 省略可能
---
```

4. FrontMatterの後に、Markdown形式で本文を記述します

## Frontmatterのフィールド説明

| フィールド | 説明 | 必須 |
|-----------|------|------|
| title | ナレッジのタイトル | はい |
| description | 簡単な説明文 | いいえ |
| tags | タグの配列 `[タグ1, タグ2]` | いいえ |
| created | 作成日（YYYY-MM-DD形式） | はい |
| updated | 更新日（YYYY-MM-DD形式） | いいえ |

## サンプルファイル

```markdown
---
title: Dockerの基本コマンド
description: Dockerを使い始める際に知っておくべき基本的なコマンド集
tags: [Docker, コンテナ, インフラ]
created: 2024-05-20
---

# Dockerの基本コマンド

## イメージの操作

### イメージの一覧表示
```bash
docker images
```

### イメージのダウンロード
```bash
docker pull ubuntu:20.04
```

## その他の内容...
```
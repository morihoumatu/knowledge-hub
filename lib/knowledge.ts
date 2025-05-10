import { readFileSync, readdirSync, writeFileSync, mkdirSync, accessSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { KnowledgeItem } from './types';

// Markdownファイルが格納されるディレクトリパス
const KNOWLEDGE_DIRECTORY = join(process.cwd(), 'docs/markdown');

// すべてのナレッジアイテムを取得する関数
export async function getAllKnowledgeItems(): Promise<KnowledgeItem[]> {
  try {
    // docs/markdown ディレクトリが存在しない場合は作成
    try {
      accessSync(KNOWLEDGE_DIRECTORY);
    } catch {
      mkdirSync(KNOWLEDGE_DIRECTORY, { recursive: true });
    }

    // ディレクトリ内のMarkdownファイルの一覧を取得
    const fileNames = readdirSync(KNOWLEDGE_DIRECTORY);
    const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

    // 各ファイルを読み込んでメタデータと内容を抽出
    const knowledgeItems = markdownFiles.map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = join(KNOWLEDGE_DIRECTORY, fileName);
      
      // ファイルの内容を読み込む
      const fileContents = readFileSync(filePath, 'utf8');
      
      // gray-matter を使用してfront matterとコンテンツを分離
      const { data, content } = matter(fileContents);
      
      // ナレッジアイテムを作成
      const knowledgeItem: KnowledgeItem = {
        slug,
        title: data.title || slug,
        tags: Array.isArray(data.tags) ? data.tags : data.tags?.split(',').map(tag => tag.trim()) || [],
        created: data.created ? new Date(data.created).toISOString() : new Date().toISOString(),
        updated: data.updated ? new Date(data.updated).toISOString() : undefined,
        description: data.description || '',
        content: content,
      };
      
      return knowledgeItem;
    });

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
    const filePath = join(KNOWLEDGE_DIRECTORY, `${slug}.md`);
    
    // ファイルが存在しない場合はnullを返す
    try {
      accessSync(filePath);
    } catch {
      return null;
    }
    
    // ファイルの内容を読み込む
    const fileContents = readFileSync(filePath, 'utf8');
    
    // gray-matter を使用してfront matterとコンテンツを分離
    const { data, content } = matter(fileContents);
    
    // ナレッジアイテムを作成
    const knowledgeItem: KnowledgeItem = {
      slug,
      title: data.title || slug,
      tags: Array.isArray(data.tags) ? data.tags : data.tags?.split(',').map(tag => tag.trim()) || [],
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

// ナレッジを保存する関数
export async function saveKnowledge(data: {
  title: string;
  content: string;
  tags: string[];
  description?: string;
  created: string;
}): Promise<{ slug: string }> {
  const { title, content, tags, description, created } = data;

  // スラグを生成（日本語を含むタイトルをURLフレンドリーに変換）
  const slug = title
    .toLowerCase()
    .replace(/[\s\u3000]+/g, '-')
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  // 年月のディレクトリパスを生成
  const date = new Date(created);
  const yearDir = date.getFullYear().toString();
  const monthDir = (date.getMonth() + 1).toString().padStart(2, '0');
  const dirPath = join(KNOWLEDGE_DIRECTORY, yearDir, monthDir);

  // ディレクトリを作成
  mkdirSync(dirPath, { recursive: true });

  // ファイル名を生成（スラグ + タイムスタンプ）
  const timestamp = date.getTime();
  const fileName = `${slug}-${timestamp}.md`;
  const filePath = join(dirPath, fileName);

  // frontmatterを生成
  const frontmatter = `---
title: ${title}
description: ${description || ''}
tags: [${tags.join(', ')}]
created: ${created}
---

${content}`;

  // ファイルを保存
  writeFileSync(filePath, frontmatter, 'utf8');

  return { slug: `${yearDir}/${monthDir}/${slug}-${timestamp}` };
}
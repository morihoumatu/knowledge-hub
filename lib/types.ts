/**
 * ナレッジアイテムの型定義
 */
export interface KnowledgeItem {
  /** ナレッジのスラッグ（URLパス用のID） */
  slug: string;
  
  /** タイトル */
  title: string;
  
  /** 作成日（ISO 8601形式） */
  created: string;
  
  /** 更新日（ISO 8601形式、省略可能） */
  updated?: string;
  
  /** タグの配列 */
  tags?: string[];
  
  /** 簡単な説明 */
  description?: string;
  
  /** Markdownコンテンツ */
  content: string;
}
import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Ensure docs directory exists
    await fs.mkdir('docs', { recursive: true });
    
    const files = await fs.readdir('docs');
    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error reading docs directory:', error);
    return NextResponse.json(
      { error: 'Failed to read docs directory' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { title, content, tags, description, created } = data;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'タイトルと本文は必須です' },
        { status: 400 }
      );
    }

    // ナレッジを保存
    const { slug } = await saveKnowledge({
      title,
      content,
      tags: Array.isArray(tags) ? tags : tags.split(',').map((tag: string) => tag.trim()),
      description,
      created,
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('ナレッジの保存中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'ナレッジの保存に失敗しました' },
      { status: 500 }
    );
  }
}
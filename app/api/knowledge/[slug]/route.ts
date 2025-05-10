import { NextResponse } from 'next/server';
import { getKnowledgeBySlug, saveKnowledge } from '@/lib/knowledge';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

// 編集用のPUTエンドポイント
export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json();
    const { title, content, tags, description } = data;
    const currentKnowledge = await getKnowledgeBySlug(params.slug);

    if (!currentKnowledge) {
      return NextResponse.json(
        { error: '編集対象のナレッジが見つかりません' },
        { status: 404 }
      );
    }

    // 新しいナレッジを保存
    const { slug } = await saveKnowledge({
      title,
      content,
      tags: Array.isArray(tags) ? tags : tags.split(',').map((tag: string) => tag.trim()),
      description,
      created: currentKnowledge.created,
    });

    // 古いファイルを削除（スラグが変更された場合）
    if (slug !== params.slug) {
      const oldFilePath = path.join(process.cwd(), 'docs/markdown', `${params.slug}.md`);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('ナレッジの更新中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'ナレッジの更新に失敗しました' },
      { status: 500 }
    );
  }
}

// 削除用のDELETEエンドポイント
export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const knowledge = await getKnowledgeBySlug(params.slug);
    
    if (!knowledge) {
      return NextResponse.json(
        { error: '削除対象のナレッジが見つかりません' },
        { status: 404 }
      );
    }

    // ファイルを削除
    const filePath = path.join(process.cwd(), 'docs/markdown', `${params.slug}.md`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'ファイルが見つかりません' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('ナレッジの削除中にエラーが発生しました:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'ナレッジの削除に失敗しました' },
      { status: 500 }
    );
  }
}
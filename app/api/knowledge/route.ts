import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

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
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create docs directory if it doesn't exist
    await fs.mkdir('docs', { recursive: true });

    // Create a URL-friendly slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create a unique filename with timestamp to avoid conflicts
    const timestamp = new Date().getTime();
    const filename = `${slug}-${timestamp}.md`;
    const filePath = path.join('docs', filename);

    // Create the markdown content with frontmatter
    const frontmatter = `---
title: ${title}
description: ${description || ''}
tags: ${Array.isArray(tags) ? tags.join(', ') : tags}
created: ${created}
---

${content}`;

    // Write the file
    await fs.writeFile(filePath, frontmatter, 'utf-8');

    return NextResponse.json({ 
      success: true, 
      filename,
      slug 
    });
  } catch (error) {
    console.error('Error saving knowledge:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save knowledge article' }, 
      { status: 500 }
    );
  }
}
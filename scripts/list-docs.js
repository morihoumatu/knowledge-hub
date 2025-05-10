const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DOCS_DIR = path.join(process.cwd(), 'docs/markdown');

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

// Markdownファイルの一覧を取得して情報を表示
function listDocs() {
  const files = fs.readdirSync(DOCS_DIR);
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  console.log('\nIT技術ナレッジベース - ドキュメント一覧\n');
  console.log('合計ファイル数:', markdownFiles.length, '\n');
  
  markdownFiles.forEach(file => {
    const filePath = path.join(DOCS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(content);
    
    console.log('ファイル名:', file);
    console.log('タイトル:', data.title || '未設定');
    console.log('作成日:', data.created || '未設定');
    console.log('タグ:', data.tags?.join(', ') || '未設定');
    console.log('-'.repeat(50), '\n');
  });
}

listDocs();
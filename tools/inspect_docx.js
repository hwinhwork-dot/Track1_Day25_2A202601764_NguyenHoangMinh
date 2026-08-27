const { execFileSync } = require('child_process');

const source = process.argv[2];
if (!source) throw new Error('Usage: node tools/inspect_docx.js <file.docx>');

const xml = execFileSync('unzip', ['-p', source, 'word/document.xml'], { encoding: 'utf8' });
const decode = (value) => value
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'");

let index = 0;
for (const paragraph of xml.matchAll(/<w:p(?:\s[^>]*)?>([\s\S]*?)<\/w:p>/g)) {
  const text = [...paragraph[1].matchAll(/<w:t(?:\s[^>]*)?>([\s\S]*?)<\/w:t>/g)]
    .map((part) => decode(part[1]))
    .join('');
  console.log(`${index}\t${JSON.stringify(text)}`);
  index += 1;
}

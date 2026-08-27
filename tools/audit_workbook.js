const { execFileSync } = require('child_process');

const file = process.argv[2];
if (!file) throw new Error('Usage: node tools/audit_workbook.js <file.xlsx>');

const extract = (entry) => execFileSync('unzip', ['-p', file, entry], { encoding: 'utf8' });
const decode = (text) => text
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'");

const sharedStrings = [...extract('xl/sharedStrings.xml').matchAll(/<si>([\s\S]*?)<\/si>/g)]
  .map((item) => decode(item[1]));

const sheets = [
  ['1_Cost_Job', 'xl/worksheets/sheet2.xml'],
  ['2_Pricing', 'xl/worksheets/sheet3.xml'],
  ['3_Value_Metric', 'xl/worksheets/sheet4.xml'],
  ['4_Channel_Fit', 'xl/worksheets/sheet5.xml'],
  ['5_90Day_Plan', 'xl/worksheets/sheet6.xml'],
  ['6_Benchmarks', 'xl/worksheets/sheet7.xml'],
];

for (const [name, entry] of sheets) {
  const xml = extract(entry);
  const rows = [];
  for (const cell of xml.matchAll(/<c r="([A-Z]+[0-9]+)"([^>]*)>([\s\S]*?)<\/c>/g)) {
    const address = cell[1];
    const attributes = cell[2];
    const body = cell[3];
    const valueMatch = body.match(/<v>([\s\S]*?)<\/v>/);
    const formulaMatch = body.match(/<f[^>]*>([\s\S]*?)<\/f>/);
    if (!valueMatch && !formulaMatch) continue;
    const value = valueMatch ? (attributes.includes('t="s"') ? sharedStrings[Number(valueMatch[1])] : valueMatch[1]) : '';
    rows.push({ address, value, formula: formulaMatch ? formulaMatch[1] : '' });
  }
  console.log(`\n${name}`);
  for (const row of rows) console.log(`${row.address}\t${row.value}\t${row.formula}`);
}

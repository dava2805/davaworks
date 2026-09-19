const fs = require('fs');
const path = require('path');
const map = {
  'src/content/apps/tabula.md': 'PRODUCTIVITY',
  'src/content/apps/datune.md': 'MUSIC',
  'src/content/apps/klang.md': 'MUSIC',
  'src/content/apps/mindthetrack.md': 'GAME',
  'src/content/apps/neun.md': 'GAME',
  'src/content/apps/pixelsync.md': 'GRAPHICS',
  'src/content/hardware/loopdatune.md': 'MUSIC'
};
for (const [file, subcat] of Object.entries(map)) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (!content.includes('subcategory:')) {
      const parts = content.split('---');
      if (parts.length >= 3) {
        parts[1] = parts[1].trimEnd() + `\nsubcategory: "${subcat}"\n`;
        fs.writeFileSync(filePath, parts.join('---'));
        console.log(`Updated ${file}`);
      }
    }
  }
}

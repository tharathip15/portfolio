const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      searchDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('gradient') || line.includes('shimmer') || line.includes('sweep') || line.includes('deg') || line.includes('blur') || line.includes('radial') || line.includes('linear')) {
          console.log(`${path.basename(fullPath)}:${index + 1} -> ${line.trim()}`);
        }
      });
    }
  }
}

searchDir(path.join(__dirname, 'src'));

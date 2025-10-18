const fs = require('fs');
const path = require('path');

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
    
    if (content.includes(scriptTag)) {
      console.log(`✓ Already injected: ${filePath}`);
      return;
    }
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${scriptTag}\n  </head>`);
    } else if (content.includes('<head>')) {
      content = content.replace('<head>', `<head>\n  ${scriptTag}`);
    } else {
      console.log(`⚠ No <head> tag found in ${filePath}`);
      return;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Injected: ${filePath}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

function findHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        findHTMLFiles(filePath);
      }
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

console.log('🔧 Injecting console capture script...\n');

const outDir = path.join(process.cwd(), 'out');
if (fs.existsSync(outDir)) {
  findHTMLFiles(outDir);
  console.log('\n✅ Console capture script injection complete!');
} else {
  console.log('⚠ No "out" directory found. Run build first.');
}
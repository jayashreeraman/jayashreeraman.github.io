const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

function convertMarkdownToHtml(mdFilePath) {
  const markdown = fs.readFileSync(mdFilePath, 'utf-8');
  const html = marked.parse(markdown);
  
  const htmlFilePath = mdFilePath.replace('.md', '.html');
  
  const template = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
  <title>Blog Post</title>
  <link rel="stylesheet" href="../../../css/styles.css">
</head>
<body>
  <div id="layout">
    <a href="#menu" id="menuLink" class="menu-link">
      <span></span>
    </a>
    <nav id="menu">
      <ul>
        <li class="heading"><span>Main</span></li>
        <ul>
          <li><a href="../../../index.html">Home</a></li>
          <li><a href="../../index.html">Blog</a></li>
        </ul>
      </ul>
    </nav>
    <article id="main" class="content">
      ${html}
      <p><a href="../../index.html">← Back to Blog</a></p>
    </article>
  </div>
  <script src="../../../js/menu.js"></script>
</body>
</html>`;
  
  fs.writeFileSync(htmlFilePath, template);
  console.log(`✓ Converted ${mdFilePath} → ${htmlFilePath}`);
}

const postsDir = 'blog/posts';

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.md')) {
      convertMarkdownToHtml(fullPath);
    }
  });
}

console.log('Starting markdown to HTML conversion...');
processDirectory(postsDir);
console.log('Conversion complete!');

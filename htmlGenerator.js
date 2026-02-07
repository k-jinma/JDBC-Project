const fs = require('fs');
const path = require('path');

/**
 * HTMLドキュメントを生成する関数
 */
function generateHtmlDocument(content, pageTitle = 'クエリ結果') {
  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle}</title>
</head>
<body>
  ${content}
</body>
</html>`;
}

/**
 * HTMLファイルを保存する関数
 */
function saveHtmlFile(html, filename = 'query_result.html') {
  const outputPath = path.join(__dirname, filename);
  fs.writeFileSync(outputPath, html, 'utf8');
  console.log(`\nHTMLファイルを生成しました: ${outputPath}`);
  return outputPath;
}

module.exports = {
  generateHtmlDocument,
  saveHtmlFile
};

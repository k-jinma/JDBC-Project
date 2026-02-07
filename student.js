const { runStudentCode, executeStudentQuery } = require('./studentRunner');

// ============================================================
// 学生編集エリア: ここから
// ============================================================

/**
 * 【演習1】SQLクエリを書く
 * 
 * 課題: 以下のSQLを変更して、異なるデータを取得してみましょう
 */
const mySQL = `SELECT * FROM EMP`;


/**
 * 【演習2】クエリ結果をHTMLに変換する
 * 
 * 課題: この関数を編集して、結果を自分なりのHTMLで表示してみましょう
 * 
 * @param {Array} rows - クエリ結果の配列
 * @returns {String} HTML文字列
 */
function createHtmlFromData(rows) {
  // ここにHTMLマークアップを書いてください
  
  let html = '<div>';
  
  // テーブルを作成
  if (rows && rows.length > 0) {
    html += '<table border="1">';
    
    const columns = Object.keys(rows[0]);
    
    // テーブルボディ
    html += '<tbody>';
    rows.forEach(row => {
      html += '<tr>';
      columns.forEach(col => {
        html += `<td>${row[col]}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody>';
    
    html += '</table>';
  } else {
    html += '<p>データがありません</p>';
  }
  
  html += '</div>';
  
  return html;
}

// ============================================================
// 学生編集エリア: ここまで
// ============================================================


// プログラムを実行（この部分は編集不要）
runStudentCode(
  async (connection) => await executeStudentQuery(connection, mySQL),
  createHtmlFromData
);

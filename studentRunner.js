const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');
const { generateHtmlDocument, saveHtmlFile } = require('./htmlGenerator');

/**
 * データベースに接続してクエリを実行し、HTMLを生成するメイン処理
 * @param {Function} queryFunction - SQLクエリを実行する関数
 * @param {Function} htmlFunction - HTMLを生成する関数
 */
async function runStudentCode(queryFunction, htmlFunction) {
  let connection;
  
  try {
    console.log('データベースに接続中...');
    connection = await oracledb.getConnection(dbConfig);
    console.log('接続成功！');
    
    // 学生が作成したクエリを実行
    console.log('クエリを実行中...');
    const data = await queryFunction(connection);
    console.log(`${data.length}件のデータを取得しました`);
    
    // 学生が作成したHTML生成関数を実行
    console.log('HTMLを生成中...');
    const htmlContent = htmlFunction(data);
    
    // HTMLドキュメントを生成
    const fullHtml = generateHtmlDocument(htmlContent, 'SQL演習結果');
    
    // ファイルに保存
    const outputPath = saveHtmlFile(fullHtml);
    
    console.log('\nブラウザで確認するには:');
    console.log(`   start query_result.html`);
    
  } catch (err) {
    console.error('エラーが発生しました:', err.message);
    if (err.errorNum) {
      console.error(`   Oracle エラーコード: ${err.errorNum}`);
    }
  } finally {
    if (connection) {
      await connection.close();
      console.log('データベース接続をクローズしました');
    }
  }
}

/**
 * クエリ実行のヘルパー関数
 * 学生のSQL文を実行してデータを返す
 */
async function executeStudentQuery(connection, sql) {
  const result = await connection.execute(sql, [], {
    outFormat: oracledb.OUT_FORMAT_OBJECT
  });
  return result.rows;
}

module.exports = {
  runStudentCode,
  executeStudentQuery
};

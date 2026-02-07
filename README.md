# Oracle Cloud Database 接続プログラム

Node.jsを使用してOracle CloudのAutonomous Databaseに接続し、SQLクエリを実行してHTML形式で結果を出力するプログラムです。

このプロジェクトは、Oracle Cloud側でmTLS認証を無効化している前提で、Wallet不要で接続します。

---

## セットアップ手順

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 接続情報の設定

`dbConfig.js`ファイルを開き、以下の情報を更新してください：

```javascript
module.exports = {
  user: 'your_username',      // データベースユーザー名
  password: 'your_password',  // パスワード
  connectString: '...'        // TNS接続文字列
};
```

### 3. プログラムの実行

```bash
npm run student
```

---

## 学生向け演習ガイド

### 演習の目的
1. SQLクエリを書いてデータベースからデータを取得する
2. 取得したデータをHTMLで表示する

### 編集するファイル

`student.js` ファイルを開き、以下の編集エリアだけを変更してください：

```javascript
// ============================================================
// 学生編集エリア: ここから
// ============================================================

// 【演習1】SQLクエリを書く
const mySQL = `SELECT * FROM dual`;  // ← ここを変更

// 【演習2】HTMLマークアップを施す
function createHtmlFromData(rows) {
  let html = '<div>';
  
  // ここにHTMLを追加
  
  html += '</div>';
  return html;
}

// ============================================================
// 学生編集エリア: ここまで
// ============================================================
```

### 演習例

#### 例1: テーブル一覧を取得
```javascript
const mySQL = `SELECT table_name FROM user_tables ORDER BY table_name`;
```

#### 例2: HTMLでリスト表示
```javascript
function createHtmlFromData(rows) {
  let html = '<div><ul>';
  
  rows.forEach(row => {
    html += `<li>${row.TABLE_NAME}</li>`;
  });
  
  html += '</ul></div>';
  return html;
}
```

### 注意事項

1. **編集エリア以外は触らない** - システムが動作しなくなります
2. **SQL文末にセミコロンは不要** - `SELECT * FROM dual` (セミコロンなし)
3. **HTMLタグは必ず閉じる** - `<div></div>`, `<p></p>`

### よく使うSQL
```sql
-- すべてのテーブル一覧
SELECT table_name FROM user_tables

-- 現在時刻
SELECT SYSDATE FROM dual

-- テスト用
SELECT 'Hello World' AS message FROM dual
```

---

## プロジェクト構成

### 学生が編集するファイル
- `student.js` - メインファイル（約70行、SQLとHTML生成のみ）

### システムファイル（編集不要）
- `studentRunner.js` - 実行エンジン
- `dbConfig.js` - DB接続設定
- `htmlGenerator.js` - HTML生成ユーティリティ

---

## 教員向け情報

### 演習課題例

**初級**
```javascript
const mySQL = `SELECT SYSDATE FROM dual`;
```

**中級**
```javascript
const mySQL = `SELECT table_name FROM user_tables ORDER BY table_name`;
// HTML: リスト形式（<ul><li>）で表示
```

**上級**
```javascript
const mySQL = `
  SELECT table_name, tablespace_name, status
  FROM user_tables 
  WHERE rownum <= 10
`;
// HTML: インラインスタイルで装飾
```

### 採点基準

**SQLクエリ（50点）**
- 構文エラーがない
- 適切なテーブル/カラムを選択
- WHERE句、ORDER BY句を適切に使用

**HTML出力（50点）**
- HTMLタグが正しく閉じられている
- データが正しく表示される
- 見やすいレイアウト

### 接続情報の変更

`dbConfig.js`を編集：
```javascript
module.exports = {
  user: 'your_user',
  password: 'your_password',
  connectString: '(description=...)'
};
```

---

## トラブルシューティング

### エラー: `table or view does not exist`
- テーブル名が間違っているか存在しません
- Oracleは大文字で管理: `USER_TABLES` (小文字 `user_tables` は不可)

### エラー: `invalid SQL statement`
- SQL文に構文エラーがあります
- セミコロンが含まれている場合は削除してください

### 接続エラー
- ユーザー名とパスワードが正しいか確認
- Oracle Cloud側でmTLS認証が無効になっているか確認

### HTMLが表示されない
- HTMLタグが正しく閉じられているか確認
- ブラウザのコンソールでエラーを確認

---

## 参考情報

### 使用技術
- Node.js
- oracledb (Oracle Database ドライバ)
- Oracle Cloud Autonomous Database

### 接続方式
- TLS暗号化通信（TCPS）
- ユーザー名/パスワード認証
- Wallet不要（mTLS無効化済み）

### 参考資料
- [node-oracledb Documentation](https://node-oracledb.readthedocs.io/)
- [Oracle Cloud Documentation](https://docs.oracle.com/en/cloud/paas/autonomous-database/)


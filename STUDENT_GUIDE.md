# SQL演習プログラム - 学生用ガイド

このプログラムを使って、SQLクエリの実行とHTML出力の演習を行います。

## 演習の目的

1. **SQLクエリ**を書いてデータベースからデータを取得する
2. 取得したデータを**HTMLで表示**する

## 使い方

### 1. プログラムを編集する

**`student.js`** ファイルを開いてください。

このファイルには、**学生が編集する部分だけ**が含まれています。

#### 編集する場所（2箇所だけ！）

```javascript
// ============================================================
// 学生編集エリア: ここから
// ============================================================
```

この間だけを編集します。それ以外は**触らないでください**。

### 2. 演習内容

#### 【演習1】SQLクエリを書く

`mySQL` 変数にSQLクエリを書いてください：

```javascript
const mySQL = `SELECT * FROM dual`;  // ← ここを変更
```

**例：**

```javascript
const mySQL = `SELECT table_name FROM user_tables`;
```

#### 【演習2】HTMLマークアップを施す

`createHtmlFromData`関数内のHTMLを編集してください：

```javascript
function createHtmlFromData(rows) {
  let html = '<div>';
  
  // ここにHTMLを追加
  // 例: テーブル、リスト、カードなど
  
  html += '</div>';
  return html;
}
```

**ヒント：使えるHTMLタグ**

- `<table>` - 表
- `<ul>` `<li>` - リスト
- `<h2>` `<h3>` - 見出し
- `<p>` - 段落
- `<div>` - コンテナ

### 3. プログラムを実行する

```bash
npm run student
```

### 4. 結果を確認する

`query_result.html` ファイルが生成されます。

ブラウザで開くには：

```bash
start query_result.html
```

または、エクスプローラーでダブルクリック。

## 演習例

### 例1: テーブル一覧を取得

```javascript
const mySQL = `SELECT table_name FROM user_tables ORDER BY table_name`;
```

### 例2: リスト形式で表示

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

## 注意事項

1. **編集エリア以外は触らない**

   - `// 学生編集エリア` の外は変更しないでください
2. **SQL文の末尾にセミコロンは不要**

   ```javascript
   // 間違い
   const mySQL = `SELECT * FROM dual;`;

   // 正しい
   const mySQL = `SELECT * FROM dual`;
   ```
3. **エラーが出たら**

   - コンソールのエラーメッセージを読む
   - 構文エラーがないか確認
   - セミコロン、カンマ、括弧の数を確認

## 困ったときは

### エラー: `table or view does not exist`

→ テーブル名が間違っているか、存在しません

### エラー: `invalid SQL statement`

→ SQL文に構文エラーがあります

### HTMLが表示されない

→ HTMLタグが正しく閉じられているか確認してください

## 参考資料

### よく使うSQL

```sql
-- すべてのテーブル一覧
SELECT table_name FROM user_tables

-- デュアルテーブル（テスト用）
SELECT 'Hello World' AS message FROM dual

-- 現在時刻
SELECT SYSDATE FROM dual
```

### HTMLテーブルの基本構造

```html
<table border="1">
  <tbody>
    <tr><td>データ1</td><td>データ2</td></tr>
    <tr><td>データ3</td><td>データ4</td></tr>
  </tbody>
</table>
```

---

**質問があれば先生に聞いてください！**

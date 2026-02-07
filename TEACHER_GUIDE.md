# 教員用ガイド - プロジェクト構成説明

## ファイル構成

### 学生が編集するファイル

- **`student.js`** - 学生用メインファイル（極限までシンプル化）
  - SQLクエリ（1つの定数）
  - HTML生成関数（1つの関数）
  - **合計約70行** - システムコード完全除外

### システムファイル（学生には触らせない）

- **`studentRunner.js`** - 実行エンジン（DB接続、エラーハンドリング）
- **`dbConfig.js`** - データベース接続設定
- **`htmlGenerator.js`** - HTML生成・保存のユーティリティ

### ドキュメント

- **`STUDENT_GUIDE.md`** - 学生向けの詳細ガイド
- **`README.md`** - 一般的なREADME
- **`TEACHER_GUIDE.md`** - このファイル

## 設計思想

### 1. 極限までシンプル化

学生は2つのことだけに集中：

1. **SQLクエリを書く** → 1つの文字列変数 `mySQL`
2. **HTMLマークアップを施す** → 1つの関数 `createHtmlFromData`

**学生が見るコード = 約70行のみ**

### 2. 完全な複雑さの隠蔽

以下はすべて別ファイルに分離：

- データベース接続処理 → `studentRunner.js`
- 非同期処理（async/await） → `studentRunner.js`
- エラーハンドリング → `studentRunner.js`
- ファイルI/O → `htmlGenerator.js`
- HTML文書構造 → `htmlGenerator.js`
- 接続設定 → `dbConfig.js`

### 3. 1行のインポート、1行のエクスポート

```javascript
const { runStudentCode, executeStudentQuery } = require('./studentRunner');

// 学生編集エリア

runStudentCode(...);  // これだけで実行
```

## カスタマイズ方法

### 接続情報の変更

`dbConfig.js`を編集：

```javascript
module.exports = {
  user: 'your_user',
  password: 'your_password',
  connectString: '...'
};
```

### 学生の編集エリアに初期コードを追加

`student.js`の学生編集エリア内にサンプルコードを追加。

## 演習課題例

### 初級

```javascript
// 課題: DUALテーブルから現在時刻を取得
const mySQL = `SELECT SYSDATE FROM dual`;
```

### 中級

```javascript
// 課題: テーブル一覧を取得してリスト表示
const mySQL = `SELECT table_name FROM user_tables ORDER BY table_name`;

// HTML: <ul><li>形式で表示
function createHtmlFromData(rows) {
  let html = '<div><ul>';
  rows.forEach(row => {
    html += `<li>${row.TABLE_NAME}</li>`;
  });
  html += '</ul></div>';
  return html;
}
```

### 上級

```javascript
// 課題: 複数のカラムを持つテーブルから取得
const mySQL = `
  SELECT table_name, tablespace_name, status
  FROM user_tables 
  WHERE rownum <= 10
`;

// HTML: カード形式で表示
function createHtmlFromData(rows) {
  let html = '<div>';
  rows.forEach(row => {
    html += `
      <div style="border: 1px solid #ccc; padding: 10px; margin: 10px;">
        <p><strong>${row.TABLE_NAME}</strong></p>
        <p>Tablespace: ${row.TABLESPACE_NAME}</p>
        <p>Status: ${row.STATUS}</p>
      </div>
    `;
  });
  html += '</div>';
  return html;
}
```

## 採点のポイント

### SQLクエリ（50点）

- [ ] 構文エラーがない
- [ ] 適切なテーブル/カラムを選択
- [ ] 必要に応じてWHERE句、ORDER BY句を使用
- [ ] コメントで意図を説明

### HTML出力（50点）

- [ ] HTMLタグが正しく閉じられている
- [ ] データが正しく表示される
- [ ] 表やリストを適切に使用
- [ ] 見やすいレイアウト

## よくある学生のエラーと対処法

### 1. SQL文末にセミコロン

```javascript
// ❌ エラー
const sql = `SELECT * FROM dual;`;

// ✅ 正しい
const sql = `SELECT * FROM dual`;
```

→ Node.jsではSQL文末のセミコロンは不要

### 2. HTMLタグの閉じ忘れ

```javascript
// ❌ エラー
html += '<div>';
html += '<p>テキスト';  // </p>がない
// </div>がない

// ✅ 正しい
html += '<div>';
html += '<p>テキスト</p>';
html += '</div>';
```

### 3. テーブル名の大文字小文字

Oracleは通常、テーブル名を大文字で管理：

```javascript
// ❌ エラー（テーブルが見つからない）
const sql = `SELECT * FROM my_table`;

// ✅ 正しい
const sql = `SELECT * FROM MY_TABLE`;
```

### 4. 変数名の間違い

```javascript
// カラム名は結果のオブジェクトキーと一致させる
rows.forEach(row => {
  // row.TABLE_NAME ← 大文字（Oracleが返す形式）
  html += `<li>${row.TABLE_NAME}</li>`;
});
```

## 追加リソース

### データベースに予めテーブルを作成

```sql
-- 学生用サンプルテーブル
CREATE TABLE students (
  id NUMBER PRIMARY KEY,
  name VARCHAR2(50),
  age NUMBER,
  grade VARCHAR2(10)
);

INSERT INTO students VALUES (1, '太郎', 20, 'A');
INSERT INTO students VALUES (2, '花子', 21, 'B');
COMMIT;
```

### 演習課題のバリエーション

1. **単純なSELECT** - 全レコード取得
2. **条件付きSELECT** - WHERE句の使用
3. **集計関数** - COUNT, AVG, SUM
4. **結合** - 複数テーブルのJOIN
5. **サブクエリ** - ネストしたクエリ

## 授業の進め方

### 第1回: 基礎

- `student.js`の構造説明
- 簡単なSQLを実行
- HTMLテーブルの基本

### 第2回: 応用

- WHERE句、ORDER BY句
- HTMLリストやカード表示
- 条件分岐（if文）の追加

### 第3回: 発展

- 複雑なクエリ
- インタラクティブなHTML
- オリジナルのスタイリング

## ヒント

学生がNode.jsの非同期処理を理解していない場合：

- `async/await`は「魔法のキーワード」として説明
- 「データベースからデータを取ってくる時間がかかるから必要」と簡単に説明
- 詳細な説明は避けて、SQLとHTMLに集中させる

---

**質問や改善提案があれば、このファイルを更新してください。**

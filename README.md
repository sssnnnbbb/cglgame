# cglgame

http://sssnnnbbb.github.io/cglgame/?molewhack

http://sssnnnbbb.github.io/cglgame/?dot_catch


https://sssnnnbbb.github.io/cglgame/?reflectraser


# crisp-game-lib

## 概要

このリポジトリには、ブラウザ上でクラシックなアーケード風ミニゲームを作成するための**軽量な JavaScript/TypeScript ライブラリ「crisp-game-lib」**が格納されています。  
ライブラリ本体に加え、サンプルゲームやビルドツール類も含まれています。

---

## 主なディレクトリとファイル

### `src/`
ライブラリのTypeScriptソースコードを格納しています。

- **`main.ts`**  
  各モジュール（ゲームループ、描画、入力、ユーティリティなど）をインポートし、外部利用者向けに再エクスポートするエントリーポイントです。

- **`loop.ts`**  
  メインのゲームループを定義します。テーマやランタイムオプション（画面サイズ、背景色、キャプチャ設定など）のデフォルト値を含みます。

---

### `docs/`
生成された成果物およびサンプルゲームが格納されています。

- **ライブラリバンドルファイル**  
  - `bundle.js`（コンパイル済みJavaScript）  
  - `bundle.d.ts`（型定義ファイル）

- **サンプルゲームディレクトリ**  
  例：`dot_catch/`  
  - `main.js`：ゲームロジック（タイトル、説明文、アセット、オプションなど）を定義

---

## ビルドと構成ファイル

- **`package.json`**  
  サンプルゲームの監視・ライブラリの再ビルド・ドキュメント生成など、開発用スクリプトを定義しています。

- **`rollup.config.js`**  
  `src/main.ts` をエントリーポイントとして、`docs/bundle.js` にバンドルするためのRollup構成ファイルです。TypeScriptやCommonJSプラグインを使用。

- **`tsconfig.json`**  
  TypeScriptのコンパイルターゲット設定。`src/` 以下のすべての `.ts` ファイルが対象です。

---

## 開発環境のセットアップ

本プロジェクトは以下の構成で開発・ビルドされています：

- **バンドルツール**: [Rollup](https://rollupjs.org/)
- **静的型付け**: TypeScript
- **利用プラグイン**: `@rollup/plugin-commonjs`, `@rollup/plugin-replace` など

### 開発依存パッケージ（抜粋）

- `typescript`
- `rollup`
- `typedoc`

これらは `package.json` に記述されており、ライブラリ開発やドキュメント生成を支援します。

---

## 備考

この概要はコードベースを静的に確認したものであり、テストの実行やプログラムによる検証は行っていません。

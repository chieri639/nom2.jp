# デプロイガイド (Deployment Guide)

このアプリをインターネット上で公開するための手順です。無料で使える「Render.com」と、Googleの「Cloud Run」の2つの方法を解説します。

## 📁 準備完了
すでにデプロイに必要な設定ファイル（`Dockerfile`, `next.config.js`）は作成済みです！

---

## 🚀 方法1: Render.com でデプロイ (おすすめ・簡単)

GitHubのリポジトリと連携して、簡単にデプロイできます。

1. **GitHubにコードをプッシュする**
   もしまだ行っていなければ、コードをGitHubのリポジトリにプッシュしてください。

2. **Render.com に登録/ログイン**
   - [Render.com](https://render.com/) にアクセスし、GitHubアカウントでログインします。

3. **Web Service を作成**
   - ダッシュボードの「New +」ボタンから「Web Service」を選択。
   - あなたのGitHubリポジトリを選択します。

4. **設定を入力**
   以下の通りに入力してください（Renderが自動検出する場合もあります）。
   - **Name**: 好きなアプリ名 (例: `sake-ai-app`)
   - **Runtime**: `Docker` (これを選択するのが重要です！)
   - **Instance Type**: `Free`

5. **デプロイ開始**
   - 「Create Web Service」をクリック。
   - 数分待つと、`https://sake-ai-app.onrender.com` のようなURLが発行されます。

> **注意**: Freeプランでは、15分ほどアクセスがないとアプリがスリープします。次のアクセス時に少し（30秒〜1分）待ち時間が生じますが、個人利用やテストなら問題ありません。

---

## ☁️ 方法2: Google Cloud Run でデプロイ (本格的)

Google Cloudの知識が少し必要ですが、スケーリング性能が高く、無料枠も手厚いです。

1. **Google Cloud SDK (gcloud) のインストール**
   - [ここからインストール](https://cloud.google.com/sdk/docs/install)してください。

2. **プロジェクトの作成と課金有効化**
   - Google Cloud Consoleでプロジェクトを作成し、課金を有効にします（無料枠内でもカード登録が必要です）。

3. **コマンド実行**
   ターミナルで以下のコマンドを実行します。

   ```bash
   # 1. Google Cloudにログイン
   gcloud auth login

   # 2. プロジェクトIDを設定 (PROJECT_IDは自分のものに置き換え)
   gcloud config set project [YOUR_PROJECT_ID]

   # 3. クラウド上でビルドしてデプロイ
   #    - 「Region」を聞かれたら `asia-northeast1` (東京) がおすすめ
   #    - 「Allow unauthenticated invocations?」は `y` (はい) を選択
   gcloud run deploy sake-ai --source .
   ```

4. **完了**
   - 完了すると、URL（例: `https://sake-ai-xp3...a.run.app`）が表示されます。

---

## 💡 どっちがいい？

- **Googleの技術を使いたい / 将来的に大規模にしたい** 👉 **Cloud Run**

---

## 🌐 独自ドメイン (nom2.jp) の設定

アプリを公開後、URLを `nom2.test` や `onrender.com` から `nom2.jp` に変更する手順です。

### 1. Render.com の場合
1.  Dashboard > Settings > **Custom Domains** に移動。
2.  `nom2.jp` を入力して「Add Domain」をクリック。
3.  表示される **CNAME** や **Aレコード** の情報を、お持ちのドメイン管理画面（お名前.comやGoDaddyなど）のDNS設定に追加します。
4.  反映されるまで数分〜数時間待ちます。

### 2. Google Cloud Run の場合
1.  Cloud Run コンソール > **Integrations** (統合) > **Custom Domains** を選択。
2.  「Mapping」を追加し、`nom2.jp` を指定。
3.  Google Search Console でドメイン所有権の確認を求められる場合があります。
4.  表示されるDNSレコードをドメイン管理画面に追加します。

### 📂 URL構成について
現在のコードでは、日本酒おすすめページは以下のURLになります。
- **`https://nom2.jp/sake-reco`**

もしトップページ (`https://nom2.jp/`) で直接表示したい場合は、`src/app/sake-reco/page.tsx` の内容を `src/app/page.tsx` に移動させてください。

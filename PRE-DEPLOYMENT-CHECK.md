# 🚀 Gyouza Official Site デプロイ前チェックリスト

## ✅ 準備完了項目

### 📁 ファイル準備
- [x] `api-production.js` - 本番用統合サーバー
- [x] `build/index.production.html` - 本番用HTMLファイル
- [x] `.env.production` - 本番用環境変数
- [x] `vercel.json` - Vercel設定
- [x] `Dockerfile` - Docker設定
- [x] `nginx.conf` - nginx設定
- [x] `deploy.sh` - デプロイスクリプト

### 🔧 設定確認
- [x] APIエンドポイントを本番URL (`https://gyouza-official-site.com`) に変更
- [x] Sanityトークンの設定
- [x] CORS設定
- [x] 静的ファイル配信設定

### 🎯 機能確認
- [x] ブログ記事一覧表示
- [x] 個別記事表示
- [x] Aboutページ表示
- [x] 画像表示
- [x] リンク機能
- [x] いいね機能 (LocalStorage)
- [x] レスポンシブデザイン

## 🔄 次のステップ

### 1. ドメイン設定確認
```bash
# ドメインの現在のDNS設定を確認
nslookup gyouza-official-site.com
```

### 2. デプロイ方法選択

#### オプション A: Vercel (推奨)
```bash
# Vercel CLIでデプロイ
vercel --prod
```

#### オプション B: VPS/クラウドサーバー
```bash
# Dockerでデプロイ
./deploy.sh
```

### 3. DNS設定

**Vercelの場合:**
- A Record: `@` → `76.76.19.61`
- CNAME: `www` → `cname.vercel-dns.com`

**VPS/サーバーの場合:**
- A Record: `@` → `[サーバーIP]`
- A Record: `www` → `[サーバーIP]`

### 4. SSL証明書
- Vercel: 自動設定
- VPS: Let's Encrypt設定

## 🧪 テスト項目

デプロイ後に以下をテスト:

1. **基本アクセス**
   - [ ] https://gyouza-official-site.com
   - [ ] https://www.gyouza-official-site.com

2. **API動作確認**
   - [ ] /api/blog-posts
   - [ ] /api/about
   - [ ] /api/blog/[slug]

3. **ページ表示確認**
   - [ ] ホームページ
   - [ ] ブログ一覧
   - [ ] 個別記事
   - [ ] Aboutページ

4. **機能確認**
   - [ ] ナビゲーション
   - [ ] いいねボタン
   - [ ] 外部リンク（noteなど）
   - [ ] 画像表示

## 📊 パフォーマンス確認

```bash
# サイトスピードテスト
curl -o /dev/null -s -w "%{time_total}\\n" https://gyouza-official-site.com

# APIレスポンスタイム
curl -o /dev/null -s -w "%{time_total}\\n" https://gyouza-official-site.com/api/blog-posts
```

## 🔍 監視設定

### ヘルスチェック
```bash
curl -f https://gyouza-official-site.com/api/blog-posts
```

### ログ監視
- アクセスログの確認
- エラーログの確認
- APIレスポンス状況

## 🆘 緊急時対応

### ロールバック手順
1. 前バージョンのコンテナに切り替え
2. DNSキャッシュクリア
3. CDNキャッシュクリア

### 連絡先
- ドメイン管理者: [設定が必要]
- サーバー管理者: [設定が必要]
- 開発者: Claude (このセッション)

---

## 🎉 デプロイ準備完了！

すべての項目が確認できたら、選択したデプロイ方法でリリースしてください。

**最終確認**: すべてのチェックボックスが✅になっていることを確認してからデプロイを実行してください。
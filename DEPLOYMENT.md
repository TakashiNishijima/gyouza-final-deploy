# Gyouza Official Site デプロイガイド

## 📋 概要
`gyouza-official-site.com` でのデプロイ手順を説明します。

## 🚀 デプロイ方法

### オプション1: Vercel (推奨)

1. **Vercel CLIのインストール**
```bash
npm i -g vercel
```

2. **Vercelにログイン**
```bash
vercel login
```

3. **環境変数の設定**
Vercelダッシュボードで以下を設定:
```
NODE_ENV=production
SANITY_TOKEN=sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe
SANITY_PROJECT_ID=zxcqyvgo
SANITY_DATASET=production
```

4. **デプロイ実行**
```bash
vercel --prod
```

5. **カスタムドメイン設定**
- Vercelダッシュボードでドメイン `gyouza-official-site.com` を追加
- DNS設定でVercelのIPを指定

### オプション2: VPS/専用サーバー (Docker)

1. **サーバーにDockerをインストール**
```bash
# Ubuntu/Debian の場合
sudo apt update
sudo apt install docker.io docker-compose
sudo systemctl start docker
sudo systemctl enable docker
```

2. **プロジェクトをサーバーにクローン**
```bash
git clone <repository-url>
cd gyouza-blog
```

3. **環境変数ファイルを作成**
```bash
cp .env.production .env
```

4. **Dockerイメージをビルド**
```bash
docker build -t gyouza-official-site .
```

5. **コンテナを起動**
```bash
docker run -d \
  --name gyouza-site \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  gyouza-official-site
```

6. **nginx設定** (オプション)
```bash
sudo cp nginx.conf /etc/nginx/sites-available/gyouza-official-site.com
sudo ln -s /etc/nginx/sites-available/gyouza-official-site.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

7. **SSL証明書の設定**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d gyouza-official-site.com -d www.gyouza-official-site.com
```

## 🌐 DNS設定

以下のDNSレコードを設定:

### Vercelの場合
```
A    @    76.76.19.61
CNAME www  cname.vercel-dns.com
```

### VPS/専用サーバーの場合
```
A    @    [サーバーのIPアドレス]
A    www  [サーバーのIPアドレス]
```

## 🔧 環境変数

必要な環境変数:
- `NODE_ENV`: production
- `PORT`: 3000 (デフォルト)
- `SANITY_TOKEN`: Sanityの管理トークン
- `SANITY_PROJECT_ID`: zxcqyvgo
- `SANITY_DATASET`: production

## 📊 モニタリング

### ヘルスチェック
```bash
curl https://gyouza-official-site.com/api/blog-posts
```

### ログ確認 (Docker)
```bash
docker logs gyouza-site
```

## 🔄 更新手順

1. **コードの更新**
```bash
git pull origin main
```

2. **新しいイメージをビルド**
```bash
docker build -t gyouza-official-site:latest .
```

3. **コンテナの再起動**
```bash
docker stop gyouza-site
docker rm gyouza-site
docker run -d \
  --name gyouza-site \
  --restart unless-stopped \
  -p 3000:3000 \
  --env-file .env \
  gyouza-official-site:latest
```

## 🆘 トラブルシューティング

### よくある問題

1. **APIが応答しない**
   - Sanityトークンを確認
   - ネットワーク接続を確認

2. **画像が表示されない**
   - SanityCDNのアクセス権限を確認
   - CORS設定を確認

3. **SSL証明書エラー**
   - Let's Encryptの更新: `sudo certbot renew`

### ログ確認
```bash
# Docker ログ
docker logs gyouza-site

# nginx ログ
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 📞 サポート

問題が発生した場合は、以下を確認してください:
- サーバーのリソース使用状況
- DNS伝播状況
- SSL証明書の有効期限
- Sanity CMSの接続状況

---

🎉 **デプロイ完了後は https://gyouza-official-site.com でサイトにアクセスできます！**
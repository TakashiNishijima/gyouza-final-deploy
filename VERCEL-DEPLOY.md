# 🚀 Vercel デプロイ手順

## 即座にデプロイする方法

### 1. 新しいプロジェクト作成
- https://vercel.com/new にアクセス
- `TakashiNishijima/gyouza-official-site` を選択
- プロジェクト名: `gyouza-working-site-$(date)` (任意の名前)

### 2. 設定
- **Framework Preset**: `Other`
- **Build Settings**: すべて空欄のまま
- **Root Directory**: 空欄のまま

### 3. 環境変数 (必須)
```
NODE_ENV=production
SANITY_TOKEN=sk6DodwTdG79eeJc8mvbzNNxBb9zo3HwX4QrYzyt0DLI5aGffth3zUh2aRu6sM5jLNMlNA0PA9lGD8YLe
SANITY_PROJECT_ID=zxcqyvgo
SANITY_DATASET=production
```

### 4. デプロイ実行
- 「Deploy」ボタンをクリック
- 約2-3分で完了

## ドメイン設定 (gyouza-official-site.com)
1. デプロイ成功後、「Domains」タブ
2. 「Add Domain」で `gyouza-official-site.com` を追加
3. DNS設定をドメイン管理画面で更新

## 確認事項
- ✅ vercel.json設定済み
- ✅ 依存関係の競合解決済み 
- ✅ API本番サーバー準備完了
- ✅ 環境変数設定確認済み

## サポートURL
- プロジェクトURL: https://github.com/TakashiNishijima/gyouza-official-site
- Vercel Dashboard: https://vercel.com/dashboard
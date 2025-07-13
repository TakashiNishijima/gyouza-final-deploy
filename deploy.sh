#!/bin/bash

echo "🚀 Gyouza Official Site デプロイ開始"

# 本番用APIエンドポイントの設定
echo "📝 本番用HTMLファイルを生成中..."
cp build/index.html build/index.production.html

# localhost:3001 を本番URLに置換
sed -i 's/http:\/\/localhost:3001/https:\/\/gyouza-official-site.com/g' build/index.production.html

echo "✅ 本番用HTMLファイル生成完了"

# Docker イメージのビルド
echo "🐳 Dockerイメージをビルド中..."
docker build -t gyouza-official-site .

if [ $? -eq 0 ]; then
    echo "✅ Dockerイメージビルド完了"
else
    echo "❌ Dockerイメージビルドに失敗しました"
    exit 1
fi

# Dockerコンテナの起動テスト
echo "🧪 ローカルでのテスト実行中..."
docker run -d --name gyouza-test -p 3000:3000 gyouza-official-site

sleep 5

# ヘルスチェック
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ ローカルテストが成功しました"
    docker stop gyouza-test
    docker rm gyouza-test
else
    echo "❌ ローカルテストに失敗しました"
    docker stop gyouza-test
    docker rm gyouza-test
    exit 1
fi

echo "🎉 デプロイ準備完了！"
echo ""
echo "次のステップ:"
echo "1. VPS/クラウドサーバーにDockerをセットアップ"
echo "2. ドメイン gyouza-official-site.com のDNS設定"
echo "3. SSL証明書の設定 (Let's Encrypt推奨)"
echo "4. docker run -d --name gyouza-site -p 80:3000 gyouza-official-site"
echo ""
echo "または Vercel へのデプロイ:"
echo "vercel --prod"
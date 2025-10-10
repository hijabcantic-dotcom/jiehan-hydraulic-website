#!/bin/bash

echo "🚀 开始部署捷瀚液压网站..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 检查Git状态
echo "📋 检查Git状态..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  检测到未提交的更改，正在提交..."
    git add .
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# 检查是否有远程仓库
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 错误：未找到GitHub远程仓库"
    echo "请先按照DEPLOYMENT_GUIDE.md中的步骤创建GitHub仓库"
    echo "然后运行以下命令："
    echo "git remote add origin https://github.com/YOUR_USERNAME/jiehan-hydraulic-website.git"
    exit 1
fi

# 推送到GitHub
echo "📤 推送代码到GitHub..."
git push origin main

echo "✅ 代码已推送到GitHub！"
echo ""
echo "🎯 下一步："
echo "1. 访问 https://vercel.com"
echo "2. 使用GitHub账号登录"
echo "3. 点击 'New Project'"
echo "4. 选择您的仓库进行部署"
echo ""
echo "📖 详细步骤请参考：DEPLOYMENT_GUIDE.md"

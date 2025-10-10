# 🚀 网站部署指南

## 📋 部署前准备

### 1. 创建GitHub仓库

1. 访问 [GitHub.com](https://github.com)
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库信息：
   - Repository name: `jiehan-hydraulic-website`
   - Description: `Jiehan Hydraulic Company Website`
   - 选择 "Public"（公开）
   - 不要勾选 "Add a README file"
4. 点击 "Create repository"

### 2. 上传代码到GitHub

在终端中执行以下命令（替换 `YOUR_USERNAME` 为您的GitHub用户名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/jiehan-hydraulic-website.git

# 推送代码到GitHub
git branch -M main
git push -u origin main
```

## 🌐 使用Vercel部署

### 1. 注册Vercel账号

1. 访问 [Vercel.com](https://vercel.com)
2. 点击 "Sign Up"
3. 选择 "Continue with GitHub"（使用GitHub账号登录）
4. 授权Vercel访问您的GitHub仓库

### 2. 部署网站

1. 登录Vercel后，点击 "New Project"
2. 选择您刚创建的GitHub仓库 `jiehan-hydraulic-website`
3. 配置项目：
   - Framework Preset: `Vite`
   - Root Directory: `./`（默认）
   - Build Command: `npm run build`（默认）
   - Output Directory: `dist`（默认）
4. 点击 "Deploy"

### 3. 配置环境变量

在Vercel项目设置中添加环境变量：

1. 进入项目设置 → Environment Variables
2. 添加以下变量：
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🔧 后台管理系统部署

### 方案1：使用Vercel部署（推荐）

后台管理系统可以部署在同一个Vercel项目中：

1. 后台路由：`/admin`
2. 访问地址：`https://your-domain.vercel.app/admin`
3. 无需额外配置

### 方案2：使用Supabase（数据库）

如果需要真实的数据存储：

1. 访问 [Supabase.com](https://supabase.com)
2. 创建新项目
3. 获取项目URL和API密钥
4. 在Vercel中配置环境变量

## 📱 自定义域名（可选）

### 1. 购买域名

推荐域名注册商：
- 阿里云
- 腾讯云
- GoDaddy

### 2. 配置域名

1. 在Vercel项目设置中添加自定义域名
2. 按照提示配置DNS记录
3. 等待DNS生效（通常需要几分钟到几小时）

## 🎯 部署后检查清单

- [ ] 网站可以正常访问
- [ ] 中英文切换功能正常
- [ ] 表单提交功能正常
- [ ] 后台管理系统可以访问
- [ ] 产品数据正常显示
- [ ] 新闻数据正常显示
- [ ] SEO优化生效
- [ ] 移动端适配正常

## 🆘 常见问题

### 1. 部署失败
- 检查代码是否有语法错误
- 确保所有依赖都已安装
- 查看Vercel部署日志

### 2. 网站无法访问
- 检查域名配置
- 确认DNS设置正确
- 等待DNS生效

### 3. 后台无法访问
- 检查路由配置
- 确认环境变量设置正确

## 📞 技术支持

如果在部署过程中遇到问题，可以：
1. 查看Vercel官方文档
2. 检查GitHub Issues
3. 联系技术支持

---

**部署完成后，您的网站将拥有：**
- ✅ 全球CDN加速
- ✅ 自动HTTPS证书
- ✅ 自动部署更新
- ✅ 专业的后台管理系统
- ✅ 完整的多语言支持
- ✅ SEO优化

# 捷瀚液压企业官网

## 🌟 项目简介

这是一个现代化的企业官网，专为捷瀚液压公司打造，具有以下特色：

- ✅ **多语言支持**：完整的中英文切换
- ✅ **响应式设计**：完美适配桌面端和移动端
- ✅ **SEO优化**：完整的搜索引擎优化
- ✅ **后台管理**：功能完善的内容管理系统
- ✅ **现代化技术栈**：React + TypeScript + Vite

## 🚀 快速部署

### 方法一：使用Vercel（推荐）

1. **创建GitHub仓库**
   ```bash
   # 在GitHub上创建新仓库，然后：
   git remote add origin https://github.com/YOUR_USERNAME/jiehan-hydraulic-website.git
   git push -u origin main
   ```

2. **部署到Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub账号登录
   - 点击 "New Project"
   - 选择您的仓库
   - 点击 "Deploy"

3. **配置环境变量**（可选）
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 方法二：使用部署脚本

```bash
# 运行部署脚本
./deploy.sh
```

## 📱 功能特性

### 前端功能
- 🏠 **首页**：企业介绍、核心产品、最新动态
- 🏢 **关于企业**：公司概况、发展历程、企业价值观
- 📦 **产品展示**：产品分类、详情展示、搜索筛选
- 💡 **解决方案**：行业解决方案、技术优势
- 📰 **新闻中心**：公司动态、行业资讯
- 📞 **联系我们**：联系表单、公司信息

### 后台管理
- 📊 **数据概览**：统计图表、关键指标
- 📦 **产品管理**：添加、编辑、删除产品
- 📰 **新闻管理**：发布、管理新闻内容
- 🖼️ **图片管理**：上传、管理图片资源

### 技术特性
- 🌐 **多语言**：中英文无缝切换
- 📱 **响应式**：完美适配各种设备
- 🔍 **SEO优化**：搜索引擎友好
- ⚡ **性能优化**：快速加载、流畅体验
- 🛡️ **安全可靠**：现代化安全实践

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── common/         # 通用组件
│   ├── forms/          # 表单组件
│   └── seo/            # SEO组件
├── contexts/           # React上下文
├── pages/              # 页面组件
├── db/                 # 数据库相关
├── config/             # 配置文件
└── types/              # TypeScript类型
```

## 🌐 访问地址

- **中文版**：`https://your-domain.com`
- **英文版**：`https://your-domain.com/en`
- **后台管理**：`https://your-domain.com/admin`

## 📞 技术支持

如果您在部署或使用过程中遇到问题，请：

1. 查看 `DEPLOYMENT_GUIDE.md` 详细部署指南
2. 检查控制台错误信息
3. 确认环境变量配置正确

## 📄 许可证

本项目仅供捷瀚液压公司使用。

---

**部署完成后，您将拥有一个专业、现代、功能完善的企业官网！** 🎉
# Supabase 标准服务配置指南

## 🎯 **目标：使用标准Supabase服务，解决CORS问题**

### 为什么选择标准Supabase？
- ✅ **免费额度**：每月50,000次API调用
- ✅ **无CORS问题**：官方服务已配置好CORS
- ✅ **SEO友好**：数据对搜索引擎完全可访问
- ✅ **简单配置**：几分钟就能完成

## 🚀 **步骤一：申请Supabase账号**

### 1. **访问Supabase官网**
- 网址：https://supabase.com
- 点击 "Start your project"

### 2. **注册账号**
- 使用GitHub账号登录（推荐）
- 或者使用邮箱注册

### 3. **创建新项目**
- 点击 "New Project"
- 选择组织（Organization）
- 填写项目信息：
  - **Name**: jiehan-hydraulic
  - **Database Password**: 设置一个强密码（记住这个密码）
  - **Region**: 选择 Asia Pacific (Singapore) 或 Asia Pacific (Tokyo)

## 🔧 **步骤二：获取项目配置**

### 1. **获取项目URL和API Key**
创建项目后，在项目仪表板中：
- 点击左侧菜单 "Settings"
- 点击 "API"
- 复制以下信息：
  - **Project URL**: `https://your-project-id.supabase.co`
  - **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2. **更新环境变量**
将获取的信息更新到 `.env` 文件：

```env
VITE_APP_ID=app-6jblbn9sip6p
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🗄️ **步骤三：创建数据库表**

### 1. **打开SQL编辑器**
- 在Supabase仪表板中
- 点击左侧菜单 "SQL Editor"
- 点击 "New query"

### 2. **执行建表SQL**
复制以下SQL代码并执行：

```sql
-- 创建客户咨询表
CREATE TABLE IF NOT EXISTS customer_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company text,
  phone text NOT NULL,
  email text,
  message text,
  inquiry_type text DEFAULT 'general' CHECK (inquiry_type IN ('consultation', 'general')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed')),
  created_at timestamptz DEFAULT now()
);

-- 创建新闻文章表
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_zh text NOT NULL,
  title_en text NOT NULL,
  content_zh text NOT NULL,
  content_en text NOT NULL,
  summary_zh text,
  summary_en text,
  category text DEFAULT 'company' CHECK (category IN ('company', 'industry', 'product')),
  image_url text,
  image_description text,
  is_featured boolean DEFAULT false,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建产品信息表
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_zh text NOT NULL,
  name_en text NOT NULL,
  description_zh text,
  description_en text,
  category text NOT NULL CHECK (category IN ('液压泵', '液压阀', '液压配件')),
  specifications text,
  features text,
  applications text,
  image_url text,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 为表添加更新时间触发器
CREATE TRIGGER update_news_articles_updated_at 
  BEFORE UPDATE ON news_articles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_news_articles_published ON news_articles(published_at);
CREATE INDEX IF NOT EXISTS idx_news_articles_featured ON news_articles(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_customer_inquiries_created_at ON customer_inquiries(created_at);
```

### 3. **验证表创建**
- 点击左侧菜单 "Table Editor"
- 应该能看到三个表：`customer_inquiries`, `news_articles`, `products`

## 🔐 **步骤四：配置权限**

### 1. **设置表权限**
在SQL编辑器中执行：

```sql
-- 允许匿名用户读取和插入数据
ALTER TABLE customer_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 创建读取策略
CREATE POLICY "Allow public read access" ON customer_inquiries FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON news_articles FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);

-- 创建插入策略
CREATE POLICY "Allow public insert" ON customer_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON news_articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert" ON products FOR INSERT WITH CHECK (true);

-- 创建更新策略
CREATE POLICY "Allow public update" ON news_articles FOR UPDATE USING (true);
CREATE POLICY "Allow public update" ON products FOR UPDATE USING (true);
```

## 🚀 **步骤五：更新代码配置**

### 1. **修改环境变量**
更新 `.env` 文件中的Supabase配置

### 2. **测试连接**
启动开发服务器：
```bash
npm run dev
```

### 3. **验证功能**
- 打开后台管理页面
- 尝试创建新闻和产品
- 检查控制台是否还有CORS错误

## 📊 **步骤六：数据迁移（可选）**

如果您有现有数据需要迁移：

### 1. **导出localStorage数据**
在浏览器控制台执行：
```javascript
console.log(JSON.stringify(localStorage.getItem('mockDataStore')));
```

### 2. **导入到Supabase**
使用Supabase的Table Editor或SQL编辑器导入数据

## ✅ **完成后的优势**

1. **无CORS问题**：使用官方Supabase服务
2. **SEO友好**：数据对搜索引擎完全可访问
3. **数据持久化**：数据永久保存在云端
4. **免费使用**：每月50,000次API调用免费
5. **自动备份**：Supabase自动备份数据

## 🎯 **总结**

**这个方案的优势：**
- ✅ **免费**：Supabase免费额度足够使用
- ✅ **简单**：无需服务器维护
- ✅ **快速**：30分钟内完成配置
- ✅ **可靠**：官方服务，稳定可靠

**您觉得这个方案怎么样？需要我帮您一步步配置吗？**

# 服务器申请和配置指南

## 🎯 **目标：申请自己的服务器，解决CORS问题**

### 方案一：阿里云服务器（推荐）

#### 1. **申请阿里云账号**
- 访问：https://www.aliyun.com
- 注册账号并实名认证
- 选择"云服务器ECS"

#### 2. **购买服务器**
- **配置推荐**：
  - CPU：1核
  - 内存：2GB
  - 硬盘：40GB SSD
  - 带宽：3Mbps
  - **价格**：约 ¥50-80/月

#### 3. **选择操作系统**
- **推荐**：Ubuntu 20.04 LTS
- **原因**：免费、稳定、易配置

#### 4. **配置服务器**
```bash
# 1. 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. 安装PM2（进程管理器）
sudo npm install -g pm2

# 3. 安装Nginx（反向代理）
sudo apt update
sudo apt install nginx

# 4. 配置防火墙
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 方案二：腾讯云服务器

#### 1. **申请腾讯云账号**
- 访问：https://cloud.tencent.com
- 注册并实名认证
- 选择"云服务器CVM"

#### 2. **购买配置**
- **配置**：1核2GB，40GB硬盘
- **价格**：约 ¥60-90/月

### 方案三：华为云服务器

#### 1. **申请华为云账号**
- 访问：https://www.huaweicloud.com
- 注册并实名认证

#### 2. **购买配置**
- **配置**：1核2GB，40GB硬盘
- **价格**：约 ¥50-80/月

## 🚀 **部署方案**

### 方案A：使用Vercel + 自定义域名（推荐）

#### 1. **申请域名**
- **推荐域名**：`jiehanhydraulic.com`（已购买）
- **DNS配置**：指向Vercel

#### 2. **配置Vercel**
- 连接GitHub仓库
- 自动部署
- 免费HTTPS证书

#### 3. **配置数据库**
- 使用Supabase免费版
- 配置CORS允许您的域名

### 方案B：使用阿里云 + 自建服务器

#### 1. **服务器配置**
```bash
# 安装Docker
sudo apt install docker.io docker-compose

# 创建项目目录
mkdir /var/www/jiehan-hydraulic
cd /var/www/jiehan-hydraulic

# 克隆代码
git clone https://github.com/hijabcantic-dotcom/jiehan-hydraulic-website.git .

# 安装依赖
npm install

# 构建项目
npm run build

# 启动服务
pm2 start npm --name "jiehan-hydraulic" -- start
```

#### 2. **配置Nginx**
```nginx
server {
    listen 80;
    server_name jiehanhydraulic.com www.jiehanhydraulic.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 💰 **成本对比**

| 方案 | 月费用 | 优点 | 缺点 |
|------|--------|------|------|
| Vercel + Supabase | ¥0 | 免费、简单 | 功能限制 |
| 阿里云ECS | ¥50-80 | 完全控制 | 需要维护 |
| 腾讯云CVM | ¥60-90 | 稳定可靠 | 需要维护 |
| 华为云ECS | ¥50-80 | 性价比高 | 需要维护 |

## 🎯 **推荐方案**

### **立即可行方案：Vercel + Supabase**
1. **免费**：Vercel和Supabase都有免费额度
2. **简单**：无需服务器维护
3. **快速**：几分钟就能部署

### **长期方案：阿里云服务器**
1. **完全控制**：可以配置任何服务
2. **成本可控**：月费用约¥50-80
3. **扩展性好**：可以随时升级配置

## 📝 **下一步行动**

### 立即行动（推荐）：
1. **使用Vercel部署**：免费、快速
2. **配置Supabase**：使用标准Supabase服务
3. **解决CORS问题**：使用官方Supabase

### 长期规划：
1. **申请阿里云服务器**
2. **学习服务器管理**
3. **自建完整服务**

## 🚀 **现在就开始**

**我建议先使用Vercel + 标准Supabase方案，这样可以：**
- ✅ 立即解决CORS问题
- ✅ 免费使用
- ✅ 数据存储在标准服务器上
- ✅ 支持SEO和爬虫访问

**您觉得哪个方案比较适合？**

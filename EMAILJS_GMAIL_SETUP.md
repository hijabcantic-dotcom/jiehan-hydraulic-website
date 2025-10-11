# EmailJS Gmail 配置指南

## 🎯 目标
将EmailJS服务从QQ邮箱改为Gmail邮箱，确保邮件发送到 `joe384326366@gmail.com`

## 📋 需要修改的配置

### 1. EmailJS服务配置

**当前问题**：
- 服务连接：`384326366@qq.com` (QQ邮箱)
- 需要改为：`joe384326366@gmail.com` (Gmail邮箱)

**解决步骤**：
1. 登录 EmailJS 控制台：https://dashboard.emailjs.com/admin
2. 进入 "Email Services"
3. 找到当前的 "Outlook" 服务
4. 点击 "Disconnect" 断开连接
5. 点击 "Add New Service"
6. 选择 "Gmail" 作为服务类型
7. 点击 "Connect Account"
8. 授权您的 Gmail 账户：`joe384326366@gmail.com`
9. 确保勾选 "Send email on your behalf" 权限
10. 记录新的 Service ID（可能需要更新代码中的 serviceId）

### 2. EmailJS模板配置

**检查模板设置**：
1. 进入 "Email Templates"
2. 找到模板 `template_hqse8mm`
3. 检查 "To Email" 字段：
   - 应该设置为：`joe384326366@gmail.com`
   - 或者设置为：`{{to_email}}`（这样会使用代码中传递的邮箱）

### 3. 代码配置检查

**当前代码中的邮箱地址**：
- ✅ `src/services/emailService.ts` - 已修改为 Gmail
- ✅ `src/pages/Contact.tsx` - 已使用 Gmail
- ✅ `src/components/common/Footer.tsx` - 已使用 Gmail
- ✅ `src/config/seo.ts` - 已使用 Gmail

### 4. 测试步骤

**测试流程**：
1. 确保所有配置都指向 Gmail
2. 重新部署网站
3. 提交表单
4. 检查 Gmail 收件箱
5. 检查 Gmail 垃圾邮件文件夹
6. 检查 Gmail 其他分类文件夹（推广、社交、更新）

## ⚠️ 重要提醒

1. **Gmail安全设置**：确保Gmail账户允许第三方应用发送邮件
2. **垃圾邮件过滤**：Gmail可能将自动发送的邮件标记为垃圾邮件
3. **发送限制**：EmailJS免费账户有每日发送限制
4. **权限设置**：确保EmailJS有发送邮件的权限

## 🔧 如果仍然收不到邮件

**可能的原因**：
1. Gmail安全设置阻止了第三方应用
2. 邮件被Gmail自动分类到其他文件夹
3. Gmail账户有发送限制
4. EmailJS服务配置不正确

**排查步骤**：
1. 检查Gmail的"已发送邮件"文件夹
2. 检查Gmail的"过滤器和已阻止的地址"
3. 尝试发送到其他Gmail账户测试
4. 检查EmailJS历史记录中的详细错误信息

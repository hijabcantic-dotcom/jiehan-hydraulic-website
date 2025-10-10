# 🔐 GitHub认证配置指南

## 问题说明
GitHub需要身份验证才能推送代码。以下是几种解决方案：

## 方法一：使用Personal Access Token（推荐）

### 1. 创建Personal Access Token

1. 访问 [GitHub.com](https://github.com)
2. 点击右上角头像 → "Settings"
3. 左侧菜单选择 "Developer settings"
4. 选择 "Personal access tokens" → "Tokens (classic)"
5. 点击 "Generate new token" → "Generate new token (classic)"
6. 填写信息：
   - Note: `Jiehan Hydraulic Website`
   - Expiration: `90 days`（或根据需要选择）
   - 勾选权限：
     - ✅ `repo` (完整仓库访问)
     - ✅ `workflow` (更新GitHub Action工作流)
7. 点击 "Generate token"
8. **重要**：复制生成的token（只显示一次！）

### 2. 配置Git认证

在终端中运行以下命令：

```bash
# 配置Git使用token
git config --global credential.helper store

# 推送代码（会提示输入用户名和密码）
git push -u origin main
```

当提示输入时：
- Username: `zhouji384326366`
- Password: `粘贴您的Personal Access Token`

## 方法二：使用SSH密钥

### 1. 生成SSH密钥

```bash
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your_email@example.com"

# 启动SSH代理
eval "$(ssh-agent -s)"

# 添加密钥到SSH代理
ssh-add ~/.ssh/id_ed25519
```

### 2. 添加SSH密钥到GitHub

1. 复制公钥内容：
```bash
cat ~/.ssh/id_ed25519.pub
```

2. 在GitHub中添加SSH密钥：
   - 访问 GitHub Settings → SSH and GPG keys
   - 点击 "New SSH key"
   - 粘贴公钥内容
   - 点击 "Add SSH key"

### 3. 更改远程仓库URL为SSH

```bash
# 更改远程仓库URL
git remote set-url origin git@github.com:zhouji384326366/jiehan-hydraulic-website.git

# 推送代码
git push -u origin main
```

## 方法三：使用GitHub Desktop（最简单）

如果您不熟悉命令行，可以使用GitHub Desktop：

1. 下载并安装 [GitHub Desktop](https://desktop.github.com/)
2. 使用GitHub账号登录
3. 选择 "Clone a repository from the Internet"
4. 输入仓库URL：`https://github.com/zhouji384326366/jiehan-hydraulic-website`
5. 选择本地路径
6. 在GitHub Desktop中提交并推送更改

## 推荐步骤

对于代码小白，我推荐使用**方法一（Personal Access Token）**：

1. 按照上面的步骤创建Personal Access Token
2. 在终端运行：
```bash
git push -u origin main
```
3. 输入用户名：`zhouji384326366`
4. 输入密码：`粘贴您的token`

## 验证推送成功

推送成功后，您应该看到类似这样的输出：
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to 8 threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
Total XX (delta XX), reused XX (delta XX), pack-reused 0
remote: Resolving deltas: 100% (XX/XX), completed with XX local objects.
To https://github.com/zhouji384326366/jiehan-hydraulic-website.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 下一步

推送成功后，您就可以：
1. 访问 [Vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 部署您的网站

---

**需要帮助？** 如果遇到任何问题，请告诉我具体的错误信息！

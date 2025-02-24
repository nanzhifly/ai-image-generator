# DeepSeek Image Generator 部署文档

## 部署方案 (2024-02-19)

## 重要提醒
在开始部署前：
1. 请先完整阅读本文档
2. 选择一种部署方式（CLI 或网页）并始终使用该方式
3. 按顺序执行每个步骤
4. 遇到问题先查看故障排除部分

## 部署方式对比
### CLI 部署（推荐）
优点：
- 操作更规范
- 便于自动化
- 配置更灵活

缺点：
- 需要安装 CLI
- 命令行操作

### 网页部署
优点：
- 可视化操作
- 无需安装工具

缺点：
- 操作不够规范
- 难以自动化

## 环境变量规范
1. 统一使用 ${} 语法
2. 不要混用 @secret 语法
3. 环境变量命名规范：
   - 全大写
   - 下划线分隔
   - 语义化命名

### 0. 环境准备
#### 安装 Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel
```

#### 常见问题处理
1. npm 权限错误
2. 登录状态丢失
3. 网络连接问题
```bash
# If you see "Cannot access this site" or "ERR_CONNECTION_CLOSED"

# 1. Check network connection
ping vercel.com

# 2. Try another network (e.g. mobile hotspot)

# 3. If using proxy, ensure:
# - Proxy server is running
# - vercel.com is added to proxy rules
```

2. 验证安装
```bash
# Check vercel version
vercel --version

If you see output like this, installation is successful:
# Vercel CLI 41.1.4
```

#### 登录步骤
```bash
# Login to Vercel
vercel login
```

#### 登录流程说明
1. 执行登录后会自动打开浏览器
2. 选择 "Continue with GitHub"
3. 在浏览器中授权 GitHub 账号
4. 授权 Vercel CLI 访问你的账号
5. 看到 "CLI Login Success" 说明登录成功

#### 验证登录状态
```bash
# Check login status
vercel whoami
```

#### 项目关联
```bash
# Link existing project
vercel link

# Select AI-IMAGE-GENERATOR project
```

#### 环境变量设置
```bash
# Add API key
vercel env add AI_IMAGE_GENERATOR_API_KEY

# Verify environment variables
vercel env ls
```

#### 项目设置问题答案
```bash
? Set up and deploy? [Y/n] y
? Which scope? [Select your personal account]
? Link to existing project? [y/N] n
? What's the name of your project? ai-image-generator
? In which directory is your code located? ./
? Want to modify these settings? [y/N] n

# Vercel will automatically:
# 1. Create new project
# 2. Build project
# 3. Deploy to development
```

### 1. 项目配置
1. 创建 vercel.json：
```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/server.js" }
  ],
  "env": {
    "DEEPSEEK_API_KEY": "@deepseek_api_key"
  }
}
```

### 2. 部署步骤
```bash
# 部署到 Vercel
vercel

# 部署过程会显示：
# - 构建日志
# - 部署进度
# - 最终的部署 URL

# 部署成功后会看到：
# ✅ Production: https://ai-image-generator-xxx.vercel.app

# 部署到生产环境
vercel --prod
```

#### 部署验证
1. 访问部署 URL
2. 测试主要功能：
   - 图片生成
   - API 调用
   - 错误处理

### 3. 环境变量配置
#### 添加生产环境变量
```bash
# 由于 CLI 的限制，建议使用 Vercel Dashboard 添加密钥：

# 1. 访问 Vercel Dashboard
# https://vercel.com/dashboard

# 2. 选择项目
# - 点击 ai-image-generator 项目

# 3. 添加密钥
# - 点击 Settings 标签
# - 选择 Environment Variables
# - 点击 Add New
# - Name: DEEPSEEK_API_KEY
# - Value: sk-msfzegvkcptjlvqzcnhgzhfzldtepbwhmtsufxwfyfigqstj
# - Environment: Production
# - 点击 Save

# 4. 验证配置
# - 检查 Environment Variables 列表
# - 确认 DEEPSEEK_API_KEY 已添加
# - 确认环境设置正确
```

1. 在 Vercel 控制台设置环境变量
   - DEEPSEEK_API_KEY
   - NODE_ENV=production

2. 本地开发环境
   ```bash
   # 创建 .env.local
   echo "DEEPSEEK_API_KEY=your_api_key" > .env.local
   ```

#### Git 仓库配置
```bash
# 1. 在完成环境变量设置后
# 2. 检查 Git 配置：
# Git 仓库连接验证：
# - 确保项目已连接到 GitHub 仓库
# - 仓库地址：https://github.com/你的用户名/ai-image-generator
# - 确认有仓库的读写权限

# - 验证部署分支设置
# - 检查构建配置
```

### 4. 部署监控
- 在 Vercel Dashboard 查看部署状态
- 监控应用性能指标
- 查看访问日志和错误报告

### 5. 回滚操作
```bash
# 回滚到上一个版本
vercel rollback

# 查看部署历史
vercel list
```

### 6. 监控检查
- 在 Vercel Dashboard 查看实时日志
- 监控应用性能指标

### 7. 回滚方案
- 使用 Vercel Dashboard 回滚
- 或使用命令行：`vercel rollback` 

## 环境配置
> 详细配置说明请参考 [API 配置文档](../docs/API_CONFIG.md)

1. 配置环境变量：
   ```env
   NODE_ENV=production            # 生产环境必须设置
   ```

### 开发环境
```bash
# 使用 Node.js watch 模式（推荐）
npm run dev

# 服务器会自动：
# - 检测端口占用
# - 尝试使用下一个可用端口
# - 提供清晰的启动状态

# 或使用生产模式
npm start
```
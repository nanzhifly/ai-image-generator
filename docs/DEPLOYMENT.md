# 部署指南

## 环境要求
- Node.js >= 14
- NPM >= 6

## 部署步骤
1. 克隆代码
2. 安装依赖：`npm install`
3. 配置环境变量：
   ```env
   DEEPSEEK_API_KEY=your-api-key
   ```
4. 启动服务：`npm start`

## 注意事项
- 确保 API 密钥安全
- 配置正确的 CORS 策略
- 设置适当的错误日志

## 环境要求
### MacOS
- Homebrew (包管理器)
  - 安装位置: /opt/homebrew
  - 主要用途: 安装和管理软件包
  - 安装命令: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
- Nginx

### Linux (Ubuntu/Debian)
- apt-get
- Nginx

## 部署进度
- [x] 系统环境配置 (2024-03-xx)
  - 系统包已更新
  - Homebrew 安装成功
    - 安装路径: /opt/homebrew
    - 状态: 正常运行
  - Nginx 安装成功
    - 版本: 1.27.4
    - 配置文件: /opt/homebrew/etc/nginx/nginx.conf
    - 网站根目录: /opt/homebrew/var/www
    - 默认端口: 8080
    - 服务状态: 运行中
    - 访问测试: 成功（显示默认欢迎页面）

## 环境检查清单
- [x] Homebrew 安装状态
  - [x] 基础安装
  - [x] 初始化更新
- [x] 系统更新状态
- [x] Nginx 安装状态
- [x] Nginx 服务运行状态

## 注意事项
### MacOS
1. Nginx 默认配置文件位置: /opt/homebrew/etc/nginx/nginx.conf
2. 网站文件默认路径: /opt/homebrew/var/www
3. 默认端口: 8080（无需 sudo 权限）
4. 服务管理: 使用 brew services 命令
5. 服务状态检查: brew services list
6. 访问测试: http://localhost:8080

### Linux
1. 确保系统防火墙允许 80 端口访问
2. 确保有足够的磁盘空间
3. 确保系统用户有适当的权限 

## 下一步操作
1. 部署项目文件
   - [x] 复制核心文件到网站根目录
     - index.html
     - js/* (所有 JS 文件)
     - docs/* (所有文档)
   - [x] 配置正确的文件权限
2. 配置 Nginx
   - [x] 修改 nginx.conf
   - [x] 配置 API 代理
   - [x] 重启 Nginx 服务

## 部署命令
```bash
# 清理目录
sudo rm -rf /opt/homebrew/var/www/deepseek-image-generator/*

# 创建目录结构
sudo mkdir -p /opt/homebrew/var/www/deepseek-image-generator/js
sudo mkdir -p /opt/homebrew/var/www/deepseek-image-generator/docs

# 复制文件
sudo cp index.html /opt/homebrew/var/www/deepseek-image-generator/
sudo cp js/* /opt/homebrew/var/www/deepseek-image-generator/js/
sudo cp docs/* /opt/homebrew/var/www/deepseek-image-generator/docs/

# 验证文件
ls -la /opt/homebrew/var/www/deepseek-image-generator
```

## 项目文件结构
```
/opt/homebrew/var/www/deepseek-image-generator/
├── index.html
├── js/
│   ├── api.js
│   ├── config.js
│   ├── main.js
│   └── ... (其他 JS 文件)
└── docs/
    ├── USER_GUIDE.md
    └── API_CONFIG.md
```

## 验证清单
- [x] index.html 存在且可访问
- [x] js 目录包含所有必要文件
- [x] docs 目录包含所有文档
- [x] 文件权限正确 

## Nginx 配置
### 方案一：完全重写配置
### 步骤 1: 创建项目配置
```bash
# 创建 servers 目录
sudo mkdir -p /opt/homebrew/etc/nginx/servers

# 创建项目配置文件
sudo nano /opt/homebrew/etc/nginx/servers/deepseek.conf
```

### 步骤 2: 添加项目配置内容
```nginx
server {
    listen       8080;
    server_name  localhost;

    root /opt/homebrew/var/www/deepseek-image-generator;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # API 代理
    location /api/ {
        proxy_pass https://api.siliconflow.com/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # 错误页面
    error_page 404 /404.html;
}
```

### 步骤 3: 修改主配置文件
#### 详细编辑步骤：
1. 在 nano 编辑器中：
   - 使用方向键移动到文件末尾
   - 删除所有注释的配置（# 开头的行）和重复的 server 块
   - 保留主要结构（worker_processes, events, http）

2. 确保文件内容如下：
```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout  65;

    # 启用 gzip
    gzip  on;
    gzip_types text/plain text/css application/json application/javascript;

    # 包含项目配置
    include servers/*;
}
```

3. 保存步骤：
   - 按 Ctrl + O 保存
   - 按 Enter 确认文件名
   - 按 Ctrl + X 退出

#### 常见问题处理
1. 重复的 localhost 配置
   - 问题表现：conflicting server name "localhost" on 0.0.0.0:8080
   - 解决方法：确保只在 servers/deepseek.conf 中有一个 localhost:8080 配置
   - 检查步骤：
     ```bash
     cat /opt/homebrew/etc/nginx/nginx.conf
     cat /opt/homebrew/etc/nginx/servers/deepseek.conf
     ```

## 配置验证
1. 检查 Nginx 配置
```bash
# 检查配置语法
sudo nginx -t

# 检查项目配置
cat /opt/homebrew/etc/nginx/servers/deepseek.conf
```

2. 检查文件部署
```bash
# 检查文件结构
ls -R /opt/homebrew/var/www/deepseek-image-generator
```

3. 重启并验证服务
```bash
# 重启 Nginx
brew services restart nginx

# 检查服务状态
brew services list | grep nginx

# 测试访问
curl http://localhost:8080
``` 

## 部署状态
- [x] Nginx 配置语法检查通过
- [x] 服务器配置完成
- [x] 网站访问测试

## 部署完成
- [x] 网站已成功部署到: http://localhost:8080
- [x] 所有功能正常运行
  - 页面正常加载
  - 样式正确显示
  - JavaScript 功能完整

## 后续建议
1. 监控网站性能
2. 设置定期备份
3. 配置 HTTPS（可选）
4. 添加访问日志分析

## 部署检查清单

### API 配置检查
- [x] API 域名更新为 .com
- [x] 超时时间调整为 60s
- [x] 代理配置优化完成

### Nginx 配置检查
- [x] 代理地址更新
- [x] 超时参数配置
- [x] 错误处理机制

### 性能优化确认
- [x] 请求超时优化
- [x] 重试机制完善
- [x] 错误处理改进

## Vercel 部署更新记录

### 2024-02-24
- 部署版本：v1.0.1
- 更新内容：
  - 添加 API 降级处理
  - 优化错误提示
  - 移除前端敏感信息
- 部署状态：✅ 成功

## Vercel 部署指南

### 环境变量
- DEEPSEEK_API_KEY: 已配置（所有环境）
- 环境：Development, Preview, Production

### 环境变量配置历史
- 2024-02-24: 重新配置 DEEPSEEK_API_KEY（直接值方式）

### 部署流程
1. 代码推送到 GitHub
2. 确认环境变量存在
   ```bash
   vercel env ls
   ```
3. 执行部署
   ```bash
   # 删除本地 .vercel 配置（如果存在）
   rm -rf .vercel

   # 重新部署到生产环境
   vercel --prod
   ```

### 部署历史
- 生产环境：https://ai-image-generator-e7btwhfuv-nanzhis-projects-70b94b29.vercel.app
- 最新部署：v1.0.1（2024-02-24）
- 部署状态：✅ 成功
- 部署时间：2s

### 配置更新记录
- 2024-02-24: 修复静态文件和 API 路由配置
  - 添加静态文件处理
  - 优化 API 路由配置
  - 修复 404 问题
  - 优化 Serverless Functions 配置（适配 Hobby 计划限制）
  - 修复静态资源路径问题
    - 更新静态文件构建配置
    - 优化路由规则
    - 修复样式文件访问
# API 问题记录

## 域名配置不一致问题 (2024-02-19)

### 问题描述
1. 现象
   - API 调用返回 401 错误
   - 认证失败
   - 请求不一致

2. 原因分析
   - 代码中混用多个域名
   - 请求头配置不统一
   - 配置管理分散

3. 影响范围
   - API 认证失败
   - 请求不稳定
   - 维护困难

### 解决方案
1. 配置统一
   - 使用统一域名 (api.siliconflow.cn)
   - 统一请求头配置
   - 集中配置管理

2. 代码改进
   - 创建配置文件
   - 统一配置引用
   - 规范化调用

3. 验证方法
   - API 测试工具
   - 请求日志记录
   - 错误监控

### 预防措施
1. 开发规范
   - 统一配置管理
   - 规范化调用
   - 完善文档

2. 监控告警
   - 域名检查
   - 认证监控
   - 错误追踪

## 环境配置不一致问题 (2024-02-19)

### 问题描述
1. 现象
   - API 认证失败
   - 本地测试失败
   - 环境差异大

2. 原因
   - 本地缺少配置
   - API key 不同步
   - 环境管理混乱

### 解决方案
1. 技术方案
   - 使用 vercel env pull
   - 统一配置管理
   - 自动化同步

2. 流程规范
   - 定期同步配置
   - 验证环境变量
   - 测试 API 调用

### 预防措施
1. 开发流程
   - 环境检查机制
   - 配置同步工具
   - 文档完善

2. 监控方案
   - 配置检查
   - 同步状态
   - 错误告警

## 问题总结 (2024-02-19)

### 常见问题模式
1. 配置管理
   - 环境变量不同步
   - 配置分散管理
   - 文档更新滞后

2. API 调用
   - 参数格式错误
   - 模型选择错误
   - 错误处理不完善

3. 测试验证
   - 测试用例不完整
   - 验证流程不规范
   - 日志记录不足

### 解决方案模式
1. 配置集中化
   - 统一配置中心
   - 自动化同步
   - 版本管理

2. 调用规范化
   - 参数模板
   - 错误处理
   - 日志记录

3. 测试系统化
   - 自动化测试
   - 性能监控
   - 错误追踪

## 健康检查接口 404 问题 (2024-02-22)

### 问题描述
1. 现象
   - 静态文件服务正常 (index.html 可以访问)
   - API 健康检查返回 404
   - Nginx 代理配置已生效

2. 原因分析
   - server.js 中未实现 /api/health 端点
   - Nginx 配置中的 API 代理路径可能不正确
   - Node.js 服务可能未启动

### 解决方案
1. 实现健康检查端点
   ```javascript
   // server.js
   app.get('/api/health', (req, res) => {
     res.json({ status: 'ok' });
   });
   ```

2. 启动 Node.js 服务
   ```bash
   npm run dev
   ```

3. 验证 Nginx 代理配置
   ```nginx
   location /api/ {
     proxy_pass http://localhost:8080/;
     proxy_set_header Host $host;
     proxy_set_header X-Real-IP $remote_addr;
   }
   ```

### 验证步骤
1. 确保 Node.js 服务运行
2. 重启 Nginx
3. 测试健康检查接口 

## 模块导入错误 (2024-02-22)

### 问题描述
1. 现象
   - Node.js 服务启动失败
   - 报错：ReferenceError: API_CONFIG is not defined

2. 原因分析
   - proxy.js 中未导入 API_CONFIG
   - ES Module 导入路径问题

### 解决方案
1. 添加正确的导入语句
   ```javascript
   import { API_CONFIG } from './config.js';
   ```

### 验证步骤
1. 修改 proxy.js
2. 重启 Node.js 服务
3. 检查服务是否正常启动 

## 环境变量配置 (2024-02-22)

### 问题描述
1. 现象
   - Node.js 服务启动失败
   - 错误：Missing required environment variables: [ 'DEEPSEEK_API_KEY' ]

2. 深入分析
   a. 可能的原因：
      - .env 文件格式错误（发现）
      - 环境变量重复定义
      - dotenv 加载时序问题
      - 环境变量检查位置不当

   b. 验证步骤：
      - 检查 .env 文件内容和权限
      - 验证 dotenv 配置
      - 检查环境变量加载顺序

### 解决方案
1. 优化环境变量加载流程
   ```javascript
   // 1. 确保在最开始就加载环境变量
   import dotenv from 'dotenv';
   const result = dotenv.config();

   if (result.error) {
     console.error('环境变量加载失败:', result.error);
     process.exit(1);
   }

   // 2. 环境变量验证函数
   function validateEnv() {
     const required = ['DEEPSEEK_API_KEY'];
     const missing = required.filter(key => !process.env[key]);
     if (missing.length > 0) {
       throw new Error(`Missing required environment variables: ${missing}`);
     }
   }
   ```

### 验证清单
- [x] .env 文件内容正确
- [x] 文件权限正常
- [x] dotenv 正确加载
- [x] 环境变量可访问

### 解决效果
1. 优化点：
   - 统一了环境变量检查逻辑
   - 调整了代码执行顺序
   - 完善了验证流程

2. 改进效果：
   - 环境变量加载更可靠
   - 错误提示更明确
   - 启动流程更规范 

## 端口冲突问题 (2024-02-22)

### 问题描述
1. 现象
   - 服务启动失败
   - 错误：EADDRINUSE: address already in use :::8080
   - Nginx 占用了 8080 端口

### 解决方案
1. 短期解决：
   - 停止 Nginx 服务
   - 或修改 Node.js 服务端口为 3000

2. 长期方案：
   - 使用 Nginx 反向代理 Node.js 服务
   - 配置不同的端口
   - 添加端口检查机制

### 配置更新
```nginx
# Nginx 配置
server {
    listen 8080;
    location /api/ {
        proxy_pass http://localhost:3000;
    }
}
``` 
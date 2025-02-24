# API 问题记录

## v1.0.0 版本问题总结
### 已解决的问题
- ✅ 图片生成请求超时问题
  - 原因：默认超时时间过短
  - 解决：调整为 60s，添加重试机制
- ✅ API 密钥验证错误
  - 原因：环境变量配置不正确
  - 解决：统一环境变量管理
- ✅ 图片下载格式问题
  - 原因：Content-Type 设置不正确
  - 解决：添加正确的 MIME 类型

### 待观察问题
- 📊 API 响应时间监控
  - 目标：平均响应时间 < 30s
  - 方案：添加性能监控
- 📊 错误率统计
  - 目标：错误率 < 1%
  - 方案：实现错误日志分析

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

# API 问题跟踪

## 已解决
- ✅ 图片生成请求超时问题
- ✅ API 密钥验证错误
- ✅ 图片下载格式问题

## 待观察
- 📊 API 响应时间监控
- 📊 错误率统计 

## 域名配置问题（重要⚠️）

### 问题描述
- 现象：API 调用返回 500 错误
- 频率：多次出现
- 影响：图片生成功能无法使用

### 根本原因
1. API 域名配置混淆
   - 正确域名：api.siliconflow.cn
   - 错误域名：api.deepseek.com

2. 原因分析
   - DeepSeek 公司名称与 API 域名不一致
   - 配置文件中多处引用域名
   - 文档中域名记录不统一

### 解决方案
1. 统一配置
   ```javascript
   // src/config.js
   export const API_CONFIG = {
     BASE_URL: 'https://api.siliconflow.cn/v1',
     REQUEST: {
       HEADERS: {
         'Origin': 'https://api.siliconflow.cn',
         'Referer': 'https://api.siliconflow.cn/'
       }
     }
   };
   ```

2. 文档规范
   - 在 API_CONFIG.md 中明确记录正确域名
   - 添加警告提示，避免误改

### 预防措施
1. 添加域名验证
2. 集中配置管理
3. 添加配置检查脚本
4. 完善错误提示 

## 问题分类和处理流程

### 严重程度分类
- P0: 系统不可用
- P1: 核心功能受影响
- P2: 功能部分受影响
- P3: 轻微问题

### 响应时间要求
- P0: 立即响应（<15分钟）
- P1: 2小时内响应
- P2: 24小时内响应
- P3: 下个版本修复 

## 测试问题总结 (2024-02-23)

### Jest 测试配置问题
#### 已解决的问题
- [x] Jest timeout 设置错误
- [x] 服务器关闭方法不正确
- [x] 测试覆盖率不达标

#### 错误处理改进
- [x] 统一错误处理机制
- [x] 标准化错误响应
- [x] 完善错误测试用例

#### 待观察项
1. 错误处理性能
   - 监控错误处理时间
   - 分析错误分布情况

2. 测试稳定性
   - 观察异步操作完成情况
   - 监控服务器资源使用

### 待优化项
1. 测试覆盖率
   - 当前：
     - 分支覆盖率：52.5% ✅
     - 函数覆盖率：55% ✅
     - 代码行覆盖率：57.14% ✅
   - 阶段目标：
     - 分支覆盖率 > 50% ✅
     - 函数覆盖率 > 50% ✅
     - 代码行覆盖率 > 50% ✅
   - 计划：
     - 继续优化测试覆盖
     - 添加更多集成测试
     - 完善错误场景测试 

2. 性能监控
   - 当前状态：
     - 仅有基础日志记录
     - 缺乏性能指标收集
     - 无监控可视化
   - 改进计划：
     - 添加响应时间监控
     - 实现内存使用追踪
     - 集成性能监控面板
   - 具体指标：
     - API 响应时间 < 30s
     - 内存使用率 < 80%
     - CPU 使用率 < 70% 

3. 日志系统优化
   - 当前问题：
     - 日志格式不统一
     - 缺乏结构化日志
     - 日志级别混乱
   - 改进方案：
     - 统一日志格式
     - 添加日志分级
     - 实现日志轮转
   - 监控指标：
     - 错误率 < 1%
     - 警告率 < 5%
     - 日志存储合理 

4. 测试场景扩展
   - 新增测试：
     - 负载测试
     - 并发测试
     - 容错测试
   - 测试目标：
     - 支持 10 并发
     - 成功率 > 99%
     - 平均响应 < 35s
   - 监控重点：
     - 资源使用情况
     - 错误分布情况
     - 性能瓶颈分析 

5. 性能监控告警
   > 详细的告警配置和实现请参考 [性能监控文档](./PERFORMANCE_MONITORING.md#告警机制)
   - 当前状态：
     - 仅记录性能数据

## 待优化项
5. 性能监控告警
   > 详细的告警配置和实现请参考 [性能监控文档](./PERFORMANCE_MONITORING.md#告警机制)
   - 当前状态：
     - 仅记录性能数据 

## 问题处理原则
> MVP 阶段问题优先级：

### 优先处理
- 影响核心功能的问题
- 基本性能问题
- 关键错误处理

### 暂缓处理
- 非核心功能优化
- 高级特性需求
- 复杂的性能优化

### 评估问题的标准
1. 是否影响核心功能？
2. 是否有简单的临时解决方案？
3. 现在是否必须解决？ 

## 服务器启动问题总结 (2024-02-24)

### 问题描述
1. 现象
   - 端口占用问题：默认端口 3000 经常被占用
   - 顶层 await 问题：未正确处理的异步启动逻辑
   - 服务器崩溃后不会自动恢复

### 根本原因
1. 端口占用
   - 开发环境中多个服务同时运行
   - 之前的进程未正确关闭

2. 代码结构问题
   - 使用了顶层 await 但未正确封装
   - 缺少适当的错误处理
   - 服务器生命周期管理不完善

### 解决方案
```javascript
// 1. 正确的异步启动封装
async function main() {
  try {
    const server = await startServer(port);
    console.log(`服务器运行在 http://localhost:${port}`);
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
}

main().catch(console.error);
```

### 预防措施
1. 开发环境配置
   - 使用 .env 文件配置默认端口
   - 实现端口自动切换逻辑
   - 添加端口检查和清理脚本

2. 代码规范
   - 避免使用顶层 await
   - 统一异步代码处理方式
   - 完善错误处理机制

3. 开发流程
   - 启动前检查端口占用
   - 使用 process.on('exit') 清理资源
   - 实现优雅关闭机制

### 最佳实践
1. 端口管理
   ```env
   PORT=3000              # 默认端口
   PORT_RANGE_START=3000  # 端口范围起始
   PORT_RANGE_END=3010    # 端口范围结束
   ```

2. 服务器启动
   ```javascript
   // 优雅启动和关闭
   const server = app.listen(port);
   
   process.on('SIGTERM', () => {
     server.close(() => {
       console.log('服务器已关闭');
       process.exit(0);
     });
   });
   ``` 

## 2024-02-24: DeepSeek API 服务负载问题

### 问题描述
- 状态：🔴 严重
- 类型：服务端负载问题
- 错误表现：
  - ECONNRESET (连接重置)
  - 504 Model service timeout
  - Connect Timeout Error

### 临时解决方案
采用服务降级处理：
1. 添加服务状态检查
2. 不可用时显示示例图片
3. 提供友好的状态提示

### 后续计划
1. 监控 API 服务状态
2. API 恢复后切换回正常模式
3. 考虑添加服务可用性检测

### 相关配置
```javascript
// 当前配置
TIMEOUT: 180000,
RETRY: 3,
quality: 'draft',
num_inference_steps: 20
``` 
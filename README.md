# DeepSeek Image Generator

基于 DeepSeek API 的简单图片生成工具。MVP 版本专注于核心功能验证。

## 项目状态
- 版本：v0.1.0（2024-02-22）
- 状态：MVP 开发中 - 核心功能已验证
- 计划：本周完成部署

## MVP 核心功能
### 1. ✅ 图片生成（已完成）
- API 集成完成并验证
- 支持三种风格：照片/卡通/艺术
- 验证时间：2024-02-22 13:35

### 2. ⏳ 图片下载（进行中）
- 前端界面开发中
- 支持一键下载
- 计划今日完成

### 3. 📝 部署准备（待办）
- Vercel 一键部署
- 环境变量配置
- 计划本周完成

## 快速开始
```bash
# 1. 配置环境变量
echo "DEEPSEEK_API_KEY=your-key" > .env

# 2. 启动服务
npm run dev  # 默认端口 3000

# 3. 访问服务
open http://localhost:3000
```

## 项目结构
```
/
├── index.html    # 前端代码（简化版）
├── server.js     # API 服务
└── vercel.json   # 部署配置
```

## 问题记录
### 2024-02-22
- ✅ 环境变量加载优化
- ✅ 服务端口调整为 3000
- ✅ API 集成验证通过

## 开发说明
- 专注 MVP 核心功能
- 保持配置简单
- 快速迭代验证

## 项目架构

### 目录结构
```
/src
  /services        // 服务层：处理核心业务逻辑
    - api.service.js    // API 调用服务
    - image.service.js  // 图片处理服务

  /utils           // 工具层：通用功能
    - config.js         // 配置管理
    - helpers.js        // 辅助函数

  /components      // 组件层：UI 相关
    - ui.js            // UI 组件
```

### 模块职责
1. 服务层 (Services)
   - API 调用和数据处理
   - 图片生成和处理
   - 错误处理和重试逻辑

2. 工具层 (Utils)
   - 配置管理
   - 通用函数
   - 常量定义

3. 组件层 (Components)
   - UI 渲染
   - 事件处理
   - 用户交互 

## 环境配置

1. API 配置
   - 基础域名: https://api.deepseek.com/v1
   - 超时时间: 30s
   - 重试次数: 2

2. 环境变量
   ```env
   DEEPSEEK_API_KEY=sk-xxxx  # DeepSeek API 密钥
   ```

3. 域名说明
   - 使用 api.deepseek.com 作为统一域名
   - 所有请求通过该域名访问
   - 确保环境变量正确配置 

## 许可证
MIT License

## 关于 DeepSeek
DeepSeek Image Generator 基于 DeepSeek 强大的 AI 技术构建，
通过直观的界面提供高质量的图片生成能力。
# DeepSeek Image Generator

基于 DeepSeek API 的图片生成工具，当前为 MVP 阶段。

## 开发规范
- [语言规范](./LANGUAGE_GUIDELINES.md)
- [开发指南](./DEVELOPMENT.md)
- [测试用例](./docs/TEST_CASES.md)

## 项目状态
- 版本：v0.1.0（2024-02-22）
- 状态：MVP 开发中 - 核心功能已验证
- 计划：本周完成部署

## 语言规范
### 文档语言
- 所有文档使用中文
- 包括开发文档和注释

### 界面语言
- 所有用户界面使用英文
- 包括按钮文本和提示信息
- 错误提示使用英文

## 核心功能
### 1. 图片生成 ✅
- API 集成完成
- 支持三种风格
- 已完成测试

### 2. 图片下载 ⏳
- 前端开发中
- 支持直接下载
- 计划今日完成

### 3. 部署准备 📝
- Vercel 部署
- 环境配置
- 本周完成

## 快速开始
```bash
# 1. 配置密钥
echo "DEEPSEEK_API_KEY=your-key" > .env

# 2. 启动服务
npm run dev

# 3. 访问服务
open http://localhost:3000
```

## 项目结构
```
/
├── index.html    # 前端界面
├── server.js     # API 服务
└── vercel.json   # 部署配置
```

## 开发说明
- 专注核心功能
- 保持简单配置
- 快速迭代验证

## 许可证
MIT 开源协议

## 关于 DeepSeek
DeepSeek Image Generator 是一个基于 DeepSeek AI 技术的图片生成工具，
提供直观的界面和高质量的图片生成能力。
## 贡献指南
请查看 [语言规范](./LANGUAGE_GUIDELINES.md) 了解更多信息。

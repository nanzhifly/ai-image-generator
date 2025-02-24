# DeepSeek Image Generator

基于 DeepSeek API 的图片生成工具，支持多种风格生成。

## 主要功能
- 🖼️ AI 图片生成
- 🎨 支持三种风格：写实、艺术、卡通
- ⚡️ 简单的 API 接口

## 快速开始
```bash
# 1. 克隆项目
git clone <repository-url>

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，添加你的 DEEPSEEK_API_KEY

# 4. 启动服务
npm run dev
```

## API 使用示例
```bash
curl http://localhost:3000/api/generate \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A cute dog",
    "style": "photo"
  }'
```

## 使用说明
1. 输入图片描述（50-1000字）
2. 选择生成风格（photo/art/cartoon）
3. 等待图片生成（约15-30秒）

## 相关文档
- [API 配置](docs/API_CONFIG.md)
- [部署指南](docs/DEPLOYMENT.md)
- [更新日志](docs/API_CHANGELOG.md)

## 许可证
MIT 开源协议

## 关于 DeepSeek
DeepSeek Image Generator 是一个基于 DeepSeek AI 技术的图片生成工具，
提供直观的界面和高质量的图片生成能力。

## 贡献指南
请查看 [语言规范](./LANGUAGE_GUIDELINES.md) 了解更多信息。

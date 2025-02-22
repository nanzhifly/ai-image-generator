# DeepSeek Image Generator 开发文档

## 项目概述
基于 DeepSeek API 的图片生成工具，专注于 MVP 核心功能。

## 技术架构
- Node.js API 服务
- 原生 JavaScript 前端
- Vercel 部署

## 项目结构
```
/
├── index.html          # 前端界面
├── server.js           # API 服务
├── vercel.json         # 部署配置
├── src/
│   ├── services/       # 服务层
│   │   └── api.service.js
│   └── styles/         # 样式
│       ├── styles.css
│       └── variables.css
└── docs/              # 文档
    └── TEST_CASES.md  # 测试用例
```

## 核心功能
### MVP 阶段
- [x] 输入处理
- [x] API 集成
- [x] 图片显示
- [ ] 下载功能（进行中）

## 开发规范
### 语言规范
- 开发文档：中文
- 代码注释：中文
- 变量命名：英文
- 用户界面：英文

## API 服务
### 代理服务配置
- 处理跨域请求
- 转发 API 调用
- 错误处理

## 注意事项
1. 保持代码简洁，添加必要注释
2. 确保响应式设计在各种设备上的表现
3. 注意 API 调用频率限制
4. 保持用户友好的错误提示

## 开发环境设置
1. 使用现代浏览器（Chrome/Safari）
2. 使用 VS Code 进行开发
3. 使用 Live Server 插件进行本地开发
4. 配置环境变量（DEEPSEEK_API_KEY）
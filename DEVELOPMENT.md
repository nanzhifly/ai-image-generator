# DeepSeek Image Generator 开发文档

## 项目概述
一个专业的 AI 图片生成网站，基于 DeepSeek API 构建。

## 设计需求
- 主色：#0066CC

## 技术栈
- HTML5
- CSS3
- 原生 JavaScript
- Fetch API

## 核心功能
### MVP 阶段
- [x] 输入处理
- [x] API 集成
- [x] 图片显示
- [x] 下载功能
- [x] 基础图片编辑
  - [x] 黑白效果
  - [x] 重置功能

### 后续迭代
- [ ] 高级图片编辑
  - [ ] 图片压缩
  - [ ] 复古效果
  - [ ] 增亮效果
  - [ ] 模糊效果
- [ ] 手势操作支持
- [ ] 性能监控
- [ ] 分享功能

## 项目结构
deepseek-image-generator/
├── index.html     # 主页面
├── css/
│ └── style.css    # 样式文件
├── js/
│ ├── main.js      # 主要脚本
│ ├── api.js       # API 模块
│ ├── config.js    # 配置文件
│ ├── utils.js     # 工具函数
│ └── image-editor.js # 图片编辑
├── README.md      # 项目说明
└── DEVELOPMENT.md # 开发文档

## 注意事项
1. 保持代码简洁，添加必要注释
2. 确保响应式设计在各种设备上的表现
3. 注意 API 调用频率限制
4. 保持用户友好的错误提示
5. 图片压缩时注意平衡质量和大小
6. 开发时需要处理跨域问题:
  - 使用 CORS 中间件
  - 配置正确的请求头
  - 确保 API 端点允许跨域请求

## 开发环境设置
1. 使用现代浏览器（Chrome/Safari）
2. 使用 VS Code 进行开发
3. 使用 Live Server 插件进行本地开发
4. 安装 "Allow CORS" Chrome 扩展用于开发测试

## 开发指南

### 代理服务开发注意事项 (2024-02-17)
1. 路由配置
   - Express 路由顺序至关重要
   - 代理路由需要放在通配符路由之前
   - 静态文件路由优先级最高

2. OSS 访问规范
   ```javascript
   // 必要的请求头
   const headers = {
       'Authorization': `Bearer ${API_KEY}`,
       'Origin': 'https://api.siliconflow.cn',
       'Referer': 'https://api.siliconflow.cn/',
       'User-Agent': 'DeepSeek-Image-Generator'
   };
   ```

3. 错误处理最佳实践
   - 使用 try-catch 包装异步操作
   - 提供详细的错误日志
   - 返回友好的错误信息

4. 性能优化建议
   - 考虑添加响应缓存
   - 设置合理的超时时间
   - 实现请求重试机制
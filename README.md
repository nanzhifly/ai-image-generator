# DeepSeek Image Generator

基于 DeepSeek API 的简单图片生成工具。

## MVP 版本说明
为了快速验证和简化部署，当前版本：
- 所有前端代码集成在 index.html
- 简化了配置和部署流程
- 保持核心功能完整

## 部署指南
### 部署方式选择
本项目支持两种部署方式，建议选择其中一种并始终使用该方式：

1. CLI 部署（推荐）
  ```bash
  # 一键部署
  vercel --prod
  ```

2. 网页部署
  - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
  - 导入 GitHub 项目
  - 配置部署选项
  - 点击部署

### 环境变量配置
环境变量仅在服务器端使用：
```
DEEPSEEK_API_KEY=your_api_key
```

### 开发说明
- 无需构建步骤
- 直接部署即可运行
- 支持自动更新

### 配置文件说明
vercel.json 配置示例：
```json
{
  "env": {
    "DEEPSEEK_API_KEY": "${DEEPSEEK_API_KEY}"  // 使用环境变量语法
  }
}
```

### 常见问题
1. 环境变量问题
  - 确保使用正确的语法引用环境变量
  - 避免混用 @secret 和 ${} 语法

2. 部署失败
  - 检查环境变量配置
  - 验证 vercel.json 语法
  - 确认项目关联状态

### 最佳实践
1. 环境变量管理
   - 统一使用 process.env 访问环境变量
   - 在 vercel.json 中使用 ${} 语法
   - 避免使用自定义配置文件

2. 代码规范
   - 使用 ES Modules 模块系统
   - 保持配置文件同步
   - 遵循统一的编码风格

3. 部署检查
   - 验证环境变量设置
   - 检查模块导入导出
   - 确认路由配置正确

## 功能
- 文本生成图片
- 支持三种风格：照片/卡通/艺术
- 图片下载

## MVP 方案
### 1. 项目结构
```
/
├── index.html      # 包含所有前端代码
├── server.js       # 服务器端代码
└── vercel.json     # 部署配置
```

### 2. 核心功能
- ✓ 输入提示词
- ✓ 选择风格（照片/卡通/艺术）
- ✓ 生成图片
- ✓ 下载图片

### 3. 性能表现
- 生成时间: < 2秒
- 图片大小: ~230KB
- 响应状态: 稳定

### 4. 后续计划
1. 部署测试版本
2. 收集用户反馈
3. 根据反馈迭代

## 使用
1. 输入描述
2. 选择风格
3. 点击生成
4. 下载图片

## 安装
1. 克隆仓库
2. 配置 API_KEY
3. 启动服务

## 项目状态
![版本](https://img.shields.io/badge/版本-0.1.0-blue)
![测试](https://img.shields.io/badge/测试-通过-green)

## 核心功能
- 图片生成：输入描述,一键生成图片
- 基础编辑：支持简单的黑白效果
- 图片下载：便捷下载生成的图片
- 图片压缩：支持智能压缩，保持图片质量

## 功能测试状态
- ✓ 输入验证功能
- ✓ 图片生成功能
- ✓ 错误处理机制
- ✓ 下载功能

## 系统要求
- 现代浏览器（Chrome 80+, Firefox 75+, Safari 13+）
- 稳定的网络连接

## 功能特性

### 图片生成
- 支持多种风格：真实照片、艺术风格、卡通风格
- 自定义提示词
- 高质量图片输出

### 性能指标
```javascript
{
    // 生成时间
    photo: "< 30秒",    // 真实照片风格
    cartoon: "< 30秒",  // 卡通风格
    art: "< 35秒",      // 艺术风格
    
    // 质量指标
    successRate: "> 98%",
    imageQuality: "优秀",
    stability: "高"
}
```

### 优化配置
- 所有风格使用快速模式 (quality: "fast")
- 优化推理步骤 (steps: 35)
- 风格特定引导比重
  - 真实照片：7.5
  - 卡通风格：8.0
  - 艺术风格：8.5

### 推荐配置
```javascript
{
    // 服务配置
    timeout: 300000,    // 300 秒
    retryCount: 3,      // 重试次数
    retryDelay: 20000,  // 重试间隔 20 秒
    
    // 图片参数
    imageParams: {
        size: "384x384",
        quality: "standard",
        num_inference_steps: 50,
        style_strength: 0.8,
        guidance_scale: 7.5
    }
}
```

### 已验证风格
- [x] 卡通风格：✓ 成功
  - 生成时间：< 60s
  - 图片质量：优秀
  - 稳定性：高

### 图片加载优化 (2024-02-17)
- 支持阿里云 OSS 图片加载
- 内置代理服务解决跨域问题
- 自动重试和错误处理

## 快速开始
1. 输入图片描述
2. 点击"生成"按钮
3. 等待 AI 处理
4. 下载生成的图片
5. 可选择编辑或压缩图片

### 开发环境设置
```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

### 注意事项
- 确保 API_KEY 配置正确
- 使用代理服务访问图片
- 遵循路由配置规范

## 开发环境
```bash
# 启动开发服务器
npm run dev
```

## 开发设置
1. 克隆仓库
2. 使用 VS Code 打开
3. 通过 Live Server 启动
4. 配置 API 密钥
5. 开始开发

## 浏览器支持
- Chrome（推荐）
- Firefox
- Safari

## 许可证
MIT License

## 关于 DeepSeek
DeepSeek Image Generator 基于 DeepSeek 强大的 AI 技术构建，
通过直观的界面提供高质量的图片生成能力。

## 部署
### 环境要求
- Node.js 14+
- Nginx 1.18+

### 部署状态
- [x] 系统环境配置 (2024-03-xx)
- [ ] 项目文件部署
- [ ] Nginx 配置
- [ ] 环境变量设置
- [ ] 部署验证

### 部署步骤
1. 克隆仓库
   ```bash
   git clone https://github.com/your-username/deepseek-image-generator.git
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置环境变量
   ```bash
   export DEEPSEEK_API_KEY=your_api_key
   ```

4. 运行部署脚本
   ```bash
   ./deploy.sh
   ```

5. 配置 Nginx
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/deepseek
   sudo ln -s /etc/nginx/sites-available/deepseek /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

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
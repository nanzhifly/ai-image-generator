# DeepSeek API 文档

## API 配置
- 基础域名: https://api.deepseek.com
- API 版本: v1
- 超时时间: 30s

## 接口说明
1. 图片生成
- 端点: /v1/images/generations
- 方法: POST
- 参数:
  - model: deepseek-api/image-gen
  - prompt: 生成提示词
  - n: 生成数量
  - size: 图片尺寸

2. 错误码
- 401: 认证错误
- 400: 请求无效
- 500: 服务器错误

## 最佳实践
1. 总是验证 API 密钥
2. 使用正确的请求头
3. 处理所有错误情况
4. 记录详细日志

## API 使用指南

### 前端集成
1. API 调用封装
   ```javascript
   async function generateImage(prompt, style) {
     // API 调用实现
   }
   ```

2. 错误处理
   - 输入验证错误
   - API 调用错误
   - 网络错误
   - 超时处理

3. 状态管理
   - 加载状态
   - 错误状态
   - 成功状态 
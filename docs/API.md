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
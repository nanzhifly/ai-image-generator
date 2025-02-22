# API 测试文档

## 测试步骤

1. 环境准备
```bash
# 安装依赖
npm install dotenv node-fetch

# 设置环境变量
export DEEPSEEK_API_KEY=your_api_key
```

2. 运行测试
```bash
node scripts/api-test.js
```

## 测试用例

1. API 可用性检查
- 端点: /models
- 方法: GET
- 预期: 200 OK

2. 图片生成
- 端点: /images/generations
- 方法: POST
- 测试数据:
  ```json
  {
    "model": "deepseek-api/image-gen",
    "prompt": "test prompt",
    "n": 1,
    "size": "384x384"
  }
  ```
- 预期响应:
  ```json
  {
    "data": [{
      "url": "https://..."
    }]
  }
  ```

## 错误处理

1. 记录以下信息：
- 响应状态码
- 响应头信息
- 原始响应文本
- JSON 解析结果

2. 常见错误：
- 400: 检查请求格式
- 401: 验证 API 密钥
- 500: 服务器错误

## 测试结果记录

1. 成功案例
- 记录成功的请求格式
- 保存有效的参数组合
- 记录响应时间

2. 失败案例
- 记录错误信息
- 保存失败请求
- 分析失败原因 
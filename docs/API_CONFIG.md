# API 配置文档

## API 配置规范
### 1. 环境变量配置
```env
# DeepSeek API 配置
DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # 从 platform.deepseek.com 获取

# 环境配置
NODE_ENV=development  # development | test | production
```

### 2. API 域名规范
> ⚠️ 警告：API 域名必须使用 api.siliconflow.cn，不要修改为其他域名！

### 3. 开发环境配置
```bash
# 1. 复制环境变量模板
cp .env.example .env

# 2. 修改 API 密钥（使用编辑器打开 .env）
# 将 DEEPSEEK_API_KEY 替换为实际的密钥

# 3. 启动开发服务
# 使用 Node.js 原生 watch 模式，支持热重载
npm run dev

# 服务器会自动寻找可用端口：
# - 默认尝试 3000 端口
# - 如果被占用，会尝试下一个端口
# - 最多尝试 10 次
# - 成功后显示实际运行端口
```

## DeepSeek API
- API 文档：https://docs.siliconflow.cn/cn/api-reference/images/images-generations
- API 密钥：sk-msfzegvkcptjlvqzcnhgzhfzldtepbwhmtsufxwfyfigqstj
- API 端点：https://api.siliconflow.cn/v1/images/generations

## 配置说明
### 环境变量
```env
DEEPSEEK_API_KEY=your-api-key
```

### API 参数
```javascript
{
  model: 'deepseek-ai/Janus-Pro-7B',
  prompt: '用户输入 + 风格提示词',
  n: 1,
  size: '384x384',
  quality: 'fast',
  num_inference_steps: 35,
  guidance_scale: 7.5
}
```

+ ### 风格配置
+ ```javascript
+ const stylePrompts = {
+   photo: "realistic photo, 4K, detailed",
+   art: "artistic painting, creative",
+   cartoon: "cartoon style, cute"
+ };
+ ```

### 代理服务配置
```javascript
// 代理服务超时设置
timeout: 30000,  // 30 秒

// 重试配置
retryCount: 3,
retryDelay: 1000,  // 1 秒

// OSS 认证头
headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Origin': 'https://api.siliconflow.cn',
    'Referer': 'https://api.siliconflow.cn/',
    'User-Agent': 'DeepSeek-Image-Generator'
}
```

### 性能优化建议
- 启用响应缓存
- 设置合理的超时时间
- 实现请求队列管理

## 注意事项
1. API 密钥请勿泄露
2. 请求频率限制：每分钟不超过 50 次
3. 图片生成时间约 60 秒
4. 默认图片尺寸：384x384
5. 生成的图片 URL 有效期为 1 小时
6. OSS 图片访问说明：
   - 需要通过代理访问
   - 可能需要特定认证头
   - 建议使用服务器端代理
6. 请求超时设置：
   - 客户端超时：300 秒
   - 重试次数：3 次
   - 重试间隔：20 秒

## API 性能监控

### 响应时间
- 平均响应时间：5-10秒
- 超时设置：15秒

### 错误处理
- 网络错误
- API 限流
- 参数错误

### 改进建议
1. 实现请求重试机制
2. 添加请求超时处理
3. 优化错误提示信息
4. 添加请求队列管理

## 推荐配置
```javascript
{
    // 基础配置
    timeout: 180000,
    retryCount: 3,
    retryDelay: 10000,
    
    // 优化后的图片参数
    imageParams: {
        size: "384x384",
        quality: "fast",
        num_inference_steps: 35,
        style_strength: 0.8,
        guidance_scale: 7.5
    },
    
    // 风格特定配置
    styleParams: {
        photo: {  // 真实照片风格
            quality: "fast",
            num_inference_steps: 35
        },
        cartoon: {  // 卡通风格
            quality: "fast",
            num_inference_steps: 35,
            guidance_scale: 8.0  // 增强卡通效果
        },
        art: {  // 艺术风格
            quality: "fast",
            num_inference_steps: 35,
            guidance_scale: 8.5  // 增强艺术效果
        }
    }
}
```

## 性能指标
- 真实照片风格: < 30s
- 卡通风格: < 30s
- 艺术风格: < 35s
- 成功率: > 98%
- 图片质量: 优秀 

## 错误处理配置
- 基本错误处理
- 超时设置 

## 性能监控配置

### 监控端点
```javascript
// GET /api/metrics
{
  status: 'ok',
  data: {
    timestamp: Date,
    requestCount: Number,
    avgResponseTime: Number,
    errorRate: Number,
    memoryUsage: {
      heapUsed: Number,
      heapTotal: Number,
      rss: Number
    },
    cpuUsage: {
      load: Number
    },
    concurrentRequests: Number,
    maxConcurrentRequests: Number
  },
  thresholds: {
    responseTime: 30000,    // 最大响应时间 (ms)
    memoryUsage: 80,       // 最大内存使用率 (%)
    cpuUsage: 70,          // 最大 CPU 使用率 (%)
    errorRate: 1,          // 最大错误率 (%)
    concurrentRequests: 10 // 最大并发请求数
  }
}
```

### 监控阈值
- 响应时间: < 30s
- 内存使用: < 80%
- CPU 使用: < 70%
- 错误率: < 1%
- 并发数: ≤ 10 

## 相关文档
- [API 测试文档](./API_TEST.md)
- [API 问题记录](./API_ISSUES.md)
- [性能监控文档](./PERFORMANCE_MONITORING.md)

## 性能配置
> 详细的性能监控配置请参考 [性能监控文档](./PERFORMANCE_MONITORING.md)
```javascript
{
  timeout: 180000,
  retryCount: 3,
  retryDelay: 10000,
}
```

## 配置原则
> MVP 阶段配置原则：
1. 保持配置简单
2. 避免过度配置
3. 专注必要功能

### 必要配置
- API 密钥
- 基本超时设置
- 错误重试次数

### 暂不需要
- 复杂的缓存策略
- 高级负载均衡
- 复杂的监控配置 

## 模块导出规范
### 性能监控
```javascript
// 统一使用 metrics 作为导出名
import { metrics } from './middleware/performanceMonitor.js';

// 使用示例
app.get('/api/metrics', (req, res) => {
  const stats = metrics.getStats();
  res.json(stats);
});
```

### 输入验证
```javascript
// 统一使用 validateInput 作为导出名
import { validateInput } from './middleware/validateInput.js';

// 使用示例
app.post('/api/generate', validateInput, async (req, res) => {
  // 处理请求
});
```

### 推荐调用方式
```bash
# 直接调用 DeepSeek API（推荐）
curl https://api.siliconflow.cn/v1/images/generations \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Origin: https://api.siliconflow.cn" \
  -d '{
    "prompt": "Your prompt",
    "style": "photo"
  }'
```

> 注：代理服务调用方式正在优化中，暂时推荐使用直接调用方式 

### API 路由权限
```
# 公开路由（无需认证）
GET /api/health   # 健康检查
GET /api/metrics  # 性能指标

# 受保护路由（需要认证）
POST /api/generate  # 图片生成
``` 

### 性能指标
```json
{
  "基准指标": {
    "平均响应时间": "< 5ms",    // 非图片生成请求
    "错误率": "< 1%",
    "并发处理": "✅ 正常"
  }
}
``` 

### API 响应格式
```json
{
  "success": true,
  "imageUrl": "https://sc-maas.oss-cn-shanghai.aliyuncs.com/outputs/xxx.png",
  "timings": {
    "inference": 14.268
  },
  "style": "photo",
  "prompt": "A cute dog"
}
```

## 降级响应格式
```json
{
  "success": false,
  "fallback": true,
  "error": "DeepSeek API is currently experiencing high load. Please try again later.",
  "style": "photo"
}
``` 
# API 配置文档

## DeepSeek API
- API 文档：https://docs.siliconflow.cn/cn/api-reference/images/images-generations
- API 密钥：sk-msfzegvkcptjlvqzcnhgzhfzldtepbwhmtsufxwfyfigqstj
- API 端点：https://api.siliconflow.cn/v1/images/generations

## 配置说明
1. 在 js/config.js 中配置：
```javascript
export const CONFIG = {
    API_URL: 'https://api.siliconflow.com/v1/images/generations',
    API_KEY: 'sk-msfzegvkcptjlvqzcnhgzhfzldtepbwhmtsufxwfyfigqstj',
    // ...其他配置
};
```

2. 请求参数示例：
```javascript
{
    "model": "deepseek-ai/Janus-Pro-7B",
    "prompt": "用户输入的描述",
    "n": 1,
    "size": "384x384"
}
```

3. 响应格式：
```javascript
{
    "images": [
        {
            "b64_json": "base64编码的图片数据"
        }
    ],
    "timing": {...},
    "seed": 1273224706,
    "shared_id": "0"
}
```

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
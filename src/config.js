// API 配置
export const API_CONFIG = {
  // API 基础配置
  BASE_URL: 'https://api.siliconflow.cn/v1',
  ENDPOINTS: {
    GENERATE: '/images/generations',
    HEALTH: '/health',
    METRICS: '/metrics'
  },
  
  // 请求配置
  REQUEST: {
    TIMEOUT: 180000,   // 180秒超时
    RETRY: 3,          // 重试3次
    HEADERS: {
      'Content-Type': 'application/json',
      'Origin': 'https://api.siliconflow.cn',
      'Referer': 'https://api.siliconflow.cn/',
      'User-Agent': 'DeepSeek-Image-Generator'
    }
  },
  
  // 错误信息
  ERRORS: {
    TIMEOUT: '请求超时，请重试',
    API_ERROR: '服务异常，请稍后再试',
    INVALID_INPUT: '输入无效，请检查后重试',
    NETWORK_ERROR: '网络连接失败，请检查网络'
  },

  // 图片生成参数
  GENERATE: {
    model: 'deepseek-ai/Janus-Pro-7B',
    n: 1,
    size: '384x384',
    quality: 'draft',
    num_inference_steps: 20,
    guidance_scale: 7.5
  },

  // 降级配置
  FALLBACK: {
    ENABLED: true,
    EXAMPLES: {
      photo: '/examples/photo.jpg',
      art: '/examples/art.jpg',
      cartoon: '/examples/cartoon.jpg'
    },
    MESSAGE: 'Service is temporarily in maintenance mode. Showing example images.'
  }
};

// 环境配置
export const ENV_CONFIG = {
  PORT: process.env.PORT || 3000,  // 添加默认端口
  API_KEY_PREFIX: 'sk-',
  REQUIRED_VARS: ['DEEPSEEK_API_KEY'],
  // ... 其他配置
};

// 日志配置
export const LOG_CONFIG = {
  LEVELS: {
    ERROR: 'error',
    WARN: 'warn',
    INFO: 'info',
    DEBUG: 'debug'
  },
  MAX_LENGTH: 1000
};

// 域名验证常量
const VALID_API_DOMAIN = 'api.siliconflow.cn';

// 域名验证函数
function validateApiDomain(url) {
  try {
    const domain = new URL(url).hostname;
    if (domain !== VALID_API_DOMAIN) {
      throw new Error(`Invalid API domain: ${domain}. Expected: ${VALID_API_DOMAIN}`);
    }
    return true;
  } catch (error) {
    console.error('API 域名验证失败:', error);
    process.exit(1);
  }
}

// 验证所有 API 相关域名
validateApiDomain(API_CONFIG.BASE_URL);
validateApiDomain(API_CONFIG.REQUEST.HEADERS.Origin);
validateApiDomain(new URL(API_CONFIG.REQUEST.HEADERS.Referer).origin); 
// API 配置
export const API_CONFIG = {
  // API 基础配置
  BASE_URL: 'https://api.deepseek.com',  // 更新为正确的域名
  VERSION: 'v1',
  TIMEOUT: 30000,
  
  // API 端点
  ENDPOINTS: {
    GENERATE: '/images/generations',
    MODELS: '/models',
    HEALTH: '/health'
  },
  
  // 请求配置
  REQUEST: {
    MAX_RETRIES: 2,
    RETRY_DELAY: 1000,
    HEADERS: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },
  
  // 响应格式
  RESPONSE: {
    SUCCESS_CODES: [200, 201],
    ERROR_CODES: {
      AUTH_ERROR: 401,
      INVALID_REQUEST: 400,
      SERVER_ERROR: 500
    }
  }
};

// 环境配置
export const ENV_CONFIG = {
  REQUIRED_VARS: ['DEEPSEEK_API_KEY'],
  API_KEY_PREFIX: 'sk-'
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
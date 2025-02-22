import { API_CONFIG } from './config.js';

// 代理配置
export const PROXY_CONFIG = {
  // 代理基础配置
  TARGET_API: API_CONFIG.BASE_URL,  // 使用统一配置
  TIMEOUT: API_CONFIG.TIMEOUT,
  
  // 请求头转换
  HEADERS_MAP: API_CONFIG.REQUEST.HEADERS,  // 使用统一请求头
  
  // 错误处理
  ERROR_MESSAGES: {
    TIMEOUT: '请求超时，请重试',
    NETWORK: '网络错误，请检查连接',
    SERVER: '服务器错误，请稍后重试',
    AUTH: '认证失败，请检查密钥'
  }
};

// 代理请求处理
export async function proxyRequest(url, options) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...PROXY_CONFIG.HEADERS_MAP
      },
      timeout: PROXY_CONFIG.TIMEOUT
    });
    
    return response;
  } catch (error) {
    console.error('代理请求错误:', error);
    throw error;
  }
} 
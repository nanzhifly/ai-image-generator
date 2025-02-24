import dotenv from 'dotenv';
import { API_CONFIG, ENV_CONFIG, LOG_CONFIG } from './src/config.js';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createApp } from './src/app.js';

const result = dotenv.config();

if (result.error) {
  console.error('加载环境变量失败:', result.error);
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 初始化前检查环境
checkEnvironment();

const app = createApp();

export { app };

function checkEnvironment() {
  const requiredEnvVars = ENV_CONFIG.REQUIRED_VARS;
  const missingVars = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  }

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    process.exit(1);
  }

  // 验证 API 密钥格式
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey.startsWith(ENV_CONFIG.API_KEY_PREFIX)) {
    console.error('Invalid API key format');
    process.exit(1);
  }
}

// API 密钥验证
async function validateApiKey(apiKey) {
  try {
    // 测试 API 密钥
    const response = await fetch(`${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.MODELS}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...API_CONFIG.REQUEST.HEADERS
      }
    });
    
    if (!response.ok) {
      throw new Error(`API key validation failed: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('API key validation error:', error);
    return false;
  }
}

async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      lastError = await response.json();
    } catch (error) {
      lastError = error;
      console.error(`重试 ${i + 1}/${maxRetries}:`, error);
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error(`最大重试次数已达到: ${lastError.message}`);
} 
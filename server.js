import express from 'express';
import cors from 'cors';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { API_CONFIG, ENV_CONFIG, LOG_CONFIG } from './src/config.js';
import { PROXY_CONFIG, proxyRequest } from './src/proxy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// 中间件
app.use(cors());
app.use(express.json());

// 设置正确的 MIME 类型
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.type('application/javascript');
    }
    next();
});

// 1. 静态文件路由
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname)));

// 2. API 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// 3. 图片代理路由
app.get('/proxy-image', async (req, res) => {
    try {
        const imageUrl = decodeURIComponent(req.query.url);
        console.log('代理请求URL:', imageUrl);
        
        const ossHeaders = {
            ...API_CONFIG.REQUEST.HEADERS
        };
        
        const response = await fetch(imageUrl, {
            headers: ossHeaders,
            timeout: 30000
        });
        
        if (!response.ok) {
            console.error('图片加载失败:', {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers)
            });
            throw new Error(`图片加载失败: ${response.status}`);
        }
        
        res.set('Content-Type', response.headers.get('content-type'));
        res.set('Cache-Control', 'no-cache');
        
        response.body.pipe(res);
    } catch (error) {
        console.error('代理错误:', error);
        res.status(500).json({ 
            error: '图片加载失败',
            details: error.message 
        });
    }
});

// 环境变量检查
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

// 启动时检查环境
checkEnvironment();

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

// 4. API 生成路由
app.post('/api/generate', async (req, res) => {
  try {
    // 记录 API 密钥前6位用于调试
    const apiKey = process.env.DEEPSEEK_API_KEY;
    console.log('Using API key:', apiKey.substring(0, 6) + '...');
    
    const { prompt, style } = req.body;
    
    // 验证输入
    if (!prompt || prompt.length < 50 || prompt.length > 1000) {
      return res.status(400).json({ error: '提示词长度必须在 50-1000 字之间' });
    }
    
    // 根据风格添加提示词
    const stylePrompts = {
      photo: "realistic photo, 4K, detailed",
      art: "artistic painting, creative",
      cartoon: "cartoon style, cute"
    };
    
    // 合并提示词
    const finalPrompt = `${prompt}, ${stylePrompts[style] || ''}`.trim();
    
    console.log('生成请求:', {
      prompt: finalPrompt,
      model: 'deepseek-api/image-gen'  // 记录使用的模型
    });
    
    // 调用 DeepSeek API
    const response = await fetch('https://api.siliconflow.cn/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://api.siliconflow.cn',
        'Referer': 'https://api.siliconflow.cn/',
        'User-Agent': 'DeepSeek-Image-Generator'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/Janus-Pro-7B',
        prompt,
        n: 1,
        size: '384x384',
        quality: 'fast',
        num_inference_steps: 35,
        guidance_scale: 7.5
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '图片生成失败');
    }

    const data = await response.json();
    res.json(data);
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || '服务器错误' });
  }
});

// 5. 通配符路由放最后
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// 导出 app
export default app; 
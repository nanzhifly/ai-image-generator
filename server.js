import express from 'express';
import cors from 'cors';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

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
            'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
            'Origin': 'https://api.siliconflow.cn',
            'Referer': 'https://api.siliconflow.cn/',
            'User-Agent': 'DeepSeek-Image-Generator'
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

// 4. API 生成路由
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, style } = req.body;
    
    // 根据风格添加提示词
    const stylePrompts = {
      photo: "realistic photo style, high quality, 4K resolution",
      art: "artistic painting style, creative composition",
      cartoon: "cartoon style, cute design, vibrant colors"
    };
    
    // 合并提示词
    const finalPrompt = `${prompt}, ${stylePrompts[style] || ''}`.trim();
    
    console.log('生成请求:', {
      prompt: finalPrompt,
      style: 'none'  // 记录用于调试
    });
    
    // 调用 DeepSeek API
    const response = await fetch('https://api.siliconflow.cn/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'User-Agent': 'DeepSeek-Image-Generator',
        'Origin': 'https://api.siliconflow.cn',
        'Referer': 'https://api.siliconflow.cn/'
      },
      body: JSON.stringify({
        prompt: finalPrompt,
        n: 1,
        size: "384x384",
        quality: "standard",  // 使用标准质量
        num_inference_steps: 30,  // 添加推理步数
        guidance_scale: 7.5  // 添加引导比例
      })
    });

    if (!response.ok) {
      console.error('API 错误:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        prompt: finalPrompt  // 记录完整提示词
      });
      throw new Error(`图片生成失败: ${response.status}`);
    }

    const data = await response.json();
    console.log('API 响应:', data);
    res.json({
      url: data.images?.[0]?.url || data.images?.[0] || data.url,
      prompt: finalPrompt
    });
  } catch (error) {
    console.error('生成错误:', error);
    res.status(500).json({ 
      error: '图片生成失败',
      details: error.message,
      timestamp: new Date().toISOString()
    });
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
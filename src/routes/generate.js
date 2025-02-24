import express from 'express';
import { API_CONFIG } from '../config.js';
import { fetchWithRetry } from '../utils/fetch.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { prompt, style } = req.body;
    
    // 调试环境变量
    console.log('Environment:', {
      DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
      NODE_ENV: process.env.NODE_ENV,
      API_URL: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE}`
    });
    
    // 调用 DeepSeek API
    const response = await fetchWithRetry(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GENERATE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Origin': 'https://api.siliconflow.cn',
        'Referer': 'https://api.siliconflow.cn/',
        'User-Agent': 'DeepSeek-Image-Generator',
        ...API_CONFIG.REQUEST.HEADERS
      },
      timeout: API_CONFIG.REQUEST.TIMEOUT,
      retry: API_CONFIG.REQUEST.RETRY,
      body: JSON.stringify({
        ...API_CONFIG.GENERATE,
        prompt: `${prompt} ${style === 'photo' ? 'realistic photo' : style === 'art' ? 'artistic painting' : 'cartoon style'}`
      })
    });

    if (!response.ok || API_CONFIG.FALLBACK.ENABLED) {
      const style = req.body.style || 'photo';
      return res.json({
        success: false,
        fallback: true,
        error: 'DeepSeek API is currently experiencing high load. Please try again later.',
        style: style
      });
    }

    const data = await response.json();
    console.log('API Response:', data);
    res.json({
      success: true,
      imageUrl: data.images[0].url,
      timings: data.timings,
      style: style,
      prompt: prompt
    });
  } catch (error) {
    console.error('Generate Error:', error);
    const style = req.body.style || 'photo';
    res.json({
      success: false,
      fallback: true,
      error: 'DeepSeek API is currently experiencing high load. Please try again later.',
      style: style
    });
  }
});

export { router as generateRouter }; 
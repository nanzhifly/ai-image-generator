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
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
        ...API_CONFIG.REQUEST.HEADERS
      },
      timeout: API_CONFIG.REQUEST.TIMEOUT,
      retry: API_CONFIG.REQUEST.RETRY,
      body: JSON.stringify({
        ...API_CONFIG.GENERATE,
        prompt: `${prompt} ${style === 'photo' ? 'realistic photo' : style === 'art' ? 'artistic painting' : 'cartoon style'}`
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        error: errorData,
        url: response.url,
        method: 'POST'
      });
      throw new Error(errorData.message || 'Failed to generate image');
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
    next(error);
  }
});

export { router as generateRouter }; 
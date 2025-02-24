import { API_CONFIG } from '../config.js';

export async function generateImage(prompt, style) {
  // 模拟图片生成服务
  return {
    imageUrl: 'https://example.com/image.jpg',
    style,
    prompt
  };
} 
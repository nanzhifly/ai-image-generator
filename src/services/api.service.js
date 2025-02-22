/**
 * API related functionality
 */

import { CONFIG } from '/src/utils/config.js';

/**
 * API Error class
 */
class APIError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'API Error';
        this.code = code;
    }
}

/**
 * API call with retry mechanism
 */
async function withRetry(fn, retries = CONFIG.RETRY_COUNT) {
    let lastError;
    
    for (let i = 0; i <= retries; i++) {
        try {
            if (i > 0) {
                // Retry delay
                await new Promise(resolve => 
                    setTimeout(resolve, CONFIG.RETRY_DELAY * Math.pow(2, i - 1))
                );
                console.log(`第 ${i} 次重试`);
            }
            return await fn();
        } catch (error) {
            console.error(`第 ${i + 1} 次请求失败:`, error);
            lastError = error;
            
            // 如果是 429 (频率限制)，等待更长时间
            if (error.code === 429) {
                await new Promise(resolve => 
                    setTimeout(resolve, CONFIG.RETRY_DELAY * 4)
                );
            }
        }
    }
    
    throw lastError;
}

/**
 * Prompt enhancement configuration
 */
const STYLE_ENHANCERS = {
    photo: 'high quality, 4K, detailed, realistic photo',
    art: 'artistic style, high quality, rich details, beautiful composition',
    cartoon: 'cartoon style, cute, colorful, high quality'
};

/**
 * Get error message
 */
function getErrorMessage(code) {
    const messages = {
        400: 'Invalid request parameters',
        401: 'Unauthorized access',
        403: 'Access denied',
        404: 'Service unavailable',
        429: 'Too many requests, please try again later',
        500: 'Server error',
        503: 'Service temporarily unavailable'
    };
    
    return messages[code] || 'Unknown error';
}

// API 服务封装
class ApiService {
    constructor() {
        // 基础配置
        this.baseUrl = 'https://api.siliconflow.cn/v1';
        this.timeout = 30000;
    }

    // 生成图片
    async generateImage(prompt, style) {
        try {
            console.log('开始请求生成图片:', { prompt, style });

            const response = await fetch(`${this.baseUrl}/images/generations`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt,
                    style,
                    size: '384x384'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            console.log('图片生成成功');
            return await response.json();

        } catch (error) {
            console.error('图片生成失败:', error);
            throw new Error('Image generation failed');
        }
    }

    // 健康检查
    async healthCheck() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch (error) {
            console.error('健康检查失败:', error);
            return false;
        }
    }
}

export default new ApiService();
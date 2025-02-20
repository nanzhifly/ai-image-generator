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
        this.name = 'API错误';
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
                console.log(`重试次数 ${i}`);
            }
            return await fn();
        } catch (error) {
            console.error(`第 ${i + 1} 次尝试失败:`, error);
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
    photo: '高质量，4K，细节清晰，真实照片',
    art: '艺术风格，高质量，细节丰富，优美构图',
    cartoon: '卡通风格，可爱，色彩丰富，高质量'
};

/**
 * Get error message
 */
function getErrorMessage(code) {
    const messages = {
        400: '无效的请求参数',
        401: '未授权访问',
        403: '访问被拒绝',
        404: '服务不可用',
        429: '请求过于频繁，请稍后重试',
        500: '服务器错误',
        503: '服务暂时不可用'
    };
    
    return messages[code] || '未知错误';
}

export class ApiService {
    constructor(config) {
        this.config = config;
    }

    async generateImage(prompt, style) {
        if (!prompt || !style) {
            throw new APIError('无效的输入参数', 400);
        }
        
        return await withRetry(async () => {
            const requestBody = {
                ...this.config.IMAGE_PARAMS,
                prompt: `${prompt}, ${this.config.STYLES[style].prompt}`,
                ...this.config.STYLES[style].params
            };
            console.log('API Request:', requestBody);

            const response = await fetch(this.config.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.config.API_KEY}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                console.error('API Error Response:', response.status, response.statusText);
                const errorMessage = await this.handleErrorResponse(response);
                throw new APIError(errorMessage, response.status);
            }

            const data = await response.json();
            console.log('API Response:', data);
            console.log('Response Type:', typeof data.images[0]);
            console.log('Response Structure:', Object.keys(data.images[0]));
            const imageData = data.images?.[0];
            if (!imageData) {
                throw new APIError('生成图片失败', 500);
            }

            if (imageData.b64_json) {
                return `data:image/png;base64,${imageData.b64_json}`;
            } else if (imageData.url) {
                return `/proxy-image?url=${encodeURIComponent(imageData.url)}`;
            } else if (typeof imageData === 'string') {
                return `/proxy-image?url=${encodeURIComponent(imageData)}`;
            }

            throw new APIError('无效的图片数据格式', 500);
        });
    }

    async checkServerStatus() {
        try {
            const response = await fetch(this.config.API_URL, {
                method: 'HEAD',
                headers: {
                    'Authorization': `Bearer ${this.config.API_KEY}`
                }
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    async handleErrorResponse(response) {
        try {
            const data = await response.json();
            return data.error?.message || getErrorMessage(response.status);
        } catch {
            return getErrorMessage(response.status);
        }
    }
}
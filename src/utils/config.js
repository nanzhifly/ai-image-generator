/**
 * 配置文件
 */
export const CONFIG = {
    API_URL: 'https://api.siliconflow.cn/v1/images/generations',
    API_KEY: window.__ENV__?.DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY,
    MAX_LENGTH: 1000,
    
    // 超时配置
    TIMEOUT: 300000,  // 300 秒
    
    // 重试配置
    RETRY_COUNT: 3,
    RETRY_DELAY: 20000,  // 20 秒
    
    // 风格配置
    STYLES: {
        photo: {
            prompt: 'realistic photo style',
            params: {
                quality: "fast",
                num_inference_steps: 35
            }
        },
        art: {
            prompt: 'artistic style, simple composition',
            params: {
                quality: "fast",
                num_inference_steps: 35,
                guidance_scale: 8.5  // 稍微增加引导比重来保持艺术效果
            }
        },
        cartoon: {
            prompt: 'pixar style 3D animation, high quality render, cute character design, vibrant colors, soft lighting, detailed textures, professional animation movie still',
            params: {
                quality: "fast",
                num_inference_steps: 35,
                guidance_scale: 8.0  // 稍微增加引导比重来保持卡通风格的清晰度
            }
        }
    },
    
    // 图片配置
    IMAGE_PARAMS: {
        model: "deepseek-ai/Janus-Pro-7B",
        n: 1,
        size: "384x384",
        quality: "fast",
        num_inference_steps: 30,
        guidance_scale: 7.5,
        negative_prompt: "blurry, low quality, distorted"
    },
    
    ERRORS: {
        API_ERROR: 'Server error, please try again later',
        NETWORK_ERROR: 'Network connection failed, please check your connection',
        TIMEOUT_ERROR: 'Request timeout, please try again',
        VALIDATION_ERROR: 'Invalid input, please check'
    },
    
    STATUS: {
        LOADING: 'Loading...',
        READY: 'Ready',
        ERROR: 'Error'
    }
};
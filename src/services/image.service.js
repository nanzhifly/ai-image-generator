// 图片处理相关
export class ImageService {
    constructor(config) {
        this.config = config;
    }

    async processImage(url, style) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('图片处理失败:', error);
            throw new Error('图片处理失败');
        }
    }

    /**
     * 下载生成的图片
     * @param {string} url - 图片URL
     */
    async downloadImage(url) {
        try {
            // 创建下载链接
            const link = document.createElement('a');
            link.href = url;
            link.download = `deepseek-image-${Date.now()}.png`;
            
            // 添加到文档中并触发点击
            document.body.appendChild(link);
            link.click();
            
            // 清理
            document.body.removeChild(link);
        } catch (error) {
            console.error('下载失败:', error);
            throw new Error('下载失败');
        }
    }

    validateImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const timeout = setTimeout(() => {
                reject(new Error('图片加载超时'));
            }, 30000);

            img.onload = () => {
                clearTimeout(timeout);
                resolve(true);
            };

            img.onerror = () => {
                clearTimeout(timeout);
                console.error('图片加载失败:', url);
                if (url.startsWith('data:image')) {
                    try {
                        const base64Data = url.split(',')[1];
                        if (base64Data) {
                            resolve(true);
                            return;
                        }
                    } catch (error) {
                        console.error('Base64 解码失败:', error);
                    }
                }
                reject(new Error('无效的图片URL'));
            };

            img.src = url;
        });
    }
} 
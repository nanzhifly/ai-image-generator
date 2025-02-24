/**
 * 带重试的 fetch 函数
 * @param {string} url - 请求 URL
 * @param {object} options - fetch 选项
 * @param {number} maxRetries - 最大重试次数
 * @returns {Promise<Response>}
 */
export async function fetchWithRetry(url, options, maxRetries = 3) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        timeout: options.timeout || 180000
      });
      
      if (response.ok) return response;
      
      lastError = await response.json();
      console.error(`重试 ${i + 1}/${maxRetries}:`, {
        status: response.status,
        error: lastError
      });
      
      // 等待一段时间后重试
      await new Promise(r => setTimeout(r, 10000));
      
    } catch (error) {
      lastError = error;
      console.error(`重试 ${i + 1}/${maxRetries}:`, error);
      await new Promise(r => setTimeout(r, 10000));
    }
  }
  
  throw new Error(`最大重试次数已达到: ${lastError?.message || lastError}`);
} 
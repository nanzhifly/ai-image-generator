// 错误模拟中间件
import { APIError } from './errorHandler.js';

export const mockAPIError = (req, res, next) => {
  // 调试日志
  console.log('mockAPIError 中间件运行');
  
  const { prompt } = req.body;
  
  // 模拟网络错误
  if (prompt === 'test_network_error') {
    const error = new Error('Network error');
    error.code = 'ECONNREFUSED';
    return next(error);
  }
  
  // 模拟特定的 API 错误
  if (prompt === 'error_trigger_test') {
    return next(new APIError('API error', 400));
  }
  
  if (req.body.prompt?.includes('test_error')) {
    return res.status(500).json({ error: 'Mock API Error' });
  }
  
  next();
}; 
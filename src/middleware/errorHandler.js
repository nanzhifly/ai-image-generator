// 自定义 API 错误类
export class APIError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'APIError';
    this.status = status;
  }
}

// 简化的错误处理中间件
export function errorHandler(err, req, res, next) {
  // 1. 获取错误信息
  const error = {
    code: err.status || 500,
    message: err.message || '未知错误'
  };

  // 2. 记录错误日志
  console.error(`[Error] ${error.code}: ${error.message}`);

  // 3. 返回错误响应
  res.status(error.code).json({
    success: false,
    error: error.message
  });
} 
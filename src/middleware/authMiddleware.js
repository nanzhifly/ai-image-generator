/**
 * API 认证中间件
 * 配置说明请参考：docs/API_CONFIG.md
 * 职责：
 * 1. 验证 API 密钥
 * 2. 处理不同环境
 * 3. 提供错误信息
 */

// 验证 API 密钥格式
function isValidApiKey(key) {
  return typeof key === 'string' && key.startsWith('sk-');
}

// API 认证中间件
export function validateApiKey(req, res, next) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  
  // 1. 测试环境处理
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  // 2. 验证密钥存在
  if (!apiKey) {
    return res.status(401).json({
      error: 'API key not configured',
      message: 'Please configure DEEPSEEK_API_KEY in environment variables'
    });
  }

  // 3. 验证密钥格式
  if (!isValidApiKey(apiKey)) {
    return res.status(401).json({
      error: 'Invalid API key format',
      message: 'API key should start with "sk-"'
    });
  }

  // 4. 验证请求头
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Invalid authorization header',
      message: 'Please provide API key in Authorization header with Bearer scheme'
    });
  }

  // 5. 验证请求中的密钥
  const providedKey = authHeader.split(' ')[1];
  if (providedKey !== apiKey) {
    return res.status(401).json({
      error: 'Invalid API key',
      message: 'The provided API key is invalid'
    });
  }

  next();
} 
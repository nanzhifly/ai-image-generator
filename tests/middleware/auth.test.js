import { validateApiKey } from '../../src/middleware/authMiddleware.js';

describe('Auth Middleware Tests', () => {
  // 简单的请求和响应模拟
  const mockReq = {
    headers: {}
  };
  
  let responseData = {};
  const mockRes = {
    status: (code) => {
      responseData.status = code;
      return mockRes;
    },
    json: (data) => {
      responseData.data = data;
      return mockRes;
    }
  };
  
  const mockNext = () => {
    responseData.next = true;
  };

  beforeEach(() => {
    // 重置响应数据
    responseData = {};
  });

  test('Should validate API key correctly', () => {
    // 1. 测试环境跳过验证
    process.env.NODE_ENV = 'test';
    validateApiKey(mockReq, mockRes, mockNext);
    expect(responseData.next).toBe(true);

    // 2. 生产环境验证
    process.env.NODE_ENV = 'production';
    process.env.DEEPSEEK_API_KEY = 'sk-test-key';
    mockReq.headers.authorization = 'Bearer sk-test-key';
    validateApiKey(mockReq, mockRes, mockNext);
    expect(responseData.next).toBe(true);
  });
}); 
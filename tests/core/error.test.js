import { app, request, expect } from './setup.js';
import { API_CONFIG } from '../../src/config.js';

describe('错误处理测试', () => {
  // 只测试 API 密钥验证
  test('API密钥错误', async () => {
    process.env.DEEPSEEK_API_KEY = 'invalid-key';
    
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'A cute dog',
        style: 'photo'
      });
    
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  // 只测试基本输入验证
  test('输入验证', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: '',
        style: 'photo'
      });
    
    expect(response.status).toBe(400);
  });
}); 
import { app, request, expect } from './setup.js';

describe('图片生成核心功能测试', () => {
  test('基础图片生成', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'A cute dog',
        style: 'photo'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.imageUrl).toBeDefined();
  });

  test('错误提示', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: '',  // 空提示词
        style: 'photo'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Prompt must be a string');
  });
}); 
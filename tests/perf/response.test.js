import app from '../../server.js';
import request from 'supertest';

describe('API 响应时间测试', () => {
  test('图片生成响应时间在可接受范围内', async () => {
    const startTime = Date.now();
    
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'A cute dog',
        style: 'photo'
      });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    expect(response.status).toBe(200);
    expect(responseTime).toBeLessThan(35000); // 35秒内
  }, 40000); // 设置更长的超时时间
}); 
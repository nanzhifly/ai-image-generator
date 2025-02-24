import { app } from '../../server.js';
import request from 'supertest';

describe('健康检查 API 测试', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  test('健康检查端点返回正确状态', async () => {
    const response = await request(app)
      .get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('version');
    expect(response.body).toHaveProperty('services');
  });
}); 
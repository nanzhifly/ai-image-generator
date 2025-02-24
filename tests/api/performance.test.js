import { app } from '../../server.js';
import request from 'supertest';
import { jest } from '@jest/globals';

const TEST_TIMEOUT = 120000;

describe('性能监控测试', () => {
  let server;

  beforeAll(async () => {
    jest.setTimeout(TEST_TIMEOUT);
    server = app.listen(0);
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  afterAll(async () => {
    await new Promise(resolve => setTimeout(resolve, 5000));
    if (server && server.listening) {
      await new Promise(resolve => {
        server.close(() => {
          console.log('Server closed');
          resolve();
        });
      });
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('获取性能指标', async () => {
    const response = await request(app)
      .get('/api/metrics');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('requestCount');
    expect(response.body.data).toHaveProperty('avgResponseTime');
    expect(response.body.data).toHaveProperty('errorRate');
    expect(response.body.data).toHaveProperty('memoryUsage');
    expect(response.body.data).toHaveProperty('cpuUsage');
  });

  test('性能指标阈值检查', async () => {
    const response = await request(app)
      .get('/api/metrics');

    expect(response.body.data.avgResponseTime).toBeLessThan(30000);
    expect(response.body.data.errorRate).toBeLessThan(1);
    // 内存使用率检查
    const memUsage = response.body.data.memoryUsage;
    const memUsagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
    expect(memUsagePercent).toBeLessThan(80);
    // CPU 使用率检查
    expect(response.body.data.cpuUsage.load).toBeLessThan(70);
  });

  test('并发请求处理', async () => {
    // 创建 10 个并发请求
    const concurrentRequests = Array(10).fill().map(() => 
      request(app)
        .post('/api/generate')
        .send({
          prompt: 'A cute dog',
          style: 'photo'
        })
    );

    // 等待所有请求完成
    const responses = await Promise.all(concurrentRequests);

    // 检查所有响应
    responses.forEach(response => {
      expect(response.status).toBe(200);
    });

    // 检查性能指标
    const metricsResponse = await request(app)
      .get('/api/metrics');

    // 验证最大并发请求数
    expect(metricsResponse.body.data.maxConcurrentRequests).toBeGreaterThanOrEqual(5);
    // 验证当前并发请求数已恢复
    expect(metricsResponse.body.data.concurrentRequests).toBe(0);
    // 验证平均响应时间仍在阈值内
    expect(metricsResponse.body.data.avgResponseTime).toBeLessThan(30000);
  });
}); 
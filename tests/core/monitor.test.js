import { app, request, expect } from './setup.js';
import { metrics } from '../../src/middleware/performanceMonitor.js';

describe('基础监控测试', () => {
  beforeEach(() => {
    // 清理之前的监控数据
    metrics.reset();
  });

  test('请求计数', async () => {
    await request(app).get('/api/health');
    const response = await request(app).get('/api/metrics');
    
    expect(response.body.totalRequests).toBe(1);
  });

  test('错误统计', async () => {
    await request(app).get('/non-existent');
    const response = await request(app).get('/api/metrics');
    
    expect(response.body.errorCount).toBeDefined();
  });
}); 
import { app } from '../../server.js';
import request from 'supertest';
import dotenv from 'dotenv';
import { jest } from '@jest/globals';

const TEST_TIMEOUT = 120000; // 设置更长的超时时间

describe('图片生成 API 测试', () => {
  let server;

  beforeAll(async () => {
    jest.setTimeout(TEST_TIMEOUT);
    // 确保环境变量加载
    dotenv.config();
    // 等待之前的服务器实例完全关闭
    await new Promise(resolve => setTimeout(resolve, 1000));
    // 为每个测试文件创建独立的服务器实例
    server = app.listen(0);
    // 等待服务器完全启动
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  afterAll(async () => {
    // 等待所有异步操作完成
    await new Promise(resolve => setTimeout(resolve, 5000));
    // 确保服务器存在且正在运行
    if (server && server.listening) {
      await new Promise(resolve => {
        server.close(() => {
          console.log('Server closed');
          resolve();
        });
      });
    }
    // 等待所有连接关闭
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('成功生成写实风格图片', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'A cute dog with brown fur',
        style: 'photo'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url');
  }, TEST_TIMEOUT);

  test('处理无效输入', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: '',
        style: 'invalid'
      });

    expect(response.status).toBe(400);
  }, TEST_TIMEOUT);

  test('处理网络错误', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'test_network_error',
        style: 'photo'
      });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Network error: Failed to connect to API'
    });
  }, TEST_TIMEOUT);

  test('处理超长提示词', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'a'.repeat(1001),
        style: 'photo'
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Prompt length must be between 3-1000 characters'
    });
  }, TEST_TIMEOUT);

  // 边界条件测试
  test('处理最小长度提示词', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'hi',
        style: 'photo'
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Prompt length must be between 3-1000 characters'
    });
  }, TEST_TIMEOUT);

  test('处理特殊字符提示词', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: '!@#$%^&*()',
        style: 'photo'
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Prompt contains invalid characters'
    });
  }, TEST_TIMEOUT);

  test('处理未定义的风格', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'A cute dog',
        style: undefined
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Style must be one of: photo, cartoon, art');
  }, TEST_TIMEOUT);

  test('处理 API 错误', async () => {
    const response = await request(app)
      .post('/api/generate')
      .send({
        prompt: 'error_trigger_test',
        style: 'photo'
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'API error');
  }, TEST_TIMEOUT);
}); 
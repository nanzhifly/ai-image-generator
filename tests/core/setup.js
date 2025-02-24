import { beforeAll, afterAll, expect, jest } from '@jest/globals';
import { app } from '../../src/app.js';
import request from 'supertest';

// 保存原始环境变量
const originalEnv = process.env;

// 测试前的设置
beforeAll(() => {
  // 设置测试环境变量
  process.env = {
    ...originalEnv,
    NODE_ENV: 'test',
    DEEPSEEK_API_KEY: 'sk-test-key'
  };
});

// 测试后的清理
afterAll(() => {
  // 恢复原始环境变量
  process.env = originalEnv;
});

export { app, request, expect, jest }; 
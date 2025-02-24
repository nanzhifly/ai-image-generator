import { API_CONFIG } from '../../src/config.js';
import dotenv from 'dotenv';

beforeAll(() => {
  dotenv.config();
});

describe('环境配置测试', () => {
  test('必要环境变量存在', () => {
    expect(process.env.DEEPSEEK_API_KEY).toBeDefined();
    expect(process.env.DEEPSEEK_API_KEY).toMatch(/^sk-/);
  });

  test('API 配置正确', () => {
    expect(API_CONFIG.BASE_URL).toBe('https://api.siliconflow.cn/v1');
    expect(API_CONFIG.TIMEOUT).toBeGreaterThan(0);
  });
}); 
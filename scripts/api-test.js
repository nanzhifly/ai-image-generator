import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { API_CONFIG } from '../src/config.js';

// 加载环境变量
dotenv.config();

// 检查环境变量
function checkEnvironment() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY 环境变量未设置');
  }
  if (!apiKey.startsWith('sk-')) {
    throw new Error('DEEPSEEK_API_KEY 格式错误，应该以 sk- 开头');
  }
  
  // 添加更多调试信息
  console.log('环境检查:');
  console.log('- API Key 格式:', apiKey.startsWith('sk-') ? '正确' : '错误');
  console.log('- API Key 长度:', apiKey.length);
  console.log('- API Key 前缀:', apiKey.substring(0, 8) + '*'.repeat(10));
  
  // 检查配置
  console.log('\n配置检查:');
  console.log('- API URL:', API_CONFIG.BASE_URL);
  console.log('- Headers:', JSON.stringify(API_CONFIG.REQUEST.HEADERS, null, 2));
}

// API 测试配置
const TEST_CONFIG = {
  API_URL: API_CONFIG.BASE_URL,
  MODELS: {
    IMAGE_GEN: 'deepseek-ai/Janus-Pro-7B'
  },
  SIZES: ['384x384'],
  TEST_PROMPTS: [
    'a dog',
    'sunset over mountains',
    'abstract art'
  ]
};

// API 可用性检查
async function checkApiAvailability() {
  try {
    // 使用 models 接口检查 API 可用性
    const response = await fetch(`${TEST_CONFIG.API_URL}/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        ...API_CONFIG.REQUEST.HEADERS
      }
    });
    console.log('API 可用性检查:', response.status);
    
    // 获取响应文本以便调试
    const responseText = await response.text();
    console.log('响应详情:', responseText);
    
    return response.ok;
  } catch (error) {
    console.error('API 检查失败:', error);
    return false;
  }
}

// 测试图片生成
async function testImageGeneration() {
  try {
    // 测试不同的提示词
    for (const prompt of TEST_CONFIG.TEST_PROMPTS) {
      console.log(`\n测试提示词: "${prompt}"`);
      
      const response = await fetch(`${TEST_CONFIG.API_URL}/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          ...API_CONFIG.REQUEST.HEADERS
        },
        body: JSON.stringify({
          model: TEST_CONFIG.MODELS.IMAGE_GEN,
          prompt,
          n: 1,
          size: TEST_CONFIG.SIZES[0],
          quality: "fast",
          num_inference_steps: 35,
          guidance_scale: 7.5
        })
      });

      const responseText = await response.text();
      console.log('响应状态:', response.status);
      console.log('响应头:', response.headers);
      console.log('响应体:', responseText);

      try {
        const data = JSON.parse(responseText);
        console.log('解析后数据:', data);
      } catch (e) {
        console.error('JSON 解析失败:', e);
      }
    }
  } catch (error) {
    console.error('生成测试失败:', error);
  }
}

// 运行测试
async function runTests() {
  console.log('开始 API 测试...\n');
  
  // 0. 环境检查
  try {
    checkEnvironment();
  } catch (error) {
    console.error('环境检查失败:', error.message);
    return;
  }
  
  // 1. API 可用性检查
  const isAvailable = await checkApiAvailability();
  if (!isAvailable) {
    console.error('API 不可用，停止测试');
    return;
  }
  
  // 2. 图片生成测试
  await testImageGeneration();
}

runTests(); 
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

// API 测试配置
const TEST_CONFIG = {
  API_URL: 'https://api.siliconflow.cn/v1',
  MODELS: {
    IMAGE_GEN: 'deepseek-api/image-gen'
  },
  SIZES: ['384x384', '512x512', '768x768'],
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
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      }
    });
    console.log('API 可用性检查:', response.status);
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
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: TEST_CONFIG.MODELS.IMAGE_GEN,
          prompt,
          n: 1,
          size: TEST_CONFIG.SIZES[0]
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
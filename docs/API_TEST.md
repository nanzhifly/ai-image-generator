# API 测试文档

## MVP 测试范围

### 核心功能测试
- 图片生成基本功能
  - 输入验证
  - API 调用
  - 结果返回

### 错误处理测试
- API 密钥验证
- 基本输入验证

### 监控测试
- 请求计数
- 错误统计

## v1.0.0 测试报告
### 功能测试结果
#### 1. 图片生成功能
- ✅ 写实风格测试通过
  - 输入：`A cute dog with brown fur`
  - 结果：成功生成写实风格图片
- ✅ 卡通风格测试通过
  - 输入：`A cute dog with brown fur`
  - 结果：成功生成卡通风格图片
- ✅ 艺术风格测试通过
  - 输入：`A cute dog with brown fur`
  - 结果：成功生成艺术风格图片

#### 2. 图片下载功能
- ✅ 下载按钮显示正常
- ✅ 文件名格式正确
- ✅ 下载功能工作正常

## 测试步骤

1. 环境准备
```bash
# 1. 配置环境变量
echo "DEEPSEEK_API_KEY=your-api-key" > .env

# 2. 安装依赖
npm install

# 3. 启动服务
npm run dev
```

## 功能测试用例

### 1. 图片生成测试
```javascript
// 测试数据
const testCases = [
  {
    prompt: "A cute dog with brown fur",
    style: "photo",
    expected: "写实风格的狗图片"
  },
  {
    prompt: "A cute dog with brown fur",
    style: "cartoon",
    expected: "卡通风格的狗图片"
  },
  {
    prompt: "A cute dog with brown fur",
    style: "art",
    expected: "艺术风格的狗图片"
  }
];
```

### 2. 错误处理测试
```javascript
// 错误测试用例
const errorCases = [
  {
    scenario: "空提示词",
    prompt: "",
    expectedError: "Prompt length must be between 3-1000 characters"
  },
  {
    scenario: "无效的风格",
    style: "invalid",
    expectedError: "Invalid style selection"
  },
  {
    scenario: "超长提示词",
    prompt: "a".repeat(1001),
    expectedError: "Prompt length must be between 3-1000 characters"
  },
  {
    scenario: "网络错误",
    prompt: "test_network_error",
    expectedError: "Network error: Failed to connect to API"
  },
  {
    scenario: "API 错误",
    prompt: "error_trigger_test",
    expectedError: "API error"
  },
  {
    scenario: "特殊字符",
    prompt: "!@#$%^&*()",
    expectedError: "Prompt contains invalid characters"
  },
  {
    scenario: "未定义风格",
    style: undefined,
    expectedError: "Style must be specified"
  }
];
```

## 测试结果记录

### 1. 功能测试
- ✅ 所有风格图片生成成功
- ✅ 图片质量符合预期
- ✅ 下载功能正常工作

### 2. 性能测试
- 响应时间：25-30s（符合预期）
- 内存使用：稳定
- CPU 使用：正常范围

### 3. 错误处理
- 输入验证正常
- 错误提示清晰
- 异常恢复正常

## 测试环境记录系统

### 每次测试需要记录
```javascript
const testRecord = {
  timestamp: new Date().toISOString(),
  environment: {
    nodeVersion: process.version,
    apiVersion: API_CONFIG.VERSION,
    apiDomain: new URL(API_CONFIG.BASE_URL).hostname
  },
  request: {
    prompt: String,
    style: String,
    headers: Object
  },
  response: {
    status: Number,
    data: Object,
    timing: Number
  },
  errors: Array
};
```

### 测试结果对比
| 测试环境 | 生产环境 | 差异分析 |
|---------|---------|---------|
| 响应时间 | 响应时间 | 分析原因 |
| 成功率   | 成功率   | 记录差异 |
| 错误类型 | 错误类型 | 总结问题 |

## 测试环境要求
- Node.js >= 14
- npm >= 6
- 正确配置的 .env 文件

## 测试执行顺序
1. 配置测试
   ```bash
   npm run test:api -- tests/api/config.test.js
   ```

2. 健康检查测试
   ```bash
   npm run test:api -- tests/api/health.test.js
   ```

3. 图片生成测试
   ```bash
   npm run test:api -- tests/api/generate.test.js
   ```

4. 性能监控测试
   ```bash
   npm run test:api -- tests/api/performance.test.js
   ```

## 性能监控指标
```javascript
const performanceThresholds = {
  responseTime: 30000,  // 最大响应时间 30s
  memoryUsage: 80,     // 最大内存使用率 80%
  cpuUsage: 70,        // 最大 CPU 使用率 70%
  errorRate: 1         // 最大错误率 1%
};
```

## 注意事项
- 每个测试文件使用独立的服务器实例
- 图片生成测试需要 120 秒超时设置
- 确保测试前环境变量正确配置
- 服务器启动和关闭需要正确处理

## 测试配置最佳实践
```javascript
// 1. 设置合理的超时时间
const TEST_TIMEOUT = 120000;

// 2. 确保服务器正确启动
beforeAll(async () => {
  jest.setTimeout(TEST_TIMEOUT);
  server = app.listen(0);
  await new Promise(resolve => setTimeout(resolve, 2000));
});

// 3. 确保服务器正确关闭
afterAll(async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  if (server && server.listening) {
    await new Promise(resolve => server.close(resolve));
  }
  await new Promise(resolve => setTimeout(resolve, 2000));
});
```

## 运行测试命令
```bash
# 串行运行所有测试（推荐）
npm run test:api

# 命令参数说明
--runInBand        # 串行执行测试
--detectOpenHandles # 检测未关闭的句柄
--testTimeout=120000 # 设置超时时间
--forceExit         # 强制退出
```

## 测试用例说明

### 错误测试标识符
- `test_network_error`: 触发网络连接错误
- `error_trigger_test`: 触发 API 错误响应

### 中间件顺序
```javascript
// 1. 错误模拟中间件先执行，处理测试用例
// 2. 输入验证中间件后执行，处理正常请求
app.post('/api/generate', 
  mockAPIError,           // 先处理测试错误
  validateGenerateInput,  // 再验证输入
  async (req, res, next) => {
    // 路由处理逻辑
  }
);
```

### 特殊字符验证规则
```javascript
// 允许以下字符：
// - 字母和数字
// - 空格
// - 基本标点 (,.!?-)
// - 下划线 (_)
// 特殊测试关键字：
// - test_network_error
// - error_trigger_test
```

### 性能测试用例
```javascript
describe('性能监控测试', () => {
  test('基础性能指标', async () => {
    // 检查响应时间、内存使用、CPU 负载等
  });

  test('并发处理能力', async () => {
    // 测试 10 个并发请求
    // 验证最大并发数和响应时间
  });
});
```

### 性能监控指标
- 响应时间阈值: 30s
- 内存使用上限: 80%
- CPU 使用上限: 70%
- 最大并发数: 10
- 最大错误率: 1%
```

## 测试类型
1. 单元测试
2. 集成测试
3. 端到端测试
4. [性能测试](./PERFORMANCE_MONITORING.md#监控指标)

## 性能测试
> 详细的性能测试指标和方法请参考 [性能监控文档](./PERFORMANCE_MONITORING.md)
```javascript
describe('性能测试', () => {
  test('响应时间测试', async () => {
    // 实现响应时间测试逻辑
  });
});
```
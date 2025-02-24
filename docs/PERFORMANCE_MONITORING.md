# 性能监控文档

> 注意：按照项目规范，本文档使用中文编写，但所有代码示例、配置项和错误信息使用英文。

## 功能概述
- 实时请求追踪
- 系统资源监控
- 性能指标统计
- 告警机制

## 快速开始
```bash
# 1. 安装依赖
npm install os node-cron

# 2. 启用性能监控
import { performanceMonitor } from './src/middleware/performanceMonitor.js';
app.use(performanceMonitor);

# 3. 查看性能指标
curl http://localhost:3000/api/metrics
```

## 监控指标

### 监控实现
```javascript
// 性能监控中间件
app.use(performanceMonitor);

// 性能指标收集类
class PerformanceMetrics {
  // 记录响应时间
  // duration: 请求处理时长（毫秒）
  recordResponseTime(duration) {
    // ...
  }
  
  // 记录错误信息
  // error: 错误对象，包含 message 属性
  recordError(error) {
    // ...
  }
  
  // 记录系统资源使用情况
  // 包括内存使用和 CPU 负载
  recordResourceUsage() {
    // ...
  }
}
```

### 基础指标
- Response Time: < 30s
- Memory Usage: < 80%
- CPU Usage: < 70%
- Error Rate: < 1%
- Concurrent Requests: ≤ 10

### 监控端点
```javascript
GET /api/metrics

Response:
{
  status: 'ok',
  data: {
    timestamp: Date,
    requestCount: Number,
    avgResponseTime: Number,
    errorRate: Number,
    memoryUsage: {
      heapUsed: Number,
      heapTotal: Number,
      rss: Number
    },
    cpuUsage: {
      load: Number
    },
    concurrentRequests: Number,
    maxConcurrentRequests: Number
  },
  thresholds: {
    responseTime: 30000,
    memoryUsage: 80,
    cpuUsage: 70,
    errorRate: 1,
    concurrentRequests: 10
  }
}
```

## 开发指南
### 添加新的监控指标
```javascript
// 1. 在 PerformanceMetrics 类中添加新指标
class PerformanceMetrics {
  // ... 现有代码 ...
  
  // 添加新的监控指标
  recordNewMetric(value) {
    this.metrics.newMetric.push({
      timestamp: new Date(),
      value: value
    });
  }
}

// 2. 在中间件中使用新指标
app.use((req, res, next) => {
  // 记录新指标
  metrics.recordNewMetric(value);
  next();
});
```

### 自定义告警规则
```javascript
// 在 alerts.js 中添加新的告警规则
function checkCustomAlert(metrics) {
  // 自定义告警逻辑
  if (condition) {
    sendAlert('Custom alert triggered');
  }
}
```

## 告警机制

### 告警实现
```javascript
// 告警配置
const alertConfig = {
  webhook: 'https://your-webhook-url',
  email: 'admin@example.com',
  thresholds: {
    responseTime: 30000,
    memoryUsage: 80,
    cpuUsage: 70,
    errorRate: 1
  }
};

// 告警检查
function checkAlerts(metrics) {
  if (metrics.avgResponseTime > alertConfig.thresholds.responseTime) {
    sendAlert('Response time exceeded threshold');
  }
  // ... 其他检查
}
```

## 告警条件与处理
### 告警阈值
| 指标 | 阈值 | 告警级别 |
|-----|------|---------|
| Response Time | > 30s | P1 |
| Memory Usage | > 80% | P1 |
| CPU Usage | > 70% | P2 |
| Error Rate | > 1% | P1 |
| Concurrent Requests | > 10 | P2 |

### 告警处理流程
1. 告警触发
   - 系统检测到指标超过阈值
   - 生成告警事件

2. 通知分发
   - Webhook 通知到相关系统
   - 邮件通知到负责人
   - 日志记录告警详情

3. 响应处理
   - P1：2小时内响应
   - P2：24小时内响应

## 数据管理
### 数据收集
```javascript
// 响应时间监控
res.on('finish', () => {
  const duration = Date.now() - start;
  metrics.recordResponseTime(duration);
});

// 系统资源监控
setInterval(() => {
  // 内存监控
  const memUsage = process.memoryUsage();
  const usagePercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
  
  // CPU 监控
  const cpuUsage = os.loadavg()[0];
  
  metrics.recordResourceUsage({ memUsage, cpuUsage });
}, 60000); // 每分钟采集一次
```

### 数据存储策略
```javascript
const storageConfig = {
  // 采样设置
  sampleRate: 0.1,           // 采样 10% 的请求
  interval: 60000,           // 每分钟采集一次系统指标
  retention: 7 * 24 * 60 * 60 * 1000,  // 保留7天数据
  
  // 清理策略
  cleanup: {
    schedule: '0 0 * * *',   // 每天凌晨执行清理
    threshold: 10000,        // 单个指标最大记录数
  }
};
```

## 监控覆盖范围
### API 监控
- `/api/generate`: 图片生成接口
- `/api/health`: 健康检查接口
- `/api/metrics`: 性能指标接口

### 系统监控
- 内存使用情况
- CPU 负载情况
- 磁盘使用情况

### 错误监控
- API 调用错误
- 系统异常
- 超时情况

## 最佳实践
### 监控配置建议
1. 根据实际负载调整告警阈值
2. 定期检查监控覆盖情况
3. 及时响应和处理告警

### 性能优化建议
1. 定期分析性能数据趋势
2. 识别潜在性能瓶颈
3. 制定针对性优化方案

## 文件结构
```
src/
├── middleware/
│   └── performanceMonitor.js  # 性能监控中间件
├── utils/
│   └── metrics.js            # 性能指标收集工具
└── services/
    └── alerts.js             # 告警服务
```

## MVP 监控范围
> 作为小型项目，我们只关注以下核心监控指标：

### 必要监控
- 基础响应时间
- 简单错误统计
- 内存使用监控

### 暂不实现
- 数据持久化存储
- 可视化监控面板
- 复杂告警系统
- 自动化运维
- 并发请求统计
- 资源使用详情
- 性能分析报告

### 为什么这样做？
1. 保持项目简单可维护
2. 专注于必要功能
3. 避免过度工程
import os from 'os';

// 简化的性能监控
class SimpleMetrics {
  constructor() {
    this.metrics = {
      requests: 0,        // 请求总数
      errors: 0,         // 错误数
      responseTime: []   // 响应时间记录
    };
  }

  reset() {
    this.metrics = {
      requests: 0,
      errors: 0,
      responseTime: []
    };
  }

  // 记录请求
  record(duration, hasError) {
    this.metrics.requests++;
    if (hasError) this.metrics.errors++;
    this.metrics.responseTime.push(duration);

    // 只保留最近100条记录
    if (this.metrics.responseTime.length > 100) {
      this.metrics.responseTime.shift();
    }
  }

  // 获取统计数据
  getStats() {
    const avgTime = this.metrics.responseTime.reduce((a, b) => a + b, 0) / this.metrics.responseTime.length;
    
    return {
      totalRequests: this.metrics.requests,
      errorCount: this.metrics.errors,
      avgResponseTime: avgTime || 0
    };
  }
}

// 创建监控实例
export const metrics = new SimpleMetrics();

// 监控中间件
export function performanceMonitor(req, res, next) {
  const start = Date.now();

  // 请求结束时记录数据
  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.record(duration, res.statusCode >= 400);
  });

  next();
} 
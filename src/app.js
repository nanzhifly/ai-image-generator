import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { performanceMonitor, metrics } from './middleware/performanceMonitor.js';
import { validateInput } from './middleware/validateInput.js';
import { validateApiKey } from './middleware/authMiddleware.js';
import { generateRouter } from './routes/generate.js';
import { APIError } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();
  
  // 中间件
  app.use(cors());
  app.use(express.json());
  app.use(express.static('public'));
  app.use(performanceMonitor);
  
  // 健康检查路由 (无需认证)
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0'
    });
  });
  
  // 性能指标端点 (无需认证)
  app.get('/api/metrics', (req, res) => {
    const stats = metrics.getStats();
    res.json({
      status: 'ok',
      data: stats
    });
  });
  
  // API 路由 (需要认证)
  app.use('/api/generate', validateApiKey, validateInput, generateRouter);
  
  // 错误处理
  app.use((req, res, next) => {
    next(new APIError('Not Found', 404));
  });
  app.use(errorHandler);
  
  return app;
} 
import { performanceMonitor } from '../../js/performance-monitor.js';

describe('Performance Monitor', () => {
    let monitor;

    beforeEach(() => {
        monitor = new PerformanceMonitor();
    });

    test('should track page load time', () => {
        monitor.trackPageLoad();
        expect(monitor.metrics.loadTime).toBeGreaterThan(0);
        
        if (monitor.metrics.loadTime > 3000) {
            expect(console.warn).toHaveBeenCalledWith('页面加载时间超过阈值:', expect.any(Number));
        }
    });

    test('should track API response time', () => {
        const startTime = Date.now() - 3000; // Simulate 3s response time
        monitor.trackApiResponse(startTime);
        
        expect(console.warn).toHaveBeenCalledWith('API响应时间超过阈值:', expect.any(Number));
    });

    test('should track memory usage', () => {
        monitor.trackMemoryUsage();
        expect(monitor.metrics.memoryUsage).toBeGreaterThan(0);
        
        if (monitor.metrics.memoryUsage > 100 * 1024 * 1024) {
            expect(console.warn).toHaveBeenCalledWith('内存使用超过阈值:', expect.any(Number));
        }
    });

    test('should report performance issues', () => {
        monitor.reportMetrics('pageLoad', 5000);
        expect(console.error).toHaveBeenCalledWith('检测到性能问题: pageLoad');
    });
}); 
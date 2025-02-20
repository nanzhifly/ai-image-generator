import { performance } from 'perf_hooks';

describe('Image Loading Performance', () => {
    test('should load images within performance budget', async () => {
        const startTime = performance.now();
        
        // 模拟图片加载
        await Promise.all([
            loadImage('test1.jpg'),
            loadImage('test2.jpg'),
            loadImage('test3.jpg')
        ]);
        
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        expect(loadTime).toBeLessThan(3000); // 3秒性能预算
    });
    
    test('should optimize memory usage', () => {
        const memoryBefore = performance.memory.usedJSHeapSize;
        
        // 加载100张图片
        for (let i = 0; i < 100; i++) {
            imageOptimizer.progressiveLoading(`test${i}.jpg`, container);
        }
        
        const memoryAfter = performance.memory.usedJSHeapSize;
        const memoryIncrease = memoryAfter - memoryBefore;
        
        expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024); // 50MB内存预算
    });
}); 
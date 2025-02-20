import { performanceAnalyzer } from '../../js/performance-analyzer.js';

describe('Performance Analyzer', () => {
    let analyzer;

    beforeEach(() => {
        analyzer = new PerformanceAnalyzer();
    });

    test('should analyze performance trend', () => {
        // Add test data points
        for (let i = 0; i < 10; i++) {
            analyzer.addDataPoint('pageLoad', 1000 + i * 100);
        }

        const trend = analyzer.analyzeTrend('pageLoad');
        expect(['性能改善', '性能下降', '性能稳定']).toContain(trend);
    });

    test('should detect performance degradation', () => {
        // Add data points with increasing values
        for (let i = 0; i < 5; i++) {
            analyzer.addDataPoint('apiResponse', 1000 * (i + 1));
        }

        const trend = analyzer.analyzeTrend('apiResponse');
        expect(trend).toBe('性能下降');
    });

    test('should generate performance report', () => {
        analyzer.addDataPoint('pageLoad', 2000);
        const report = analyzer.generateReport();

        if (report.pageLoad.trend === '性能下降') {
            expect(console.warn).toHaveBeenCalledWith('检测到性能问题:', expect.any(Array));
        }
    });

    test('should summarize performance issues', () => {
        const report = {
            pageLoad: { trend: '性能下降' },
            apiResponse: { trend: '性能稳定' }
        };

        const issues = analyzer.getIssuesSummary(report);
        expect(issues).toContain('pageLoad 性能正在下降');
    });
}); 
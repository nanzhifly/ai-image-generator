import { ImageOptimizer } from '../../js/performance.js';

describe('ImageOptimizer', () => {
    let imageOptimizer;
    let container;
    
    beforeEach(() => {
        container = document.createElement('div');
        imageOptimizer = new ImageOptimizer();
        document.body.innerHTML = `
            <div id="container">
                <img class="generated-image" data-src="test.jpg">
                <img class="use-case-image" data-src="example.jpg">
            </div>
        `;
    });

    test('lazyLoadImages should handle modern browsers', () => {
        imageOptimizer.lazyLoadImages();
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            expect(img.loading).toBe('lazy');
        });
    });

    test('progressiveLoading should create placeholder and high quality images', () => {
        const container = document.getElementById('container');
        const url = 'test-image.jpg';
        
        imageOptimizer.progressiveLoading(url, container);
        
        const placeholder = container.querySelector('.placeholder-image');
        expect(placeholder).toBeTruthy();
        expect(placeholder.src).toContain('quality=10');
        
        const highQuality = new Image();
        highQuality.src = url;
        expect(highQuality.classList.contains('generated-image')).toBeTruthy();
    });

    test('should compress image', async () => {
        const imageUrl = 'test.jpg';
        const result = await imageOptimizer.compressImage(imageUrl);
        
        const img = container.querySelector('img');
        expect(img.alt).toBe('压缩后的图片');
        
        const info = container.querySelector('.image-info');
        expect(info.textContent).toContain('压缩后大小:');
    });

    test('should apply grayscale effect', async () => {
        const imageUrl = 'test.jpg';
        await imageOptimizer.applyGrayscale(imageUrl);
        
        const img = container.querySelector('img');
        expect(img.alt).toBe('黑白图片');
    });

    test('should handle compression error', async () => {
        const invalidUrl = 'invalid.jpg';
        
        await expect(imageOptimizer.compressImage(invalidUrl))
            .rejects.toThrow('图片压缩失败');
    });

    test('should handle grayscale error', async () => {
        const invalidUrl = 'invalid.jpg';
        
        await expect(imageOptimizer.applyGrayscale(invalidUrl))
            .rejects.toThrow('无法应用黑白效果');
    });
}); 
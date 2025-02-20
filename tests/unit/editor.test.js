import { imageEditor } from '../../js/image-editor.js';

describe('ImageEditor', () => {
    let container;
    
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        imageEditor.init(container);
    });
    
    afterEach(() => {
        document.body.removeChild(container);
    });

    test('should initialize editor with controls', () => {
        const controls = container.querySelector('.editor-controls');
        expect(controls).toBeTruthy();
        expect(controls.querySelectorAll('button').length).toBe(2);
    });

    test('should apply grayscale effect', async () => {
        const testImage = 'data:image/png;base64,test-image';
        await imageEditor.loadImage(testImage);
        
        const beforeFilter = imageEditor.getEditedImage();
        imageEditor.applyGrayscale();
        const afterFilter = imageEditor.getEditedImage();
        
        expect(beforeFilter).not.toBe(afterFilter);
    });

    test('should reset image to original', async () => {
        const testImage = 'data:image/png;base64,test-image';
        await imageEditor.loadImage(testImage);
        
        const original = imageEditor.getEditedImage();
        imageEditor.applyGrayscale();
        imageEditor.reset();
        const reset = imageEditor.getEditedImage();
        
        expect(original).toBe(reset);
    });

    test('should load image correctly', async () => {
        const imageUrl = 'test.jpg';
        await imageEditor.loadImage(imageUrl);
        
        const canvas = imageEditor.canvas;
        expect(canvas.width).toBeGreaterThan(0);
        expect(canvas.height).toBeGreaterThan(0);
    });

    test('should handle load error', async () => {
        const invalidUrl = 'invalid.jpg';
        
        await expect(imageEditor.loadImage(invalidUrl))
            .rejects.toThrow('图片加载失败');
    });

    test('should apply grayscale effect', async () => {
        const imageUrl = 'test.jpg';
        await imageEditor.applyGrayscale(imageUrl);
        
        const img = container.querySelector('img');
        expect(img.alt).toBe('编辑后的图片');
    });

    test('should handle edit error', async () => {
        const invalidUrl = 'invalid.jpg';
        
        await expect(imageEditor.applyGrayscale(invalidUrl))
            .rejects.toThrow('图片处理失败');
    });

    test('should reset image', async () => {
        const imageUrl = 'test.jpg';
        await imageEditor.reset(imageUrl);
        
        expect(container.innerHTML).not.toContain('编辑后的图片');
    });
}); 
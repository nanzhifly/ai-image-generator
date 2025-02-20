import { previewManager } from '../../js/preview-manager.js';

describe('PreviewManager', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="container"></div>';
        previewManager.init(document.body);
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should show preview modal', () => {
        const testImage = 'test-image.jpg';
        previewManager.showPreview(testImage);
        
        const modal = document.querySelector('.preview-modal');
        expect(modal).toBeTruthy();
        
        const image = modal.querySelector('.preview-image');
        expect(image.src).toContain(testImage);
        expect(image.alt).toBe('预览图片');
    });

    test('should close preview on modal click', () => {
        previewManager.showPreview('test.jpg');
        const modal = document.querySelector('.preview-modal');
        
        modal.click();
        expect(document.querySelector('.preview-modal')).toBeNull();
    });

    test('should close preview on close button click', () => {
        previewManager.showPreview('test.jpg');
        const closeBtn = document.querySelector('.close-btn');
        
        closeBtn.click();
        expect(document.querySelector('.preview-modal')).toBeNull();
    });

    test('should close preview on click outside', () => {
        previewManager.showPreview('test.jpg');
        const modal = document.querySelector('.preview-modal');
        
        modal.click();
        expect(document.querySelector('.preview-modal')).toBeNull();
    });

    test('should handle image load error', () => {
        previewManager.showPreview('invalid.jpg');
        const placeholder = document.querySelector('.placeholder');
        
        expect(placeholder.textContent).toBe('图片加载失败，请重试');
    });
}); 
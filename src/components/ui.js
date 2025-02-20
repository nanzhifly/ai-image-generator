export class UI {
    constructor(services) {
        this.apiService = services.apiService;
        this.imageService = services.imageService;
        this.config = services.apiService.config;
        this.initElements();
        this.bindEvents();
    }

    initElements() {
        this.elements = {
            textarea: document.getElementById('prompt-input'),
            generateBtn: document.getElementById('generate-btn'),
            imageContainer: document.getElementById('image-container'),
            styleSelect: document.getElementById('style-select'),
            downloadBtn: document.getElementById('download-btn'),
            charCount: document.querySelector('.char-count')
        };
    }

    bindEvents() {
        this.elements.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.elements.downloadBtn.addEventListener('click', () => this.handleDownload());
        this.elements.textarea.addEventListener('input', () => this.updateCharCount());
    }

    async handleGenerate() {
        const prompt = this.elements.textarea.value.trim();
        const style = this.elements.styleSelect.value;
        
        if (!this.validateInput(prompt)) {
            this.showError('请输入有效的描述文字(1-1000字)');
            return;
        }
        
        try {
            this.showLoading();
            const imageUrl = await this.apiService.generateImage(prompt, style);
            await this.imageService.validateImage(imageUrl);
            this.displayImage(imageUrl);
        } catch (error) {
            console.error('生成失败:', error);
            this.showError(error.message || '生成失败，请重试');
        } finally {
            this.hideLoading();
        }
    }

    displayImage(url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Generated image';
        this.elements.imageContainer.innerHTML = '';
        this.elements.imageContainer.appendChild(img);
        this.elements.downloadBtn.style.display = 'block';
    }

    handleDownload() {
        const img = this.elements.imageContainer.querySelector('img');
        if (img) {
            this.imageService.downloadImage(img.src);
        }
    }

    updateCharCount() {
        const length = this.elements.textarea.value.length;
        this.elements.charCount.textContent = `${length}/1000`;
    }

    showLoading() {
        this.elements.generateBtn.disabled = true;
        this.elements.generateBtn.textContent = 'Generating...';
        const progressContainer = this.elements.imageContainer.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
    }

    hideLoading() {
        this.elements.generateBtn.disabled = false;
        this.elements.generateBtn.textContent = 'Generate Image';
        const progressContainer = this.elements.imageContainer.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.style.display = 'none';
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    validateInput(text) {
        return text && text.length > 0 && text.length <= this.config.MAX_LENGTH;
    }

    updateProgressBar(progress) {
        const progressBar = this.elements.imageContainer.querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
} 
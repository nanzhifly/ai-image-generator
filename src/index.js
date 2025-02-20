import { CONFIG } from '/src/utils/config.js';
import { ApiService } from '/src/services/api.service.js';
import { ImageService } from '/src/services/image.service.js';
import { UI } from '/src/components/ui.js';

// 初始化服务
const services = {
    apiService: new ApiService(CONFIG),
    imageService: new ImageService(CONFIG)
};

// 初始化 UI
const ui = new UI(services);

// 导出实例供全局使用
export { ui, services }; 
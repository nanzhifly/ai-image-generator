import { app } from './server.js';
import { ENV_CONFIG } from './src/config.js';
import ServerManager from './src/server/ServerManager.js';

const manager = new ServerManager(app, ENV_CONFIG);

// 启动服务器
manager
  .on('ready', (port) => {
    console.log(`✨ 服务器准备就绪，运行在端口 ${port}`);
  })
  .on('port_busy', (port) => {
    console.log(`端口 ${port} 已被占用，尝试下一个端口...`);
  })
  .on('error', (error) => {
    console.error('服务器错误:', error);
    process.exit(1);
  });

manager.start().catch(error => {
  console.error('服务器启动失败:', error);
  process.exit(1);
}); 
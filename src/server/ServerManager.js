import { EventEmitter } from 'events';

class ServerManager extends EventEmitter {
  constructor(app, config) {
    super();
    this.app = app;
    this.config = config;
    this.server = null;
    this.maxRetries = 10;
    this.retryCount = 0;
  }

  async start(initialPort = this.config.PORT || 3000) {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(initialPort)
          .once('listening', () => {
            const addr = this.server.address();
            this.emit('ready', addr.port);
            resolve(this.server);
          })
          .once('error', (err) => {
            if (err.code === 'EADDRINUSE' && this.retryCount < this.maxRetries) {
              this.emit('port_busy', initialPort);
              this.retryCount++;
              this.server.close(() => {
                this.start(initialPort + 1)
                  .then(resolve)
                  .catch(reject);
              });
            } else {
              this.emit('error', err);
              reject(err);
            }
          });
      } catch (error) {
        this.emit('error', error);
        reject(error);
      }
    });
  }

  async stop() {
    if (this.server) {
      await new Promise(resolve => this.server.close(resolve));
      this.server = null;
      this.emit('stopped');
    }
  }
}

export default ServerManager; 
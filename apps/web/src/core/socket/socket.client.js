import { io } from 'socket.io-client';
export class SocketClient {
    instance;
    constructor(options) {
        this.instance = io(options.baseUrl, {
            query: {
                token: options.token,
            },
        });
    }
    onStarted(callback) {
        this.instance.on('connect', () => {
            callback();
        });
    }
    stop() {
        this.instance.disconnect();
    }
    listen(key, callback) {
        this.instance.on(key, data => {
            callback(data);
        });
    }
}

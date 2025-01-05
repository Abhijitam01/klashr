var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { WebSocketGateway, WebSocketServer, } from '@nestjs/websockets';
import { Utility } from "../../helpers/utility";
import { Server } from 'socket.io';
let SocketServer = class SocketServer {
    server;
    clients = {};
    constructor() { }
    handleConnection(client, ...args) {
        const token = this.getClientToken(client);
        try {
            const { userId } = this.verifyTokenOrFail(token);
            this.registerClient(userId, client);
        }
        catch (_) {
            // ignore
        }
    }
    handleDisconnect(client) {
        for (const [key, value] of Object.entries(this.clients)) {
            if (value.id === client.id) {
                delete this.clients[key];
                break;
            }
        }
    }
    sendToUser(userId, key, payload) {
        const client = this.getClient(userId);
        if (client) {
            client.emit(key, payload);
        }
    }
    getClientToken(client) {
        return client.handshake.query.token;
    }
    verifyTokenOrFail(token) {
        const isUndefined = token === 'undefined' || !Utility.isDefined(token);
        if (isUndefined) {
            throw new Error(`Token is undefined`);
        }
        return { userId: token };
    }
    registerClient(userId, client) {
        if (!this.clients[userId]) {
            this.clients[userId] = client;
        }
    }
    getClient(userId) {
        return this.clients[userId];
    }
};
__decorate([
    WebSocketServer(),
    __metadata("design:type", Server)
], SocketServer.prototype, "server", void 0);
SocketServer = __decorate([
    WebSocketGateway({ cors: true }),
    __metadata("design:paramtypes", [])
], SocketServer);
export { SocketServer };

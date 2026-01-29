"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pong = void 0;
const Message_1 = require("../../Message");
class Pong extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: { noClient: true },
            text: { trailing: true }
        });
    }
}
exports.Pong = Pong;
Pong.COMMAND = 'PONG';

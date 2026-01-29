"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const Message_1 = require("../../Message");
class Ping extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true }
        });
    }
}
exports.Ping = Ping;
Ping.COMMAND = 'PING';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error402NoSuchServer = void 0;
const Message_1 = require("../../Message");
class Error402NoSuchServer extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            server: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error402NoSuchServer = Error402NoSuchServer;
Error402NoSuchServer.COMMAND = '402';

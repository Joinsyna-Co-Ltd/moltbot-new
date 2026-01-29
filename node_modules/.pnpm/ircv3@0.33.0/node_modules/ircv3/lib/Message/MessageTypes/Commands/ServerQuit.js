"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerQuit = void 0;
const Message_1 = require("../../Message");
class ServerQuit extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: {},
            reason: { trailing: true }
        });
    }
}
exports.ServerQuit = ServerQuit;
ServerQuit.COMMAND = 'SQUIT';

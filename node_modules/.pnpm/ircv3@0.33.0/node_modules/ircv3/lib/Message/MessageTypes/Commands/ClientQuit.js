"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientQuit = void 0;
const Message_1 = require("../../Message");
class ClientQuit extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true, optional: true }
        });
    }
}
exports.ClientQuit = ClientQuit;
ClientQuit.COMMAND = 'QUIT';

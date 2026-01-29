"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error451NotRegistered = void 0;
const Message_1 = require("../../Message");
class Error451NotRegistered extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error451NotRegistered = Error451NotRegistered;
Error451NotRegistered.COMMAND = '451';

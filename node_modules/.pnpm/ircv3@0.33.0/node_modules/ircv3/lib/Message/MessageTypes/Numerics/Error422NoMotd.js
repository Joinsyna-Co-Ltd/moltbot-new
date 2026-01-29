"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error422NoMotd = void 0;
const Message_1 = require("../../Message");
class Error422NoMotd extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error422NoMotd = Error422NoMotd;
Error422NoMotd.COMMAND = '422';

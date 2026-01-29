"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error403NoSuchChannel = void 0;
const Message_1 = require("../../Message");
class Error403NoSuchChannel extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error403NoSuchChannel = Error403NoSuchChannel;
Error403NoSuchChannel.COMMAND = '403';

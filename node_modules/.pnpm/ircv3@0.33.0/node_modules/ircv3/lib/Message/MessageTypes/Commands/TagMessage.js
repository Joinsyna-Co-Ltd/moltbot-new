"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagMessage = void 0;
const Message_1 = require("../../Message");
class TagMessage extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {}
        });
    }
}
exports.TagMessage = TagMessage;
TagMessage.COMMAND = 'TAGMSG';

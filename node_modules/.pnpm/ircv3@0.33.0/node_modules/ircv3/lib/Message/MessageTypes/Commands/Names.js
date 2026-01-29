"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Names = void 0;
const Message_1 = require("../../Message");
class Names extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channelList', optional: true }
        });
    }
}
exports.Names = Names;
Names.COMMAND = 'NAMES';
Names.SUPPORTS_CAPTURE = true;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error405TooManyChannels = void 0;
const Message_1 = require("../../Message");
class Error405TooManyChannels extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Error405TooManyChannels = Error405TooManyChannels;
Error405TooManyChannels.COMMAND = '405';

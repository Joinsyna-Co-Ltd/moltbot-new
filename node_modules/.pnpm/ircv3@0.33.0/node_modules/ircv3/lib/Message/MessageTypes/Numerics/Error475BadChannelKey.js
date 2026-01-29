"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error475BadChannelKey = void 0;
const Message_1 = require("../../Message");
class Error475BadChannelKey extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Error475BadChannelKey = Error475BadChannelKey;
Error475BadChannelKey.COMMAND = '475';

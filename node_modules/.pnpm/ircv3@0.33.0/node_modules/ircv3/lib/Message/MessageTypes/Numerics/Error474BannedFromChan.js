"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error474BannedFromChan = void 0;
const Message_1 = require("../../Message");
class Error474BannedFromChan extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Error474BannedFromChan = Error474BannedFromChan;
Error474BannedFromChan.COMMAND = '474';

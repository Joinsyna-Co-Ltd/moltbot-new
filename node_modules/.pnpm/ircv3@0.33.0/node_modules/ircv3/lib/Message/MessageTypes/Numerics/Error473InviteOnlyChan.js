"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error473InviteOnlyChan = void 0;
const Message_1 = require("../../Message");
class Error473InviteOnlyChan extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: { type: 'channel' },
            suffix: { trailing: true }
        });
    }
}
exports.Error473InviteOnlyChan = Error473InviteOnlyChan;
Error473InviteOnlyChan.COMMAND = '473';

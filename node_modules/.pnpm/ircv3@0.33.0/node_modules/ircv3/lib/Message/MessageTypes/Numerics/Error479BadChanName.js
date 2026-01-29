"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error479BadChanName = void 0;
const Message_1 = require("../../Message");
class Error479BadChanName extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error479BadChanName = Error479BadChanName;
Error479BadChanName.COMMAND = '479';

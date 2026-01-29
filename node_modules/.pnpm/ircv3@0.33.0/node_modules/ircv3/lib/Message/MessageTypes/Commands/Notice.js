"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notice = void 0;
const Message_1 = require("../../Message");
class Notice extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            text: { trailing: true }
        });
    }
}
exports.Notice = Notice;
Notice.COMMAND = 'NOTICE';

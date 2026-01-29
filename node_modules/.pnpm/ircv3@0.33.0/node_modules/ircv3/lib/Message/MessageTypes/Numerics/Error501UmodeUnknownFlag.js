"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error501UmodeUnknownFlag = void 0;
const Message_1 = require("../../Message");
class Error501UmodeUnknownFlag extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            modeChar: { optional: true, match: /^\w$/ },
            suffix: { trailing: true }
        });
    }
}
exports.Error501UmodeUnknownFlag = Error501UmodeUnknownFlag;
Error501UmodeUnknownFlag.COMMAND = '501';

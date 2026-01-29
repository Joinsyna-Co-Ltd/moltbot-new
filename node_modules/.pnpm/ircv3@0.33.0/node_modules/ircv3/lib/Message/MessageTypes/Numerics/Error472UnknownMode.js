"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error472UnknownMode = void 0;
const Message_1 = require("../../Message");
class Error472UnknownMode extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            char: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error472UnknownMode = Error472UnknownMode;
Error472UnknownMode.COMMAND = '472';

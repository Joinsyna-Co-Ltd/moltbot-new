"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error461NeedMoreParams = void 0;
const Message_1 = require("../../Message");
class Error461NeedMoreParams extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            originalCommand: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error461NeedMoreParams = Error461NeedMoreParams;
Error461NeedMoreParams.COMMAND = '461';

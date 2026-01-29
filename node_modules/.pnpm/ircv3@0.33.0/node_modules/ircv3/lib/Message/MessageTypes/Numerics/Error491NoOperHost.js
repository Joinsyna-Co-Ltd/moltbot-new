"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error491NoOperHost = void 0;
const Message_1 = require("../../Message");
class Error491NoOperHost extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error491NoOperHost = Error491NoOperHost;
Error491NoOperHost.COMMAND = '491';

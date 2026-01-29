"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kill = void 0;
const Message_1 = require("../../Message");
class Kill extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            reason: { trailing: true, optional: true }
        });
    }
}
exports.Kill = Kill;
Kill.COMMAND = 'KILL';

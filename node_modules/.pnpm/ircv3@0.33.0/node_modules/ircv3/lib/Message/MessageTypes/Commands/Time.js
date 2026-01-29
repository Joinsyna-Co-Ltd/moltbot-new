"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
const Message_1 = require("../../Message");
class Time extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: { optional: true }
        });
    }
}
exports.Time = Time;
Time.COMMAND = 'TIME';

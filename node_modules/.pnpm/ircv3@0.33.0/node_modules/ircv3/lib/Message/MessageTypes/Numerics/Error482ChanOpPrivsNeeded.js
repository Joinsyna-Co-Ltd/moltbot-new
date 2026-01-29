"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error482ChanOpPrivsNeeded = void 0;
const Message_1 = require("../../Message");
class Error482ChanOpPrivsNeeded extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error482ChanOpPrivsNeeded = Error482ChanOpPrivsNeeded;
Error482ChanOpPrivsNeeded.COMMAND = '482';

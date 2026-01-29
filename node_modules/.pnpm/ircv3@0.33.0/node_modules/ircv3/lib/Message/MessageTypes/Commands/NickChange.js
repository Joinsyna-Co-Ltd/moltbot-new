"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NickChange = void 0;
const Message_1 = require("../../Message");
class NickChange extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nick: {}
        });
    }
}
exports.NickChange = NickChange;
NickChange.COMMAND = 'NICK';

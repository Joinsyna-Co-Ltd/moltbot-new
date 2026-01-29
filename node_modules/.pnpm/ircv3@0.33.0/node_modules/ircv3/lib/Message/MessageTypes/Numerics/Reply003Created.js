"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply003Created = void 0;
const Message_1 = require("../../Message");
class Reply003Created extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            createdText: { trailing: true }
        });
    }
}
exports.Reply003Created = Reply003Created;
Reply003Created.COMMAND = '003';

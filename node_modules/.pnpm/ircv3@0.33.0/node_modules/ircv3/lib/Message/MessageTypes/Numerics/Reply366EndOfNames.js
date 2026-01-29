"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply366EndOfNames = void 0;
const Message_1 = require("../../Message");
const Names_1 = require("../Commands/Names");
class Reply366EndOfNames extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage instanceof Names_1.Names;
    }
    endsResponseTo() {
        return true;
    }
}
exports.Reply366EndOfNames = Reply366EndOfNames;
Reply366EndOfNames.COMMAND = '366';

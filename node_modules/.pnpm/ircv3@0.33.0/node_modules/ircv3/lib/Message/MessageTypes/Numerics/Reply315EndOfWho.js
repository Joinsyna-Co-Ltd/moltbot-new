"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply315EndOfWho = void 0;
const Message_1 = require("../../Message");
const WhoQuery_1 = require("../Commands/WhoQuery");
class Reply315EndOfWho extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            query: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage instanceof WhoQuery_1.WhoQuery;
    }
    endsResponseTo() {
        return true;
    }
}
exports.Reply315EndOfWho = Reply315EndOfWho;
Reply315EndOfWho.COMMAND = '315';

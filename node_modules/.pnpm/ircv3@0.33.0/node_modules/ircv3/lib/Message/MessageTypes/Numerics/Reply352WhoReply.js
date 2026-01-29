"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply352WhoReply = void 0;
const Message_1 = require("../../Message");
const WhoQuery_1 = require("../Commands/WhoQuery");
class Reply352WhoReply extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            user: {},
            host: {},
            server: {},
            nick: {},
            flags: {},
            hopsAndRealName: { trailing: true }
        });
    }
    /**
     * Checks whether the found user is /away.
     */
    get isAway() {
        return this.flags.includes('G');
    }
    /**
     * Checks whether the found user is an IRCOp.
     */
    get isOper() {
        return this.flags.includes('*');
    }
    /**
     * Checks whether the found user is a bot.
     */
    get isBot() {
        return this.flags.includes('B');
    }
    isResponseTo(originalMessage) {
        return originalMessage instanceof WhoQuery_1.WhoQuery;
    }
}
exports.Reply352WhoReply = Reply352WhoReply;
Reply352WhoReply.COMMAND = '352';

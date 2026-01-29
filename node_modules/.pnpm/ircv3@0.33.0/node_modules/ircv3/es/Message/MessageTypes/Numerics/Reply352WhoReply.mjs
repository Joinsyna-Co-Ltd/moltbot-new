import { Message } from "../../Message.mjs";
import { WhoQuery } from "../Commands/WhoQuery.mjs";
export class Reply352WhoReply extends Message {
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
        return originalMessage instanceof WhoQuery;
    }
}
Reply352WhoReply.COMMAND = '352';

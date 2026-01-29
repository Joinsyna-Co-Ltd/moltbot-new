import { Message } from "../../Message.mjs";
import { WhoQuery } from "../Commands/WhoQuery.mjs";
export class Reply315EndOfWho extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            query: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage instanceof WhoQuery;
    }
    endsResponseTo() {
        return true;
    }
}
Reply315EndOfWho.COMMAND = '315';

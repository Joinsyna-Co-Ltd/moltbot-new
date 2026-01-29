import { Message } from "../../Message.mjs";
import { Names } from "../Commands/Names.mjs";
export class Reply366EndOfNames extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            channel: {},
            suffix: { trailing: true }
        });
    }
    isResponseTo(originalMessage) {
        return originalMessage instanceof Names;
    }
    endsResponseTo() {
        return true;
    }
}
Reply366EndOfNames.COMMAND = '366';

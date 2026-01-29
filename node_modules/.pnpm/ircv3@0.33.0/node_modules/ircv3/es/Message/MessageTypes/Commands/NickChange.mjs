import { Message } from "../../Message.mjs";
export class NickChange extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nick: {}
        });
    }
}
NickChange.COMMAND = 'NICK';

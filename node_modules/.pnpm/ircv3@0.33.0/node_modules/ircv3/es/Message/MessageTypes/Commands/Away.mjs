import { Message } from "../../Message.mjs";
export class Away extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: {
                trailing: true,
                optional: true
            }
        });
    }
}
Away.COMMAND = 'AWAY';

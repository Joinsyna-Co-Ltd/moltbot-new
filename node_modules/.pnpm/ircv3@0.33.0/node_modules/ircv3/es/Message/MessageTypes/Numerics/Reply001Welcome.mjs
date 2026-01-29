import { Message } from "../../Message.mjs";
export class Reply001Welcome extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            welcomeText: {
                trailing: true
            }
        });
    }
}
Reply001Welcome.COMMAND = '001';

import { Message } from "../../Message.mjs";
export class Reply004ServerInfo extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            serverName: {},
            version: {},
            userModes: {},
            channelModes: {},
            channelModesWithParam: {
                optional: true
            }
        });
    }
}
Reply004ServerInfo.COMMAND = '004';

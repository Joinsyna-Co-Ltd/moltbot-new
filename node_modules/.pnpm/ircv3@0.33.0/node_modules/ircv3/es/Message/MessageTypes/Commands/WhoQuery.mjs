import { Message } from "../../Message.mjs";
export class WhoQuery extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            mask: {},
            flags: { optional: true },
            extendedMask: { optional: true, trailing: true }
        });
    }
}
WhoQuery.COMMAND = 'WHO';

import { Message } from "../../../../../Message/Message.mjs";
export class Batch extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            reference: {},
            type: { optional: true },
            additionalParams: { optional: true }
        });
    }
}
Batch.COMMAND = 'BATCH';

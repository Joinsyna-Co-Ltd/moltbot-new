"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
const Message_1 = require("../../../../../Message/Message");
class Batch extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            reference: {},
            type: { optional: true },
            additionalParams: { optional: true }
        });
    }
}
exports.Batch = Batch;
Batch.COMMAND = 'BATCH';

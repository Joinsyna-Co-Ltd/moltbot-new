"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchCapability = void 0;
const Batch_1 = require("./MessageTypes/Commands/Batch");
exports.BatchCapability = {
    name: 'batch',
    messageTypes: [Batch_1.Batch],
    usesTags: true
};

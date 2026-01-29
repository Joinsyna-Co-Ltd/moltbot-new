"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabeledResponseCapability = void 0;
const Acknowledgement_1 = require("./MessageTypes/Commands/Acknowledgement");
exports.LabeledResponseCapability = {
    name: 'labeled-response',
    messageTypes: [Acknowledgement_1.Acknowledgement],
    usesTags: true
};

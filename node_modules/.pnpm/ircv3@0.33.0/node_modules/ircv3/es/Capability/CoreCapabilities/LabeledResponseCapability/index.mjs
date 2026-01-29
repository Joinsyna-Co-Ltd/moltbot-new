import { Acknowledgement } from "./MessageTypes/Commands/Acknowledgement.mjs";
export const LabeledResponseCapability = {
    name: 'labeled-response',
    messageTypes: [Acknowledgement],
    usesTags: true
};

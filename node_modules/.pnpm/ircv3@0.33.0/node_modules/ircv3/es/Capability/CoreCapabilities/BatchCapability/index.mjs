import { Batch } from "./MessageTypes/Commands/Batch.mjs";
export const BatchCapability = {
    name: 'batch',
    messageTypes: [Batch],
    usesTags: true
};

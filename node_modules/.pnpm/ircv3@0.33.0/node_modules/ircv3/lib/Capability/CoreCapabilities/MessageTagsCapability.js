"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTagsCapability = void 0;
// dummy capability, TAGMSG is a core command due to other capabilities' implicit dependency on it
exports.MessageTagsCapability = {
    name: 'message-tags',
    usesTags: true
};

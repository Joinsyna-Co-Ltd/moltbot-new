import { ChatMessage } from './commands/ChatMessage.js';
/** @private */
export function extractMessageId(message) {
    return message instanceof ChatMessage ? message.tags.get('id') : message;
}

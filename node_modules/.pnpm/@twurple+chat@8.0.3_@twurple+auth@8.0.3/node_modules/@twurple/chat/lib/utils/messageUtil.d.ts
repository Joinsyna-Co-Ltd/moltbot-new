import { type Message } from 'ircv3';
/**
 * Parses a raw message from Twitch into a message object.
 *
 * @param rawLine The raw message line.
 */
export declare function parseTwitchMessage(rawLine: string): Message;
export declare function splitOnSpaces(text: string, maxMsgLength: number): string[];
/**
 * Extracts the text to show from a message parameter.
 *
 * @param message The message parameter to extract the text from.
 *
 * You would usually get this using `msg.params.message` on a message object.
 */
export declare function extractMessageText(message: string): string;
//# sourceMappingURL=messageUtil.d.ts.map
import { type ParsedMessageCheerPart, type ParsedMessageEmotePart, type ParsedMessagePart } from './ParsedMessagePart.js';
/**
 * Transforms the parts of the given text that are marked as emotes.
 *
 * @param text The message text.
 * @param emoteOffsets The emote offsets. An emote name maps to a list of text ranges.
 */
export declare function parseEmotePositions(text: string, emoteOffsets: Map<string, string[]>): ParsedMessageEmotePart[];
/**
 * Finds the positions of all cheermotes in the given message.
 *
 * @param text The message text.
 * @param names The names of the cheermotes to find.
 */
export declare function findCheermotePositions(text: string, names: string[]): ParsedMessageCheerPart[];
/**
 * Add text parts to the given list of message parts for all the text that's unaccounted for.
 *
 * @param text The message text.
 * @param otherPositions The parsed non-text parts of the message.
 */
export declare function fillTextPositions(text: string, otherPositions: ParsedMessagePart[]): ParsedMessagePart[];
/**
 * Parse a chat message with emotes and optionally cheermotes.
 *
 * @param text The message text.
 * @param emoteOffsets The emote offsets. An emote name maps to a list of text ranges.
 * @param cheermoteNames The names of the cheermotes to find. Will not do cheermote parsing if not given.
 */
export declare function parseChatMessage(text: string, emoteOffsets: Map<string, string[]>, cheermoteNames?: string[]): ParsedMessagePart[];
//# sourceMappingURL=messagePartParser.d.ts.map
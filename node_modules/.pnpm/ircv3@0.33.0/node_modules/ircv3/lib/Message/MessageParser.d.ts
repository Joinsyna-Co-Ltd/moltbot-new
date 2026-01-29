import { type ServerProperties } from '../ServerProperties';
import { Message, type MessageConstructor, type MessagePrefix } from './Message';
export declare function parsePrefix(raw: string): MessagePrefix;
export declare function parseTags(raw: string): Map<string, string>;
export declare function parseMessage(rawLine: string, serverProperties?: ServerProperties, knownCommands?: Map<string, MessageConstructor>, isServer?: boolean, nonConformingCommands?: string[], shouldParseParams?: boolean): Message;

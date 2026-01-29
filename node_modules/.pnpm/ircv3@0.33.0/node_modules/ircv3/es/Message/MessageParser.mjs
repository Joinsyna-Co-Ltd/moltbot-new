import { splitWithLimit } from '@d-fischer/shared-utils';
import { defaultServerProperties } from "../ServerProperties.mjs";
import { Message } from "./Message.mjs";
import { all as coreMessageTypes } from "./MessageTypes/index.mjs";
export function parsePrefix(raw) {
    const [nick, hostName] = splitWithLimit(raw, '!', 2);
    if (hostName) {
        const [user, host] = splitWithLimit(hostName, '@', 2);
        if (host) {
            return { nick, user, host };
        }
        return { nick, host: user };
    }
    return { nick };
}
const tagUnescapeMap = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ':': ';',
    n: '\n',
    r: '\r',
    s: ' '
};
export function parseTags(raw) {
    const tags = new Map();
    const tagStrings = raw.split(';');
    for (const tagString of tagStrings) {
        const [tagName, tagValue] = splitWithLimit(tagString, '=', 2);
        if (tagName === '') {
            continue; // Ignore empty tags: @ @; etc.
        }
        // unescape according to http://ircv3.net/specs/core/message-tags-3.2.html#escaping-values
        tags.set(tagName, tagValue
            ? tagValue.replace(/\\(.?)/g, (_, match) => Object.prototype.hasOwnProperty.call(tagUnescapeMap, match) ? tagUnescapeMap[match] : match)
            : '');
    }
    return tags;
}
export function parseMessage(rawLine, serverProperties = defaultServerProperties, knownCommands = coreMessageTypes, isServer = false, nonConformingCommands = [], shouldParseParams = true) {
    const splitLine = rawLine.split(' ');
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let token;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let command;
    const params = [];
    let tags = undefined;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let prefix;
    while (splitLine.length) {
        [token] = splitLine;
        if (token.startsWith('@') && !tags && !command && !prefix) {
            tags = parseTags(token.slice(1));
        }
        else if (token.startsWith(':')) {
            if (!prefix && !command) {
                if (token.length > 1) {
                    // Not an empty prefix
                    prefix = parsePrefix(token.slice(1));
                }
            }
            else {
                params.push({
                    value: splitLine.join(' ').slice(1),
                    trailing: true
                });
                break;
            }
        }
        else if (command) {
            params.push({
                value: token,
                trailing: false
            });
        }
        else {
            command = token.toUpperCase();
        }
        splitLine.shift();
    }
    tags || (tags = new Map());
    if (!command) {
        throw new Error(`line without command received: ${rawLine}`);
    }
    shouldParseParams && (shouldParseParams = !nonConformingCommands.includes(command));
    let messageClass = Message;
    if (knownCommands.has(command)) {
        messageClass = knownCommands.get(command);
    }
    return new messageClass(command, {
        params,
        tags,
        prefix,
        rawLine
    }, {
        serverProperties,
        isServer,
        shouldParseParams
    });
}

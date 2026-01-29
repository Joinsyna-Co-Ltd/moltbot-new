"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeCtcp = exports.isChannel = exports.sanitizeParameter = void 0;
const escape_string_regexp_1 = require("@d-fischer/escape-string-regexp");
const shared_utils_1 = require("@d-fischer/shared-utils");
function sanitizeParameter(param, spaceAllowed = false) {
    if (spaceAllowed) {
        return param.replace(/[\0\r\n]/g, '');
    }
    return param.replace(/[\0\r\n ]/g, '');
}
exports.sanitizeParameter = sanitizeParameter;
function isChannel(str, validTypes = '#&') {
    const re = new RegExp(`^[${(0, escape_string_regexp_1.default)(validTypes)}][^ \b\0\n\r,]+$`);
    return re.test(str);
}
exports.isChannel = isChannel;
/* eslint-disable @typescript-eslint/naming-convention */
const ctcpEscapeMap = {
    0: '\0',
    n: '\n',
    r: '\r',
    '\x10': '\x10'
};
/* eslint-enable @typescript-eslint/naming-convention */
function decodeCtcp(message) {
    if (!message.startsWith('\x01')) {
        // this is not a CTCP message
        return false;
    }
    message = message.substring(1);
    // remove trailing \x01 if present
    if (message.endsWith('\x01')) {
        message = message.slice(0, -1);
    }
    if (!message) {
        // completely empty CTCPs don't exist either, I think
        return false;
    }
    // unescape weirdly escaped stuff
    message = message.replace(/\x10(.)/, (_, escapedChar) => escapedChar in ctcpEscapeMap ? ctcpEscapeMap[escapedChar] : '');
    let [command, params = ''] = (0, shared_utils_1.splitWithLimit)(message, ' ', 2);
    command = command ? command.toUpperCase() : '';
    return { command, params };
}
exports.decodeCtcp = decodeCtcp;

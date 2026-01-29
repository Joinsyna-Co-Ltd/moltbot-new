"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.createMessage = exports.prefixToString = void 0;
const shared_utils_1 = require("@d-fischer/shared-utils");
const NotEnoughParametersError_1 = require("../Errors/NotEnoughParametersError");
const ParameterRequirementMismatchError_1 = require("../Errors/ParameterRequirementMismatchError");
const ServerProperties_1 = require("../ServerProperties");
const StringTools_1 = require("../Toolkit/StringTools");
/* eslint-disable @typescript-eslint/naming-convention */
const tagEscapeMap = {
    '\\': '\\',
    ';': ':',
    '\n': 'n',
    '\r': 'r',
    ' ': 's'
};
/* eslint-enable @typescript-eslint/naming-convention */
function escapeTag(str) {
    return str.replace(/[\\;\n\r ]/g, match => `\\${tagEscapeMap[match]}`);
}
function prefixToString(prefix) {
    let result = `${prefix.nick}`;
    if (prefix.user) {
        result += `!${prefix.user}`;
    }
    if (prefix.host) {
        result += `@${prefix.host}`;
    }
    return result;
}
exports.prefixToString = prefixToString;
function createMessage(type, params, prefix, tags, serverProperties = ServerProperties_1.defaultServerProperties, isServer = false) {
    const message = new type(type.COMMAND, undefined, { serverProperties });
    const parsedParams = {};
    if (message._paramSpec) {
        (0, shared_utils_1.forEachObjectEntry)(message._paramSpec, (paramSpec, paramName) => {
            if (isServer && paramSpec.noServer) {
                return;
            }
            if (!isServer && paramSpec.noClient) {
                return;
            }
            if (paramName in params) {
                const param = params[paramName];
                if (param !== undefined) {
                    if (type.checkParam(param, paramSpec, serverProperties)) {
                        parsedParams[paramName] = {
                            value: param,
                            trailing: Boolean(paramSpec.trailing)
                        };
                    }
                    else if (!paramSpec.optional) {
                        throw new Error(`required parameter "${paramName}" did not suit requirements: "${param}"`);
                    }
                }
            }
            if (!(paramName in parsedParams) && !paramSpec.optional) {
                throw new Error(`required parameter "${paramName}" not found in command "${type.COMMAND}"`);
            }
        });
    }
    message._parsedParams = parsedParams;
    if (message._paramSpec) {
        for (const key of Object.keys(message._paramSpec)) {
            Object.defineProperty(message, key, {
                get() {
                    var _a, _b;
                    return (_b = (_a = this._parsedParams) === null || _a === void 0 ? void 0 : _a[key]) === null || _b === void 0 ? void 0 : _b.value;
                }
            });
        }
    }
    message._initPrefixAndTags(prefix, tags);
    return message;
}
exports.createMessage = createMessage;
// eslint-disable-next-line @typescript-eslint/ban-types
class Message {
    static checkParam(param, spec, serverProperties = ServerProperties_1.defaultServerProperties) {
        if (spec.type === 'channel') {
            if (!(0, StringTools_1.isChannel)(param, serverProperties.channelTypes)) {
                return false;
            }
        }
        if (spec.type === 'channelList') {
            const channels = param.split(',');
            if (!channels.every(chan => (0, StringTools_1.isChannel)(chan, serverProperties.channelTypes))) {
                return false;
            }
        }
        if (spec.match) {
            if (!spec.match.test(param)) {
                return false;
            }
        }
        return true;
    }
    constructor(command, { params, tags, prefix, rawLine } = {}, { serverProperties = ServerProperties_1.defaultServerProperties, isServer = false, shouldParseParams = true } = {}, paramSpec) {
        this._params = [];
        this._serverProperties = ServerProperties_1.defaultServerProperties;
        this._paramSpec = paramSpec;
        this._command = command;
        this._params = params;
        this._tags = tags !== null && tags !== void 0 ? tags : new Map();
        this._prefix = prefix;
        this._serverProperties = serverProperties;
        this._raw = rawLine;
        if (shouldParseParams) {
            this.parseParams(isServer);
        }
    }
    getMinParamCount(isServer = false) {
        if (!this._paramSpec) {
            return 0;
        }
        return Object.values(this._paramSpec).filter(spec => {
            if (spec.noServer && isServer) {
                return false;
            }
            if (spec.noClient && !isServer) {
                return false;
            }
            return !spec.optional;
        }).length;
    }
    get paramCount() {
        var _a, _b;
        return (_b = (_a = this._params) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    }
    prefixToString() {
        if (!this._prefix) {
            return '';
        }
        return prefixToString(this._prefix);
    }
    tagsToString() {
        return [...this._tags.entries()].map(([key, value]) => (value ? `${key}=${escapeTag(value)}` : key)).join(';');
    }
    toString(includePrefix = false, fromRawParams = false) {
        const fullCommand = fromRawParams ? this._buildCommandFromRawParams() : this._buildCommandFromNamedParams();
        const parts = [fullCommand];
        if (includePrefix) {
            const prefix = this.prefixToString();
            if (prefix) {
                parts.unshift(`:${prefix}`);
            }
        }
        const tags = this.tagsToString();
        if (tags) {
            parts.unshift(`@${tags}`);
        }
        return parts.join(' ');
    }
    /** @private */
    _initPrefixAndTags(prefix, tags) {
        this._prefix = prefix;
        if (tags) {
            this._tags = tags;
        }
    }
    parseParams(isServer = false) {
        if (this._params) {
            let requiredParamsLeft = this.getMinParamCount(isServer);
            if (requiredParamsLeft > this._params.length) {
                throw new NotEnoughParametersError_1.NotEnoughParametersError(this._command, requiredParamsLeft, this._params.length);
            }
            const paramSpecList = this._paramSpec;
            if (!paramSpecList) {
                return;
            }
            let i = 0;
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const parsedParams = {};
            for (const [paramName, paramSpec] of Object.entries(paramSpecList)) {
                if (paramSpec.noServer && isServer) {
                    continue;
                }
                if (paramSpec.noClient && !isServer) {
                    continue;
                }
                if (this._params.length - i <= requiredParamsLeft) {
                    if (paramSpec.optional) {
                        continue;
                    }
                    else if (this._params.length - i !== requiredParamsLeft) {
                        throw new Error('not enough parameters left for required parameters parsing (this is a library bug)');
                    }
                }
                let param = this._params[i];
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!param) {
                    if (paramSpec.optional) {
                        break;
                    }
                    throw new Error('unexpected parameter underflow');
                }
                if (paramSpec.rest) {
                    const restParams = [];
                    while (this._params[i] && !this._params[i].trailing) {
                        restParams.push(this._params[i].value);
                        ++i;
                    }
                    if (!restParams.length) {
                        if (paramSpec.optional) {
                            continue;
                        }
                        throw new Error(`no parameters left for required rest parameter "${paramName}"`);
                    }
                    param = {
                        value: restParams.join(' '),
                        trailing: false
                    };
                }
                if (Message.checkParam(param.value, paramSpec)) {
                    parsedParams[paramName] = { ...param };
                    if (!paramSpec.optional) {
                        --requiredParamsLeft;
                    }
                    if (!paramSpec.rest) {
                        ++i;
                    }
                }
                else if (!paramSpec.optional) {
                    throw new ParameterRequirementMismatchError_1.ParameterRequirementMismatchError(this._command, paramName, paramSpec, param.value);
                }
                if (paramSpec.trailing) {
                    break;
                }
            }
            this._parsedParams = parsedParams;
            if (this._paramSpec) {
                for (const key of Object.keys(this._paramSpec)) {
                    Object.defineProperty(this, key, {
                        get() {
                            var _a, _b;
                            return (_b = (_a = this._parsedParams) === null || _a === void 0 ? void 0 : _a[key]) === null || _b === void 0 ? void 0 : _b.value;
                        }
                    });
                }
            }
        }
    }
    get rawParamValues() {
        var _a, _b;
        return (_b = (_a = this._params) === null || _a === void 0 ? void 0 : _a.map(param => param.value)) !== null && _b !== void 0 ? _b : [];
    }
    get prefix() {
        return this._prefix;
    }
    get command() {
        return this._command;
    }
    get tags() {
        return this._tags;
    }
    get rawLine() {
        return this._raw;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isResponseTo(originalMessage) {
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endsResponseTo(originalMessage) {
        return false;
    }
    _acceptsInReplyCollection(message) {
        // TODO implement IRCv3 labeled-response / batch here
        return message.isResponseTo(this);
    }
    _buildCommandFromNamedParams() {
        const specKeys = this._paramSpec ? Object.keys(this._paramSpec) : [];
        return [
            this._command,
            ...specKeys
                .map((paramName) => {
                var _a;
                const param = (_a = this._parsedParams) === null || _a === void 0 ? void 0 : _a[paramName];
                if (param) {
                    return (param.trailing ? ':' : '') + param.value;
                }
                return undefined;
            })
                .filter((param) => param !== undefined)
        ].join(' ');
    }
    _buildCommandFromRawParams() {
        var _a, _b;
        return [
            this._command,
            ...((_b = (_a = this._params) === null || _a === void 0 ? void 0 : _a.map(param => `${param.trailing ? ':' : ''}${param.value}`)) !== null && _b !== void 0 ? _b : [])
        ].join(' ');
    }
}
exports.Message = Message;
Message.COMMAND = '';
Message.SUPPORTS_CAPTURE = false;

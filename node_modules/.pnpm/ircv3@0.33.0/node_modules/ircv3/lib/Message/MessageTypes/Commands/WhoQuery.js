"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoQuery = void 0;
const Message_1 = require("../../Message");
class WhoQuery extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            mask: {},
            flags: { optional: true },
            extendedMask: { optional: true, trailing: true }
        });
    }
}
exports.WhoQuery = WhoQuery;
WhoQuery.COMMAND = 'WHO';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoIsQuery = void 0;
const Message_1 = require("../../Message");
class WhoIsQuery extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            server: { optional: true },
            nickMask: {}
        });
    }
}
exports.WhoIsQuery = WhoIsQuery;
WhoIsQuery.COMMAND = 'WHOIS';

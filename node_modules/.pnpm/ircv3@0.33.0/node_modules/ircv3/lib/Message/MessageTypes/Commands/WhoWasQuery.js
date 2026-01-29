"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoWasQuery = void 0;
const Message_1 = require("../../Message");
class WhoWasQuery extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nick: {},
            count: { optional: true },
            server: { optional: true }
        });
    }
}
exports.WhoWasQuery = WhoWasQuery;
WhoWasQuery.COMMAND = 'WHOWAS';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOnQuery = void 0;
const Message_1 = require("../../Message");
class IsOnQuery extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nicks: { rest: true }
        });
    }
}
exports.IsOnQuery = IsOnQuery;
IsOnQuery.COMMAND = 'ISON';

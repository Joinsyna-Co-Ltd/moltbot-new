"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHostQuery = void 0;
const Message_1 = require("../../Message");
class UserHostQuery extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            nicks: { rest: true }
        });
    }
}
exports.UserHostQuery = UserHostQuery;
UserHostQuery.COMMAND = 'USERHOST';

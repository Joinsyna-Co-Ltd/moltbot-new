"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply305UnAway = void 0;
const Message_1 = require("../../Message");
class Reply305UnAway extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Reply305UnAway = Reply305UnAway;
Reply305UnAway.COMMAND = '305';

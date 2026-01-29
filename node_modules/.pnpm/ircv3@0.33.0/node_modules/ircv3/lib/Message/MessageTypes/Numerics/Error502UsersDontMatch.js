"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error502UsersDontMatch = void 0;
const Message_1 = require("../../Message");
class Error502UsersDontMatch extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error502UsersDontMatch = Error502UsersDontMatch;
Error502UsersDontMatch.COMMAND = '502';

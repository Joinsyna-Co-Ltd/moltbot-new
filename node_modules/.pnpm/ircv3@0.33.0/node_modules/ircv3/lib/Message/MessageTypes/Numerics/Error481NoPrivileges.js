"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error481NoPrivileges = void 0;
const Message_1 = require("../../Message");
class Error481NoPrivileges extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            suffix: { trailing: true }
        });
    }
}
exports.Error481NoPrivileges = Error481NoPrivileges;
Error481NoPrivileges.COMMAND = '481';

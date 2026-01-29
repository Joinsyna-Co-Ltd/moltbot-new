"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChgHost = void 0;
const Message_1 = require("../../../../../Message/Message");
class ChgHost extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            newUser: {},
            newHost: {}
        });
    }
}
exports.ChgHost = ChgHost;
ChgHost.COMMAND = 'CHGHOST';

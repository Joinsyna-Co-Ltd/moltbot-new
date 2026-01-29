"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegistration = void 0;
const Message_1 = require("../../Message");
class UserRegistration extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            user: {},
            mode: {},
            unused: {},
            realName: { trailing: true }
        });
    }
}
exports.UserRegistration = UserRegistration;
UserRegistration.COMMAND = 'USER';

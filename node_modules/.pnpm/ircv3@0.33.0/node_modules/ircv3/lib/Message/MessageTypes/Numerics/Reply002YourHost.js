"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply002YourHost = void 0;
const Message_1 = require("../../Message");
class Reply002YourHost extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            yourHost: { trailing: true }
        });
    }
}
exports.Reply002YourHost = Reply002YourHost;
Reply002YourHost.COMMAND = '002';

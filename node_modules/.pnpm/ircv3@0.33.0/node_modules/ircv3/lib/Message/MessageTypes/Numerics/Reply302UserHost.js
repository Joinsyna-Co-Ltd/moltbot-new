"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply302UserHost = void 0;
const Message_1 = require("../../Message");
class Reply302UserHost extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            hosts: { trailing: true }
        });
    }
}
exports.Reply302UserHost = Reply302UserHost;
Reply302UserHost.COMMAND = '302';

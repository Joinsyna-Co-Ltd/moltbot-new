"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply004ServerInfo = void 0;
const Message_1 = require("../../Message");
class Reply004ServerInfo extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            serverName: {},
            version: {},
            userModes: {},
            channelModes: {},
            channelModesWithParam: {
                optional: true
            }
        });
    }
}
exports.Reply004ServerInfo = Reply004ServerInfo;
Reply004ServerInfo.COMMAND = '004';

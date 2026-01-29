"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallopsMessage = void 0;
const Message_1 = require("../../Message");
class WallopsMessage extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: { trailing: true }
        });
    }
}
exports.WallopsMessage = WallopsMessage;
WallopsMessage.COMMAND = 'WALLOPS';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Away = void 0;
const Message_1 = require("../../Message");
class Away extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            text: {
                trailing: true,
                optional: true
            }
        });
    }
}
exports.Away = Away;
Away.COMMAND = 'AWAY';

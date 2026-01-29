"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply001Welcome = void 0;
const Message_1 = require("../../Message");
class Reply001Welcome extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            me: {},
            welcomeText: {
                trailing: true
            }
        });
    }
}
exports.Reply001Welcome = Reply001Welcome;
Reply001Welcome.COMMAND = '001';

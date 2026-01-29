"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acknowledgement = void 0;
const Message_1 = require("../../../../../Message/Message");
class Acknowledgement extends Message_1.Message {
}
exports.Acknowledgement = Acknowledgement;
Acknowledgement.COMMAND = 'ACK';

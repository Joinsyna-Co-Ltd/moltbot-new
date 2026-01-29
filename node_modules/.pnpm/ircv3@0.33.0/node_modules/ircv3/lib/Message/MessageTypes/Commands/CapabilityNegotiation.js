"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CapabilityNegotiation = void 0;
const Message_1 = require("../../Message");
class CapabilityNegotiation extends Message_1.Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {
                match: /^(?:[a-z_\-\[\]\\^{}|`][a-z0-9_\-\[\]\\^{}|`]+|\*)$/i,
                optional: true,
                noClient: true
            },
            subCommand: { match: /^(?:LS|LIST|REQ|ACK|NAK|END|NEW|DEL)$/i },
            version: { match: /^\d+$/, optional: true },
            continued: { match: /^\*$/, optional: true },
            capabilities: { trailing: true, optional: true }
        });
    }
    isResponseTo(originalMessage) {
        if (!(originalMessage instanceof CapabilityNegotiation)) {
            return false;
        }
        switch (this.subCommand) {
            case 'ACK':
            case 'NAK': {
                // trim is necessary because some networks seem to add trailing spaces (looking at you, Freenode)...
                return (originalMessage.subCommand === 'REQ' && originalMessage.capabilities === this.capabilities.trim());
            }
            case 'LS':
            case 'LIST': {
                return originalMessage.subCommand === this.subCommand;
            }
            default: {
                return false;
            }
        }
    }
    endsResponseTo(originalMessage) {
        if (!(originalMessage instanceof CapabilityNegotiation)) {
            return false;
        }
        switch (this.subCommand) {
            case 'LS':
            case 'LIST': {
                return !this.continued;
            }
            default: {
                return true;
            }
        }
    }
}
exports.CapabilityNegotiation = CapabilityNegotiation;
CapabilityNegotiation.COMMAND = 'CAP';
CapabilityNegotiation.SUPPORTS_CAPTURE = true;

import { Message, type MessageInternalConfig, type MessageInternalContents } from '../../Message';
interface CapabilityNegotiationFields {
    target?: string;
    subCommand: string;
    version?: string;
    continued?: string;
    capabilities?: string;
}
export interface CapabilityNegotiation extends CapabilityNegotiationFields {
}
export declare class CapabilityNegotiation extends Message<CapabilityNegotiationFields> {
    static readonly COMMAND = "CAP";
    static readonly SUPPORTS_CAPTURE = true;
    constructor(command: string, contents?: MessageInternalContents, config?: MessageInternalConfig);
    isResponseTo(originalMessage: Message): boolean;
    endsResponseTo(originalMessage: Message): boolean;
}
export {};

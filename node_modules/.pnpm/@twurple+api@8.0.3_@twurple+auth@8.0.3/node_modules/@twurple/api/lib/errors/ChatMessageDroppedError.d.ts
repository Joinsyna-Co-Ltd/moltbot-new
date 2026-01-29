import { CustomError } from '@twurple/common';
/**
 * Thrown when a chat message is dropped and not delivered to the target channel.
 */
export declare class ChatMessageDroppedError extends CustomError {
    private readonly _code;
    constructor(broadcasterId: string, message: string | undefined, code: string | undefined);
    get code(): string | undefined;
}
//# sourceMappingURL=ChatMessageDroppedError.d.ts.map
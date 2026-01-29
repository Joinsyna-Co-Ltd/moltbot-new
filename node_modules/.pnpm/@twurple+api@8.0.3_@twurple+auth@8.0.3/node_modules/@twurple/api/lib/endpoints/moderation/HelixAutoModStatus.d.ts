import { DataObject } from '@twurple/common';
import { type HelixAutoModStatusData } from '../../interfaces/endpoints/moderation.external.js';
/**
 * The status of a message that says whether it is permitted by AutoMod or not.
 */
export declare class HelixAutoModStatus extends DataObject<HelixAutoModStatusData> {
    /**
     * The developer-generated ID that was sent with the request data.
     */
    get messageId(): string;
    /**
     * Whether the message is permitted by AutoMod or not.
     */
    get isPermitted(): boolean;
}
//# sourceMappingURL=HelixAutoModStatus.d.ts.map
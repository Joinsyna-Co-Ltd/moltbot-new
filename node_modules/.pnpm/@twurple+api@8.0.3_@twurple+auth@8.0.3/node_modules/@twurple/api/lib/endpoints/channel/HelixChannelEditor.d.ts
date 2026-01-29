import { DataObject } from '@twurple/common';
import { type HelixChannelEditorData } from '../../interfaces/endpoints/channel.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * An editor of a previously given channel.
 */
export declare class HelixChannelEditor extends DataObject<HelixChannelEditorData> {
    /**
     * The ID of the user.
     */
    get userId(): string;
    /**
     * The display name of the user.
     */
    get userDisplayName(): string;
    /**
     * Gets additional information about the user.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The date when the user was given editor status.
     */
    get creationDate(): Date;
}
//# sourceMappingURL=HelixChannelEditor.d.ts.map
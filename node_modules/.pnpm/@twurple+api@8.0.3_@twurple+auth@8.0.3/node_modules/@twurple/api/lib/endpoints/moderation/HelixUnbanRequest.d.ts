import { DataObject } from '@twurple/common';
import { type HelixUnbanRequestData } from '../../interfaces/endpoints/moderation.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A request from a user to be unbanned from a channel.
 */
export declare class HelixUnbanRequest extends DataObject<HelixUnbanRequestData> {
    /**
     * Unban request ID.
     */
    get id(): string;
    /**
     * The ID of the broadcaster whose channel is receiving the unban request.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster whose channel is receiving the unban request.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster whose channel is receiving the unban request.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets more information about the broadcaster.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The ID of the moderator who resolved the unban request.
     *
     * Can be `null` if the request is not resolved.
     */
    get moderatorId(): string | null;
    /**
     * The name of the moderator who resolved the unban request.
     *
     * Can be `null` if the request is not resolved.
     */
    get moderatorName(): string | null;
    /**
     * The display name of the moderator who resolved the unban request.
     *
     * Can be `null` if the request is not resolved.
     */
    get moderatorDisplayName(): string | null;
    /**
     * Gets more information about the moderator.
     */
    getModerator(): Promise<HelixUser>;
    /**
     * The ID of the user who requested to be unbanned.
     */
    get userId(): string;
    /**
     * The name of the user who requested to be unbanned.
     */
    get userName(): string;
    /**
     * The display name of the user who requested to be unbanned.
     */
    get userDisplayName(): string;
    /**
     * Gets more information about the user.
     */
    getUser(): Promise<HelixUser>;
    /**
     * Text message of the unban request from the requesting user.
     */
    get message(): string;
    /**
     * The date of when the unban request was created.
     */
    get creationDate(): Date;
    /**
     * The message written by the moderator who resolved the unban request, or `null` if it has not been resolved yet.
     */
    get resolutionMessage(): string | null;
    /**
     * The date when the unban request was resolved, or `null` if it has not been resolved yet.
     */
    get resolutionDate(): Date | null;
}
//# sourceMappingURL=HelixUnbanRequest.d.ts.map
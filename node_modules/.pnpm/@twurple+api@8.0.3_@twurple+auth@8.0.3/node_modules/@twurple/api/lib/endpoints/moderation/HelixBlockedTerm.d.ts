import { DataObject } from '@twurple/common';
import { type HelixBlockedTermData } from '../../interfaces/endpoints/moderation.external.js';
/**
 * Information about a word or phrase blocked in a broadcaster's channel.
 */
export declare class HelixBlockedTerm extends DataObject<HelixBlockedTermData> {
    /**
     * The ID of the broadcaster that owns the list of blocked terms.
     */
    get broadcasterId(): string;
    /**
     * The date and time of when the term was blocked.
     */
    get creationDate(): Date;
    /**
     * The date and time of when the blocked term is set to expire. After the block expires, users will be able to use the term in the broadcaster’s chat room.
     * Is `null` if the term was added manually or permanently blocked by AutoMod.
     */
    get expirationDate(): Date | null;
    /**
     * An ID that uniquely identifies this blocked term.
     */
    get id(): string;
    /**
     * The ID of the moderator that blocked the word or phrase from being used in the broadcaster’s chat room.
     */
    get moderatorId(): string;
    /**
     * The blocked word or phrase.
     */
    get text(): string;
    /**
     * The date and time of when the term was updated.
     */
    get updatedDate(): Date;
}
//# sourceMappingURL=HelixBlockedTerm.d.ts.map
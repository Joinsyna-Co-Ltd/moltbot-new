import { DataObject } from '@twurple/common';
import { type HelixClipData } from '../../interfaces/endpoints/clip.external.js';
import type { HelixGame } from '../game/HelixGame.js';
import type { HelixUser } from '../user/HelixUser.js';
import type { HelixVideo } from '../video/HelixVideo.js';
/**
 * A clip from a Twitch stream.
 */
export declare class HelixClip extends DataObject<HelixClipData> {
    /**
     * The clip ID.
     */
    get id(): string;
    /**
     * The URL of the clip.
     */
    get url(): string;
    /**
     * The embed URL of the clip.
     */
    get embedUrl(): string;
    /**
     * The user ID of the broadcaster of the stream where the clip was created.
     */
    get broadcasterId(): string;
    /**
     * The display name of the broadcaster of the stream where the clip was created.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets information about the broadcaster of the stream where the clip was created.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The user ID of the creator of the clip.
     */
    get creatorId(): string;
    /**
     * The display name of the creator of the clip.
     */
    get creatorDisplayName(): string;
    /**
     * Gets information about the creator of the clip.
     */
    getCreator(): Promise<HelixUser>;
    /**
     * The ID of the video the clip is taken from.
     */
    get videoId(): string;
    /**
     * Gets information about the video the clip is taken from.
     */
    getVideo(): Promise<HelixVideo>;
    /**
     * The ID of the game that was being played when the clip was created.
     */
    get gameId(): string;
    /**
     * Gets information about the game that was being played when the clip was created.
     */
    getGame(): Promise<HelixGame | null>;
    /**
     * The language of the stream where the clip was created.
     */
    get language(): string;
    /**
     * The title of the clip.
     */
    get title(): string;
    /**
     * The number of views of the clip.
     */
    get views(): number;
    /**
     * The date when the clip was created.
     */
    get creationDate(): Date;
    /**
     * The URL of the thumbnail of the clip.
     */
    get thumbnailUrl(): string;
    /**
     * The duration of the clip in seconds (up to 0.1 precision).
     */
    get duration(): number;
    /**
     * The offset of the clip from the start of the corresponding VOD, in seconds.
     *
     * This may be null if there is no VOD or if the clip is created from a live broadcast,
     * in which case it may take a few minutes to associate with the VOD.
     */
    get vodOffset(): number | null;
    /**
     * Whether the clip is featured.
     */
    get isFeatured(): boolean;
}
//# sourceMappingURL=HelixClip.d.ts.map
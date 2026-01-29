import { DataObject } from '@twurple/common';
import { type HelixStreamData, type HelixStreamType } from '../../interfaces/endpoints/stream.external.js';
import type { HelixGame } from '../game/HelixGame.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A Twitch stream.
 */
export declare class HelixStream extends DataObject<HelixStreamData> {
    /**
     * The stream ID.
     */
    get id(): string;
    /**
     * The user ID.
     */
    get userId(): string;
    /**
     * The user's name.
     */
    get userName(): string;
    /**
     * The user's display name.
     */
    get userDisplayName(): string;
    /**
     * Gets information about the user broadcasting the stream.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The game ID, or an empty string if the stream doesn't currently have a game.
     */
    get gameId(): string;
    /**
     * The game name, or an empty string if the stream doesn't currently have a game.
     */
    get gameName(): string;
    /**
     * Gets information about the game that is being played on the stream.
     *
     * Returns null if the stream doesn't currently have a game.
     */
    getGame(): Promise<HelixGame | null>;
    /**
     * The type of the stream.
     */
    get type(): HelixStreamType;
    /**
     * The title of the stream.
     */
    get title(): string;
    /**
     * The number of viewers the stream currently has.
     */
    get viewers(): number;
    /**
     * The time when the stream started.
     */
    get startDate(): Date;
    /**
     * The language of the stream.
     */
    get language(): string;
    /**
     * The URL of the thumbnail of the stream.
     *
     * This URL includes the placeholders `{width}` and `{height}`
     * which you must replace with the desired dimensions of the thumbnail (in pixels).
     *
     * You can also use {@link HelixStream#getThumbnailUrl} to do this replacement.
     */
    get thumbnailUrl(): string;
    /**
     * Builds the thumbnail URL of the stream using the given dimensions.
     *
     * @param width The width of the thumbnail.
     * @param height The height of the thumbnail.
     */
    getThumbnailUrl(width: number, height: number): string;
    /**
     * The tags applied to the stream.
     */
    get tags(): string[];
    /**
     * Whether the stream is set to be targeted to mature audiences only.
     */
    get isMature(): boolean;
}
//# sourceMappingURL=HelixStream.d.ts.map
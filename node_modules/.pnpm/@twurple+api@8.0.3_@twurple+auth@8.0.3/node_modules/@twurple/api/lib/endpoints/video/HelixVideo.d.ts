import { DataObject } from '@twurple/common';
import { type HelixVideoData, type HelixVideoMutedSegmentData, type HelixVideoType } from '../../interfaces/endpoints/video.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A video on Twitch.
 */
export declare class HelixVideo extends DataObject<HelixVideoData> {
    /**
     * The ID of the video.
     */
    get id(): string;
    /**
     * The ID of the user who created the video.
     */
    get userId(): string;
    /**
     * The name of the user who created the video.
     */
    get userName(): string;
    /**
     * The display name of the user who created the video.
     */
    get userDisplayName(): string;
    /**
     * Gets information about the user who created the video.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The title of the video.
     */
    get title(): string;
    /**
     * The description of the video.
     */
    get description(): string;
    /**
     * The date when the video was created.
     */
    get creationDate(): Date;
    /**
     * The date when the video was published.
     */
    get publishDate(): Date;
    /**
     * The URL of the video.
     */
    get url(): string;
    /**
     * The URL of the thumbnail of the video.
     */
    get thumbnailUrl(): string;
    /**
     * Builds the thumbnail URL of the video using the given dimensions.
     *
     * @param width The width of the thumbnail.
     * @param height The height of the thumbnail.
     */
    getThumbnailUrl(width: number, height: number): string;
    /**
     * Whether the video is public or not.
     */
    get isPublic(): boolean;
    /**
     * The number of views of the video.
     */
    get views(): number;
    /**
     * The language of the video.
     */
    get language(): string;
    /**
     * The type of the video.
     */
    get type(): HelixVideoType;
    /**
     * The duration of the video, as formatted by Twitch.
     */
    get duration(): string;
    /**
     * The duration of the video, in seconds.
     */
    get durationInSeconds(): number;
    /**
     * The ID of the stream this video belongs to.
     *
     * Returns null if the video is not an archived stream.
     */
    get streamId(): string | null;
    /**
     * The raw data of muted segments of the video.
     */
    get mutedSegmentData(): HelixVideoMutedSegmentData[];
    /**
     * Checks whether the video is muted at a given offset or range.
     *
     * @param offset The start of your range, in seconds from the start of the video,
     * or if no duration is given, the exact offset that is checked.
     * @param duration The duration of your range, in seconds.
     * @param partial Whether the range check is only partial.
     *
     * By default, this function returns true only if the passed range is entirely contained in a muted segment.
     */
    isMutedAt(offset: number, duration?: number, partial?: boolean): boolean;
}
//# sourceMappingURL=HelixVideo.d.ts.map
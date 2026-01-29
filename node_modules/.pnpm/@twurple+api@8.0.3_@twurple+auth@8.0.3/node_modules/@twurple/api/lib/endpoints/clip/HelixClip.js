import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A clip from a Twitch stream.
 */
let HelixClip = class HelixClip extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The clip ID.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The URL of the clip.
     */
    get url() {
        return this[rawDataSymbol].url;
    }
    /**
     * The embed URL of the clip.
     */
    get embedUrl() {
        return this[rawDataSymbol].embed_url;
    }
    /**
     * The user ID of the broadcaster of the stream where the clip was created.
     */
    get broadcasterId() {
        return this[rawDataSymbol].broadcaster_id;
    }
    /**
     * The display name of the broadcaster of the stream where the clip was created.
     */
    get broadcasterDisplayName() {
        return this[rawDataSymbol].broadcaster_name;
    }
    /**
     * Gets information about the broadcaster of the stream where the clip was created.
     */
    async getBroadcaster() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].broadcaster_id));
    }
    /**
     * The user ID of the creator of the clip.
     */
    get creatorId() {
        return this[rawDataSymbol].creator_id;
    }
    /**
     * The display name of the creator of the clip.
     */
    get creatorDisplayName() {
        return this[rawDataSymbol].creator_name;
    }
    /**
     * Gets information about the creator of the clip.
     */
    async getCreator() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].creator_id));
    }
    /**
     * The ID of the video the clip is taken from.
     */
    get videoId() {
        return this[rawDataSymbol].video_id;
    }
    /**
     * Gets information about the video the clip is taken from.
     */
    async getVideo() {
        return checkRelationAssertion(await this._client.videos.getVideoById(this[rawDataSymbol].video_id));
    }
    /**
     * The ID of the game that was being played when the clip was created.
     */
    get gameId() {
        return this[rawDataSymbol].game_id;
    }
    /**
     * Gets information about the game that was being played when the clip was created.
     */
    async getGame() {
        return this[rawDataSymbol].game_id
            ? checkRelationAssertion(await this._client.games.getGameById(this[rawDataSymbol].game_id))
            : null;
    }
    /**
     * The language of the stream where the clip was created.
     */
    get language() {
        return this[rawDataSymbol].language;
    }
    /**
     * The title of the clip.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The number of views of the clip.
     */
    get views() {
        return this[rawDataSymbol].view_count;
    }
    /**
     * The date when the clip was created.
     */
    get creationDate() {
        return new Date(this[rawDataSymbol].created_at);
    }
    /**
     * The URL of the thumbnail of the clip.
     */
    get thumbnailUrl() {
        return this[rawDataSymbol].thumbnail_url;
    }
    /**
     * The duration of the clip in seconds (up to 0.1 precision).
     */
    get duration() {
        return this[rawDataSymbol].duration;
    }
    /**
     * The offset of the clip from the start of the corresponding VOD, in seconds.
     *
     * This may be null if there is no VOD or if the clip is created from a live broadcast,
     * in which case it may take a few minutes to associate with the VOD.
     */
    get vodOffset() {
        return this[rawDataSymbol].vod_offset;
    }
    /**
     * Whether the clip is featured.
     */
    get isFeatured() {
        return this[rawDataSymbol].is_featured;
    }
};
__decorate([
    Enumerable(false)
], HelixClip.prototype, "_client", void 0);
HelixClip = __decorate([
    rtfm('api', 'HelixClip', 'id')
], HelixClip);
export { HelixClip };

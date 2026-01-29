import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { checkRelationAssertion, DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A Twitch stream.
 */
let HelixStream = class HelixStream extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The stream ID.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The user ID.
     */
    get userId() {
        return this[rawDataSymbol].user_id;
    }
    /**
     * The user's name.
     */
    get userName() {
        return this[rawDataSymbol].user_login;
    }
    /**
     * The user's display name.
     */
    get userDisplayName() {
        return this[rawDataSymbol].user_name;
    }
    /**
     * Gets information about the user broadcasting the stream.
     */
    async getUser() {
        return checkRelationAssertion(await this._client.users.getUserById(this[rawDataSymbol].user_id));
    }
    /**
     * The game ID, or an empty string if the stream doesn't currently have a game.
     */
    get gameId() {
        return this[rawDataSymbol].game_id;
    }
    /**
     * The game name, or an empty string if the stream doesn't currently have a game.
     */
    get gameName() {
        return this[rawDataSymbol].game_name;
    }
    /**
     * Gets information about the game that is being played on the stream.
     *
     * Returns null if the stream doesn't currently have a game.
     */
    async getGame() {
        return this[rawDataSymbol].game_id
            ? checkRelationAssertion(await this._client.games.getGameById(this[rawDataSymbol].game_id))
            : null;
    }
    /**
     * The type of the stream.
     */
    get type() {
        return this[rawDataSymbol].type;
    }
    /**
     * The title of the stream.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The number of viewers the stream currently has.
     */
    get viewers() {
        return this[rawDataSymbol].viewer_count;
    }
    /**
     * The time when the stream started.
     */
    get startDate() {
        return new Date(this[rawDataSymbol].started_at);
    }
    /**
     * The language of the stream.
     */
    get language() {
        return this[rawDataSymbol].language;
    }
    /**
     * The URL of the thumbnail of the stream.
     *
     * This URL includes the placeholders `{width}` and `{height}`
     * which you must replace with the desired dimensions of the thumbnail (in pixels).
     *
     * You can also use {@link HelixStream#getThumbnailUrl} to do this replacement.
     */
    get thumbnailUrl() {
        return this[rawDataSymbol].thumbnail_url;
    }
    /**
     * Builds the thumbnail URL of the stream using the given dimensions.
     *
     * @param width The width of the thumbnail.
     * @param height The height of the thumbnail.
     */
    getThumbnailUrl(width, height) {
        return this[rawDataSymbol].thumbnail_url
            .replace('{width}', width.toString())
            .replace('{height}', height.toString());
    }
    /**
     * The tags applied to the stream.
     */
    get tags() {
        return this[rawDataSymbol].tags;
    }
    /**
     * Whether the stream is set to be targeted to mature audiences only.
     */
    get isMature() {
        return this[rawDataSymbol].is_mature;
    }
};
__decorate([
    Enumerable(false)
], HelixStream.prototype, "_client", void 0);
HelixStream = __decorate([
    rtfm('api', 'HelixStream', 'id')
], HelixStream);
export { HelixStream };

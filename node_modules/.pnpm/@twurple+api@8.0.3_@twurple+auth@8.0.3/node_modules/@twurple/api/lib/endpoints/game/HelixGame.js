import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * A game as displayed on Twitch.
 */
let HelixGame = class HelixGame extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the game.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The name of the game.
     */
    get name() {
        return this[rawDataSymbol].name;
    }
    /**
     * The URL of the box art of the game.
     */
    get boxArtUrl() {
        return this[rawDataSymbol].box_art_url;
    }
    /**
     * The IGDB ID of the game, or null if the game doesn't have an IGDB ID assigned at Twitch.
     */
    get igdbId() {
        return this[rawDataSymbol].igdb_id || null;
    }
    /**
     * Builds the URL of the box art of the game using the given dimensions.
     *
     * @param width The width of the box art.
     * @param height The height of the box art.
     */
    getBoxArtUrl(width, height) {
        return this[rawDataSymbol].box_art_url
            .replace('{width}', width.toString())
            .replace('{height}', height.toString());
    }
    /**
     * Gets streams that are currently playing the game.
     *
     * @param pagination
     * @expandParams
     */
    async getStreams(pagination) {
        return await this._client.streams.getStreams({ ...pagination, game: this[rawDataSymbol].id });
    }
    /**
     * Creates a paginator for streams that are currently playing the game.
     */
    getStreamsPaginated() {
        return this._client.streams.getStreamsPaginated({ game: this[rawDataSymbol].id });
    }
};
__decorate([
    Enumerable(false)
], HelixGame.prototype, "_client", void 0);
HelixGame = __decorate([
    rtfm('api', 'HelixGame', 'id')
], HelixGame);
export { HelixGame };

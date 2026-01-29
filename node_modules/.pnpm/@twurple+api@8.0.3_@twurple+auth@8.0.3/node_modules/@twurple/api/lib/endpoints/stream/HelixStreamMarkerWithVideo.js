import { __decorate } from "tslib";
import { checkRelationAssertion, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixStreamMarker } from './HelixStreamMarker.js';
/**
 * A stream marker, also containing some video data.
 *
 * @inheritDoc
 */
let HelixStreamMarkerWithVideo = class HelixStreamMarkerWithVideo extends HelixStreamMarker {
    _videoId;
    /** @internal */
    constructor(data, _videoId, client) {
        super(data, client);
        this._videoId = _videoId;
    }
    /**
     * The URL of the video, which will start playing at the position of the stream marker.
     */
    get url() {
        return this[rawDataSymbol].URL;
    }
    /**
     * The ID of the video.
     */
    get videoId() {
        return this._videoId;
    }
    /**
     * Gets the video data of the video the marker was set in.
     */
    async getVideo() {
        return checkRelationAssertion(await this._client.videos.getVideoById(this._videoId));
    }
};
HelixStreamMarkerWithVideo = __decorate([
    rtfm('api', 'HelixStreamMarkerWithVideo', 'id')
], HelixStreamMarkerWithVideo);
export { HelixStreamMarkerWithVideo };

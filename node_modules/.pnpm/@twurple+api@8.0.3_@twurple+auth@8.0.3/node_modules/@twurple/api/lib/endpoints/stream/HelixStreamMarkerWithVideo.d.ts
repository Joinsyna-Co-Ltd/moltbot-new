import type { HelixVideo } from '../video/HelixVideo.js';
import { HelixStreamMarker } from './HelixStreamMarker.js';
/**
 * A stream marker, also containing some video data.
 *
 * @inheritDoc
 */
export declare class HelixStreamMarkerWithVideo extends HelixStreamMarker {
    private readonly _videoId;
    /**
     * The URL of the video, which will start playing at the position of the stream marker.
     */
    get url(): string;
    /**
     * The ID of the video.
     */
    get videoId(): string;
    /**
     * Gets the video data of the video the marker was set in.
     */
    getVideo(): Promise<HelixVideo>;
}
//# sourceMappingURL=HelixStreamMarkerWithVideo.d.ts.map
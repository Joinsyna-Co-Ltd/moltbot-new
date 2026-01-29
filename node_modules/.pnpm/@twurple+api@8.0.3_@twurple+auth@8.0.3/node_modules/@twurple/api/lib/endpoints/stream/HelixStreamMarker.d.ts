import { DataObject } from '@twurple/common';
import { type HelixStreamMarkerData } from '../../interfaces/endpoints/stream.external.js';
/**
 * A stream marker.
 */
export declare class HelixStreamMarker extends DataObject<HelixStreamMarkerData> {
    /**
     * The ID of the marker.
     */
    get id(): string;
    /**
     * The date and time when the marker was created.
     */
    get creationDate(): Date;
    /**
     * The description of the marker.
     */
    get description(): string;
    /**
     * The position in the stream when the marker was created, in seconds.
     */
    get positionInSeconds(): number;
}
//# sourceMappingURL=HelixStreamMarker.d.ts.map
import { DataObject } from '@twurple/common';
import { type HelixContentClassificationLabelData } from '../../interfaces/endpoints/contentClassificationLabels.external.js';
/**
 * A content classification label that can be applied to a Twitch stream.
 */
export declare class HelixContentClassificationLabel extends DataObject<HelixContentClassificationLabelData> {
    /**
     * The ID of the content classification label.
     */
    get id(): string;
    /**
     * The name of the content classification label.
     */
    get name(): string;
    /**
     * The description of the content classification label.
     */
    get description(): string;
}
//# sourceMappingURL=HelixContentClassificationLabel.d.ts.map
import { DataObject, rawDataSymbol } from '@twurple/common';
/**
 * A content classification label that can be applied to a Twitch stream.
 */
export class HelixContentClassificationLabel extends DataObject {
    /**
     * The ID of the content classification label.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The name of the content classification label.
     */
    get name() {
        return this[rawDataSymbol].name;
    }
    /**
     * The description of the content classification label.
     */
    get description() {
        return this[rawDataSymbol].description;
    }
}

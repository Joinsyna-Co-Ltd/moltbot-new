import { DataObject } from '@twurple/common';
import { type HelixBaseExtensionData } from '../../../interfaces/endpoints/userExtension.external.js';
/** @protected */
export declare abstract class HelixBaseExtension extends DataObject<HelixBaseExtensionData> {
    /**
     * The ID of the extension.
     */
    get id(): string;
    /**
     * The version of the extension.
     */
    get version(): string;
    /**
     * The name of the extension.
     */
    get name(): string;
}
//# sourceMappingURL=HelixBaseExtension.d.ts.map
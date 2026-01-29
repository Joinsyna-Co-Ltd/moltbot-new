import { type HelixExtensionSlotType } from '../../../interfaces/endpoints/userExtension.external.js';
import { HelixBaseExtension } from './HelixBaseExtension.js';
/**
 * A Twitch Extension that is installed in a slot of a channel.
 *
 * @inheritDoc
 */
export declare class HelixInstalledExtension extends HelixBaseExtension {
    private readonly _slotType;
    private readonly _slotId;
    /**
     * The type of the slot the extension is in.
     */
    get slotType(): HelixExtensionSlotType;
    /**
     * The ID of the slot the extension is in.
     */
    get slotId(): string;
}
//# sourceMappingURL=HelixInstalledExtension.d.ts.map
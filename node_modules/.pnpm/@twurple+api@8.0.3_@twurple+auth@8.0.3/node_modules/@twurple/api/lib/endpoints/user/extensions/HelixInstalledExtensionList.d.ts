import { DataObject } from '@twurple/common';
import { type HelixExtensionSlotType, type HelixInstalledExtensionListData } from '../../../interfaces/endpoints/userExtension.external.js';
import { HelixInstalledExtension } from './HelixInstalledExtension.js';
/**
 * A list of extensions installed in a channel.
 */
export declare class HelixInstalledExtensionList extends DataObject<HelixInstalledExtensionListData> {
    getExtensionAtSlot(type: 'panel', slotId: '1' | '2' | '3'): HelixInstalledExtension | null;
    getExtensionAtSlot(type: 'overlay', slotId: '1'): HelixInstalledExtension | null;
    getExtensionAtSlot(type: 'component', slotId: '1' | '2'): HelixInstalledExtension | null;
    getExtensionsForSlotType(type: HelixExtensionSlotType): HelixInstalledExtension[];
    getAllExtensions(): HelixInstalledExtension[];
}
//# sourceMappingURL=HelixInstalledExtensionList.d.ts.map
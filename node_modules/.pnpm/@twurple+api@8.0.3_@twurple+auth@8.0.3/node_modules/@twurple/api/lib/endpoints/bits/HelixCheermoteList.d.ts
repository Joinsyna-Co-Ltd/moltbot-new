import { DataObject } from '@twurple/common';
import { type HelixCheermoteData } from '../../interfaces/endpoints/bits.external.js';
import { type CheermoteDisplayInfo, type CheermoteFormat } from './CheermoteDisplayInfo.js';
/**
 * A list of cheermotes you can use globally or in a specific channel, depending on how you fetched the list.
 *
 * @inheritDoc
 */
export declare class HelixCheermoteList extends DataObject<Record<string, HelixCheermoteData>> {
    /**
     * Gets the URL and color needed to properly represent a cheer of the given amount of bits with the given prefix.
     *
     * @param name The name/prefix of the cheermote.
     * @param bits The amount of bits cheered.
     * @param format The format of the cheermote you want to request.
     */
    getCheermoteDisplayInfo(name: string, bits: number, format: CheermoteFormat): CheermoteDisplayInfo;
    /**
     * Gets all possible cheermote names.
     */
    getPossibleNames(): string[];
}
//# sourceMappingURL=HelixCheermoteList.d.ts.map
import { klona } from 'klona';
/** @private */
export const rawDataSymbol = Symbol('twurpleRawData');
/**
 * Gets the raw data of a data object.
 *
 * @param obj The data object to get the raw data of.
 */
export function getRawData(obj) {
    return klona(obj[rawDataSymbol]);
}
/** @private */
export class DataObject {
    /** @private */ [rawDataSymbol];
    /** @private */
    constructor(data) {
        this[rawDataSymbol] = data;
    }
}

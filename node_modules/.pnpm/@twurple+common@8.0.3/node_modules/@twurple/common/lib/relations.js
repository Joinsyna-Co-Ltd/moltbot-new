import { RelationAssertionError } from './errors/RelationAssertionError.js';
/** @private */
export function checkRelationAssertion(value) {
    if (value == null) {
        throw new RelationAssertionError();
    }
    return value;
}

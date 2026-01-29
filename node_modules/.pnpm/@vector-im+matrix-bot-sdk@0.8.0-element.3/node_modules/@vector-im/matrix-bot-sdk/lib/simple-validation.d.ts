/**
 * Validate the 'order' parameter of a child space entry. It must be a
 * string between the range of \x20 - \x7F and contain no more than 50
 * characters.
 * @param {string} order The 'order' parameter of a m.space.child
 * @throws {Error} If the string is not valid
 * @returns {boolean} True if the string is valid
 * @category Utilities
 */
export declare function validateSpaceOrderString(order: string): true;

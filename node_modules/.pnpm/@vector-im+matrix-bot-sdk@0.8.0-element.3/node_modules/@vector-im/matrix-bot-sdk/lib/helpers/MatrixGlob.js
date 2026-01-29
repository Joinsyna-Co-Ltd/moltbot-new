"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixGlob = void 0;
const globToRegexp = require("glob-to-regexp");
/**
 * Represents a common Matrix glob. This is commonly used
 * for server ACLs and similar functions.
 * @category Utilities
 */
class MatrixGlob {
    /**
     * The regular expression which represents this glob.
     */
    regex;
    /**
     * Creates a new Matrix Glob
     * @param {string} glob The glob to convert. Eg: "*.example.org"
     */
    constructor(glob) {
        const globRegex = globToRegexp(glob, {
            extended: false,
            globstar: false,
        });
        // We need to convert `?` manually because globToRegexp's extended mode
        // does more than we want it to.
        const replaced = globRegex.toString().replace(/\\\?/g, ".");
        this.regex = new RegExp(replaced.substring(1, replaced.length - 1));
    }
    /**
     * Tests the glob against a value, returning true if it matches.
     * @param {string} val The value to test.
     * @returns {boolean} True if the value matches the glob, false otherwise.
     */
    test(val) {
        return this.regex.test(val);
    }
}
exports.MatrixGlob = MatrixGlob;
//# sourceMappingURL=MatrixGlob.js.map
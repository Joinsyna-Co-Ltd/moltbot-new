"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseWithResolvers = void 0;
function promiseWithResolvers() {
    // eslint-disable-next-line @typescript-eslint/init-declarations
    var resolve;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    var reject;
    var promise = new Promise(function (_resolve, _reject) {
        resolve = _resolve;
        reject = _reject;
    });
    return { promise: promise, resolve: resolve, reject: reject };
}
exports.promiseWithResolvers = promiseWithResolvers;

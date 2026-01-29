"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timedMatrixClientFunctionCall = timedMatrixClientFunctionCall;
exports.timedIdentityClientFunctionCall = timedIdentityClientFunctionCall;
exports.timedIntentFunctionCall = timedIntentFunctionCall;
const names_1 = require("./names");
/**
 * Times a MatrixClient function call for metrics.
 * @category Metrics
 */
function timedMatrixClientFunctionCall() {
    return function (_target, functionName, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const context = this.metrics.assignUniqueContextId({
                functionName,
                client: this,
            });
            this.metrics.start(names_1.METRIC_MATRIX_CLIENT_FUNCTION_CALL, context);
            try {
                const result = await originalMethod.apply(this, args);
                this.metrics.increment(names_1.METRIC_MATRIX_CLIENT_SUCCESSFUL_FUNCTION_CALL, context, 1);
                return result;
            }
            catch (e) {
                this.metrics.increment(names_1.METRIC_MATRIX_CLIENT_FAILED_FUNCTION_CALL, context, 1);
                throw e;
            }
            finally {
                this.metrics.end(names_1.METRIC_MATRIX_CLIENT_FUNCTION_CALL, context);
            }
        };
    };
}
/**
 * Times an IdentityClient function call for metrics.
 * @category Metrics
 */
function timedIdentityClientFunctionCall() {
    return function (_target, functionName, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const context = this.metrics.assignUniqueContextId({
                functionName,
                client: this,
            });
            this.metrics.start(names_1.METRIC_IDENTITY_CLIENT_FUNCTION_CALL, context);
            try {
                const result = await originalMethod.apply(this, args);
                this.metrics.increment(names_1.METRIC_IDENTITY_CLIENT_SUCCESSFUL_FUNCTION_CALL, context, 1);
                return result;
            }
            catch (e) {
                this.metrics.increment(names_1.METRIC_IDENTITY_CLIENT_FAILED_FUNCTION_CALL, context, 1);
                throw e;
            }
            finally {
                this.metrics.end(names_1.METRIC_IDENTITY_CLIENT_FUNCTION_CALL, context);
            }
        };
    };
}
/**
 * Times an Intent function call for metrics.
 * @category Metrics
 */
function timedIntentFunctionCall() {
    return function (_target, functionName, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const context = this.metrics.assignUniqueContextId({
                functionName,
                client: this.client,
                intent: this,
            });
            this.metrics.start(names_1.METRIC_INTENT_FUNCTION_CALL, context);
            try {
                const result = await originalMethod.apply(this, args);
                this.metrics.increment(names_1.METRIC_INTENT_SUCCESSFUL_FUNCTION_CALL, context, 1);
                return result;
            }
            catch (e) {
                this.metrics.increment(names_1.METRIC_INTENT_FAILED_FUNCTION_CALL, context, 1);
                throw e;
            }
            finally {
                this.metrics.end(names_1.METRIC_INTENT_FUNCTION_CALL, context);
            }
        };
    };
}
//# sourceMappingURL=decorators.js.map
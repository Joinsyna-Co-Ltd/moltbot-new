"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metrics = void 0;
const __1 = require("..");
/**
 * Tracks metrics.
 * @category Metrics
 */
class Metrics {
    listeners = [];
    requestStartTimes = {};
    uid = 0;
    /**
     * Creates a new Metrics handler with optional parent handler. When
     * a parent handler is defined, metrics will be automatically published
     * upwards to the parent.
     * @param {Metrics} parent Optional parent for upstream metrics.
     */
    constructor(parent = null) {
        if (parent !== null) {
            this.registerListener({
                onIncrement(metricName, context, amount) {
                    parent.listeners.forEach(h => h.onIncrement(metricName, context, amount));
                },
                onDecrement(metricName, context, amount) {
                    parent.listeners.forEach(h => h.onDecrement(metricName, context, amount));
                },
                onReset(metricName, context) {
                    parent.listeners.forEach(h => h.onReset(metricName, context));
                },
                onStartMetric(metricName, context) {
                    parent.listeners.forEach(h => h.onStartMetric(metricName, context));
                },
                onEndMetric(metricName, context, timeMs) {
                    parent.listeners.forEach(h => h.onEndMetric(metricName, context, timeMs));
                },
            });
        }
    }
    /**
     * Registers a metric listener.
     * @param {IMetricListener} listener The listener.
     */
    registerListener(listener) {
        this.listeners.push(listener);
    }
    /**
     * De-registers a metric listener.
     * @param {IMetricListener} listener The listener.
     */
    unregisterListener(listener) {
        const idx = this.listeners.indexOf(listener);
        if (idx !== -1)
            this.listeners.splice(idx, 1);
    }
    /**
     * Starts a timer on a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     */
    start(metricName, context) {
        this.requestStartTimes[context.uniqueId] = new Date().getTime();
        this.listeners.forEach(h => h.onStartMetric(metricName, context));
    }
    /**
     * Ends a timer on a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     */
    end(metricName, context) {
        const timeMs = (new Date().getTime()) - this.requestStartTimes[context.uniqueId];
        delete this.requestStartTimes[context.uniqueId];
        this.listeners.forEach(h => h.onEndMetric(metricName, context, timeMs));
        // Trim the context for logging
        const trimmedContext = {};
        for (const key of Object.keys(context)) {
            if (key === 'client') {
                const client = context[key];
                trimmedContext[key] = `<MatrixClient ${client['userId'] || 'NoCachedUserID'}>`;
            }
            else if (key === 'intent') {
                const intent = context[key];
                trimmedContext[key] = `<Intent ${intent['userId'] || 'NoImpersonatedUserID'}>`;
            }
            else {
                trimmedContext[key] = context[key];
            }
        }
        __1.LogService.trace("Metrics", metricName, trimmedContext, timeMs);
    }
    /**
     * Increments a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     * @param {number} amount The amount.
     */
    increment(metricName, context, amount) {
        this.listeners.forEach(h => h.onIncrement(metricName, context, amount));
    }
    /**
     * Decrements a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     * @param {number} amount The amount.
     */
    decrement(metricName, context, amount) {
        this.listeners.forEach(h => h.onDecrement(metricName, context, amount));
    }
    /**
     * Resets a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     */
    reset(metricName, context) {
        this.listeners.forEach(h => h.onReset(metricName, context));
    }
    /**
     * Assigns a unique ID to the context object, returning it back.
     * @param {IMetricContext} context The context to modify.
     * @returns {IMetricContext} The provided context.
     */
    assignUniqueContextId(context) {
        context.uniqueId = `${new Date().getTime()}-${this.uid++}`;
        return context;
    }
}
exports.Metrics = Metrics;
//# sourceMappingURL=Metrics.js.map
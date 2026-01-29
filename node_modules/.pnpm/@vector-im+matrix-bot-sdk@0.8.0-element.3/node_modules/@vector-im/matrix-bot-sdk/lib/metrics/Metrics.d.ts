import { IMetricListener } from "./IMetricListener";
import { IMetricContext } from "./contexts";
/**
 * Tracks metrics.
 * @category Metrics
 */
export declare class Metrics {
    private listeners;
    private requestStartTimes;
    private uid;
    /**
     * Creates a new Metrics handler with optional parent handler. When
     * a parent handler is defined, metrics will be automatically published
     * upwards to the parent.
     * @param {Metrics} parent Optional parent for upstream metrics.
     */
    constructor(parent?: Metrics);
    /**
     * Registers a metric listener.
     * @param {IMetricListener} listener The listener.
     */
    registerListener(listener: IMetricListener): void;
    /**
     * De-registers a metric listener.
     * @param {IMetricListener} listener The listener.
     */
    unregisterListener(listener: IMetricListener): void;
    /**
     * Starts a timer on a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     */
    start(metricName: string, context: IMetricContext): void;
    /**
     * Ends a timer on a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     */
    end(metricName: string, context: IMetricContext): void;
    /**
     * Increments a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     * @param {number} amount The amount.
     */
    increment(metricName: string, context: IMetricContext, amount: number): void;
    /**
     * Decrements a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     * @param {number} amount The amount.
     */
    decrement(metricName: string, context: IMetricContext, amount: number): void;
    /**
     * Resets a metric.
     * @param {string} metricName The metric name.
     * @param {IMetricContext} context The metric context. Expected to have a unique ID.
     */
    reset(metricName: string, context: IMetricContext): void;
    /**
     * Assigns a unique ID to the context object, returning it back.
     * @param {IMetricContext} context The context to modify.
     * @returns {IMetricContext} The provided context.
     */
    assignUniqueContextId(context: IMetricContext): IMetricContext;
}

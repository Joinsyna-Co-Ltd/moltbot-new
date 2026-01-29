import { DataObject } from '@twurple/common';
import { type HelixEventSubSubscriptionData, type HelixEventSubSubscriptionStatus, type HelixEventSubTransportData } from '../../interfaces/endpoints/eventSub.external.js';
/**
 * An EventSub subscription.
 */
export declare class HelixEventSubSubscription extends DataObject<HelixEventSubSubscriptionData> {
    /**
     * The ID of the subscription.
     */
    get id(): string;
    /**
     * The status of the subscription.
     */
    get status(): HelixEventSubSubscriptionStatus;
    /**
     * The event type that the subscription is listening to.
     */
    get type(): string;
    /**
     * The cost of the subscription.
     */
    get cost(): number;
    /**
     * The condition of the subscription.
     */
    get condition(): Record<string, unknown>;
    /**
     * The date and time of creation of the subscription.
     */
    get creationDate(): Date;
    /**
     * The transport method of the subscription.
     */
    get transportMethod(): string;
    /**
     * End the EventSub subscription.
     */
    unsubscribe(): Promise<void>;
    /** @private */
    get _transport(): HelixEventSubTransportData;
    /** @private */
    set _status(status: HelixEventSubSubscriptionStatus);
}
//# sourceMappingURL=HelixEventSubSubscription.d.ts.map
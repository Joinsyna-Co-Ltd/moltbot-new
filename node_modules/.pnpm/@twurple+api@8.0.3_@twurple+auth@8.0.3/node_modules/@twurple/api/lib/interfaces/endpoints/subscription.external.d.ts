import { type HelixPaginatedResponseWithTotal } from '@twurple/api-call';
/** @private */
export interface HelixUserSubscriptionData {
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    is_gift: boolean;
    tier: string;
}
/** @private */
export interface HelixSubscriptionData extends HelixUserSubscriptionData {
    gifter_id: string;
    gifter_login: string;
    gifter_name: string;
    plan_name: string;
    user_id: string;
    user_login: string;
    user_name: string;
    message?: string;
}
/** @private */
export interface HelixPaginatedSubscriptionsResponse extends HelixPaginatedResponseWithTotal<HelixSubscriptionData> {
    points: number;
}
//# sourceMappingURL=subscription.external.d.ts.map
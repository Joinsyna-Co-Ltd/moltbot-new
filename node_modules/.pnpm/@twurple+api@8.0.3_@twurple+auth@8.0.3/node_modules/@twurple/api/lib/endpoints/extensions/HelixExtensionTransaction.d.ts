import { DataObject } from '@twurple/common';
import { type HelixExtensionProductType, type HelixExtensionTransactionData } from '../../interfaces/endpoints/extensions.external.js';
import type { HelixUser } from '../user/HelixUser.js';
/**
 * A bits transaction made inside an extension.
 */
export declare class HelixExtensionTransaction extends DataObject<HelixExtensionTransactionData> {
    /**
     * The ID of the transaction.
     */
    get id(): string;
    /**
     * The time when the transaction was made.
     */
    get transactionDate(): Date;
    /**
     * The ID of the broadcaster that runs the extension on their channel.
     */
    get broadcasterId(): string;
    /**
     * The name of the broadcaster that runs the extension on their channel.
     */
    get broadcasterName(): string;
    /**
     * The display name of the broadcaster that runs the extension on their channel.
     */
    get broadcasterDisplayName(): string;
    /**
     * Gets information about the broadcaster that runs the extension on their channel.
     */
    getBroadcaster(): Promise<HelixUser>;
    /**
     * The ID of the user that made the transaction.
     */
    get userId(): string;
    /**
     * The name of the user that made the transaction.
     */
    get userName(): string;
    /**
     * The display name of the user that made the transaction.
     */
    get userDisplayName(): string;
    /**
     * Gets information about the user that made the transaction.
     */
    getUser(): Promise<HelixUser>;
    /**
     * The product type. Currently always BITS_IN_EXTENSION.
     */
    get productType(): HelixExtensionProductType;
    /**
     * The product SKU.
     */
    get productSku(): string;
    /**
     * The cost of the product, in bits.
     */
    get productCost(): number;
    /**
     * The display name of the product.
     */
    get productDisplayName(): string;
    /**
     * Whether the product is in development.
     */
    get productInDevelopment(): boolean;
}
//# sourceMappingURL=HelixExtensionTransaction.d.ts.map
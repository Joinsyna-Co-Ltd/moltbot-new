import { DataObject } from '@twurple/common';
import { type HelixExtensionBitsProductData } from '../../interfaces/endpoints/extensions.external.js';
/**
 * An extension's product to purchase with Bits.
 */
export declare class HelixExtensionBitsProduct extends DataObject<HelixExtensionBitsProductData> {
    /**
     * The product's unique identifier.
     */
    get sku(): string;
    /**
     * The product's cost, in bits.
     */
    get cost(): number;
    /**
     * The product's display name.
     */
    get displayName(): string;
    /**
     * Whether the product is in development.
     */
    get inDevelopment(): boolean;
    /**
     * Whether the product's purchases is broadcast to all users.
     */
    get isBroadcast(): boolean;
    /**
     * The product's expiration date. If the product never expires, this is null.
     */
    get expirationDate(): Date | null;
}
//# sourceMappingURL=HelixExtensionBitsProduct.d.ts.map
/** @private */
export interface HelixExtensionBitsProductCostData {
    amount: number;
    type: 'bits';
}
/** @private */
export interface HelixExtensionBitsProductData {
    sku: string;
    cost: HelixExtensionBitsProductCostData;
    in_development: boolean;
    display_name: string;
    is_broadcast: boolean;
    expiration: string;
}
/** @private */
export interface HelixExtensionProductCostData {
    amount: number;
    type: 'bits';
}
/** @private */
export interface HelixExtensionProductData {
    sku: string;
    cost: HelixExtensionProductCostData;
    displayName: string;
    inDevelopment: boolean;
}
/** @private */
export type HelixExtensionProductType = 'BITS_IN_EXTENSION';
/** @private */
export interface HelixExtensionTransactionData {
    id: string;
    timestamp: string;
    broadcaster_id: string;
    broadcaster_login: string;
    broadcaster_name: string;
    user_id: string;
    user_login: string;
    user_name: string;
    product_type: HelixExtensionProductType;
    product_data: HelixExtensionProductData;
}
//# sourceMappingURL=extensions.external.d.ts.map
/** @internal */
export function createReleasedExtensionFilter(extensionId, version) {
    return {
        extension_id: extensionId,
        extension_version: version,
    };
}
/** @internal */
export function createExtensionProductBody(data) {
    return {
        sku: data.sku,
        cost: {
            amount: data.cost,
            type: 'bits',
        },
        display_name: data.displayName,
        in_development: data.inDevelopment,
        expiration: data.expirationDate,
        is_broadcast: data.broadcast,
    };
}
/** @internal */
export function createExtensionTransactionQuery(extensionId, filter) {
    return {
        extension_id: extensionId,
        id: filter.transactionIds,
    };
}

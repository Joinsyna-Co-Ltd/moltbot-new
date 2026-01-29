import { BaseApi } from '../BaseApi.js';
import { HelixContentClassificationLabel } from './HelixContentClassificationLabel.js';
/**
 * The Helix API methods that deal with content classification labels.
 *
 * Can be accessed using `client.contentClassificationLabels` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const labels = await api.contentClassificationLabels.getAll();
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Content classification labels
 */
export declare class HelixContentClassificationLabelApi extends BaseApi {
    /**
     * Fetches a list of all content classification labels.
     *
     * @param locale The locale for the content classification labels.
     */
    getAll(locale?: string): Promise<HelixContentClassificationLabel[]>;
}
//# sourceMappingURL=HelixContentClassificationLabelApi.d.ts.map
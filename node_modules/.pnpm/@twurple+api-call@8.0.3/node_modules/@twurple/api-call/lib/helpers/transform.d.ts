/// <reference types="node" resolution-mode="require"/>
import type { TwitchApiCallOptions } from '../TwitchApiCallOptions.js';
/** @private */
export declare function handleTwitchApiResponseError(response: Response, options: TwitchApiCallOptions): Promise<void>;
/** @private */
export declare function transformTwitchApiResponse<T>(response: Response): Promise<T>;
//# sourceMappingURL=transform.d.ts.map
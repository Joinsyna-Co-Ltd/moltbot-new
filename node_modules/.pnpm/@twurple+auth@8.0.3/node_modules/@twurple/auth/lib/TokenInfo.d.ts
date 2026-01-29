import { DataObject } from '@twurple/common';
import { type TokenInfoData } from './TokenInfo.external.js';
/**
 * Information about an access token.
 */
export declare class TokenInfo extends DataObject<TokenInfoData> {
    private readonly _obtainmentDate;
    /**
     * The client ID.
     */
    get clientId(): string;
    /**
     * The ID of the authenticated user.
     */
    get userId(): string | null;
    /**
     * The name of the authenticated user.
     */
    get userName(): string | null;
    /**
     * The scopes for which the token is valid.
     */
    get scopes(): string[];
    /**
     * The time when the token will expire.
     *
     * If this returns null, it means that the token never expires (happens with some old client IDs).
     */
    get expiryDate(): Date | null;
}
//# sourceMappingURL=TokenInfo.d.ts.map
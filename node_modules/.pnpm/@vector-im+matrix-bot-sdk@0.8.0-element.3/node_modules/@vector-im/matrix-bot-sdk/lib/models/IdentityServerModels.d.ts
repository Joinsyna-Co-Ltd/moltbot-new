/**
 * Information about a user on an identity server.
 * @category Models
 */
export interface IdentityServerAccount {
    user_id: string;
}
/**
 * A stored invite on an identity server.
 * @category Models
 */
export interface IdentityServerInvite {
    display_name: string;
    public_keys: {
        public_key: string;
        key_validity_url: string;
    }[];
    public_key: string;
    token: string;
}

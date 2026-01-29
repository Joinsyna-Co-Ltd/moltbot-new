import { type HelixUserType } from '@twurple/common';
/** @private */
export interface HelixFollowData {
    from_id: string;
    from_login: string;
    from_name: string;
    to_id: string;
    to_login: string;
    to_name: string;
    followed_at: string;
}
/**
 * The type of a broadcaster.
 */
export type HelixBroadcasterType = 'partner' | 'affiliate' | '';
/** @private */
export interface HelixUserData {
    id: string;
    login: string;
    display_name: string;
    description: string;
    type: HelixUserType;
    broadcaster_type: HelixBroadcasterType;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    created_at: string;
}
/** @private */
export interface HelixPrivilegedUserData extends HelixUserData {
    email?: string;
}
/** @private */
export interface HelixUserBlockData {
    user_id: string;
    user_login: string;
    display_name: string;
}
/** @private */
export type UserLookupType = 'id' | 'login';
//# sourceMappingURL=user.external.d.ts.map
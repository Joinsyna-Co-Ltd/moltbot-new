/**
 * The type of a stream.
 */
export type HelixStreamType = 'live' | 'vodcast' | '';
/** @private */
export interface HelixStreamData {
    id: string;
    user_id: string;
    user_login: string;
    user_name: string;
    game_id: string;
    game_name: string;
    community_ids: string[];
    type: HelixStreamType;
    title: string;
    tags: string[];
    viewer_count: number;
    started_at: string;
    language: string;
    thumbnail_url: string;
    is_mature: boolean;
}
/** @private */
export interface HelixStreamMarkerData {
    id: string;
    created_at: string;
    description: string;
    position_seconds: number;
    URL?: string;
}
/** @private */
export interface HelixStreamMarkerVideoData extends HelixStreamMarkerData {
    URL: string;
}
/** @private */
interface HelixStreamGetMarkersResponseVideo {
    video_id: string;
    markers: HelixStreamMarkerVideoData[];
}
/** @private */
export interface HelixStreamGetMarkersResponse {
    user_id: string;
    user_login: string;
    user_name: string;
    videos: HelixStreamGetMarkersResponseVideo[];
}
/** @private */
export interface HelixGetStreamKeyData {
    stream_key: string;
}
export {};
//# sourceMappingURL=stream.external.d.ts.map
/** @private */
export interface HelixClipData {
    id: string;
    url: string;
    embed_url: string;
    broadcaster_id: string;
    broadcaster_name: string;
    creator_id: string;
    creator_name: string;
    video_id: string;
    game_id: string;
    language: string;
    title: string;
    view_count: number;
    created_at: string;
    thumbnail_url: string;
    duration: number;
    vod_offset: number | null;
    is_featured: boolean;
}
/** @private */
export type HelixClipFilterType = 'broadcaster_id' | 'game_id' | 'id';
/** @private */
export interface HelixClipCreateResponse {
    id: string;
    edit_url: string;
}
//# sourceMappingURL=clip.external.d.ts.map
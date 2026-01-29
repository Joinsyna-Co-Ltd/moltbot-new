/**
 * Build the image URL of an emote.
 *
 * @param id The ID of the emote.
 * @param settings The display settings for the emote.
 *
 * Defaults to a dark background and regular size.
 */
export function buildEmoteImageUrl(id, settings = {}) {
    const { animationSettings = 'default', backgroundType = 'dark', size = '1.0' } = settings;
    return `https://static-cdn.jtvnw.net/emoticons/v2/${id}/${animationSettings}/${backgroundType}/${size}`;
}

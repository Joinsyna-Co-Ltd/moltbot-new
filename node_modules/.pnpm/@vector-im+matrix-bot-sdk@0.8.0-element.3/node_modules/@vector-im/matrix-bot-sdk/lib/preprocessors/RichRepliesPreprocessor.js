"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichRepliesPreprocessor = void 0;
const __1 = require("..");
/**
 * Processes rich replies found in events. This automatically strips
 * the fallback representation from events, providing the information
 * as a top level "mx_richreply" key. The "mx_richreply" property may
 * be cast to the type IRichReplyMetadata.
 * @category Preprocessors
 */
class RichRepliesPreprocessor {
    fetchRealEventContents;
    /**
     * Creates a new rich replies preprocessor.
     * @param fetchRealEventContents If enabled, this preprocessor will
     * attempt to get the real event contents and append them to the event
     * information.
     */
    constructor(fetchRealEventContents = false) {
        this.fetchRealEventContents = fetchRealEventContents;
    }
    getSupportedEventTypes() {
        return ["m.room.message"];
    }
    async processEvent(event, client, kind) {
        if (kind && kind !== __1.EventKind.RoomEvent)
            return;
        if (!event["content"])
            return;
        if (!event["content"]["m.relates_to"])
            return;
        if (!event["content"]["m.relates_to"]["m.in_reply_to"])
            return;
        const parentEventId = event["content"]["m.relates_to"]["m.in_reply_to"]["event_id"];
        if (!parentEventId)
            return;
        let fallbackHtml = "";
        let fallbackText = "";
        let fallbackSender = "";
        let realHtml = event["content"]["formatted_body"];
        let realText = event["content"]["body"];
        let lenient = false;
        if (event["content"]["format"] !== "org.matrix.custom.html" || !event["content"]["formatted_body"]) {
            lenient = true; // Not safe to parse: probably not HTML
        }
        else {
            const formattedBody = event["content"]["formatted_body"];
            if (!formattedBody.startsWith("<mx-reply>") || formattedBody.indexOf("</mx-reply>") === -1) {
                lenient = true; // Doesn't look like a reply
            }
            else {
                const parts = formattedBody.split("</mx-reply>");
                const fbHtml = parts[0];
                realHtml = parts[1];
                const results = fbHtml.match(/<br[ ]*[/]{0,2}>(.*)<\/blockquote>\s*$/i);
                if (!results) {
                    lenient = true;
                }
                else {
                    fallbackHtml = results[1];
                }
            }
        }
        let processedFallback = false;
        const body = event["content"]["body"] || "";
        for (const line of body.split("\n")) {
            if (line.startsWith("> ") && !processedFallback) {
                fallbackText += line.substring(2) + "\n";
            }
            else if (!processedFallback) {
                realText = "";
                processedFallback = true;
            }
            else {
                realText += line + "\n";
            }
        }
        const firstFallbackLine = fallbackText.split("\n")[0];
        const matches = firstFallbackLine.match(/<(@.*:.*)>/);
        if (!matches) {
            lenient = true;
        }
        else {
            fallbackSender = matches[1];
        }
        const metadata = {
            wasLenient: lenient,
            fallbackHtmlBody: fallbackHtml ? fallbackHtml.trim() : "",
            fallbackPlainBody: fallbackText ? fallbackText.trim() : "",
            fallbackSender: fallbackSender ? fallbackSender.trim() : "",
            parentEventId: parentEventId ? parentEventId.trim() : "",
            realEvent: null,
        };
        if (this.fetchRealEventContents) {
            try {
                metadata.realEvent = await client.getEvent(event["room_id"], parentEventId);
            }
            catch (e) {
                __1.LogService.error("RichRepliesPreprocessor", "Failed to fetch real event:");
                __1.LogService.error("RichRepliesPreprocessor", (0, __1.extractRequestError)(e));
                metadata.wasLenient = true; // failed to fetch event
            }
        }
        event["mx_richreply"] = metadata;
        event["content"]["body"] = realText.trim();
        if (realHtml)
            event["content"]["formatted_body"] = realHtml.trim();
        return event;
    }
}
exports.RichRepliesPreprocessor = RichRepliesPreprocessor;
//# sourceMappingURL=RichRepliesPreprocessor.js.map
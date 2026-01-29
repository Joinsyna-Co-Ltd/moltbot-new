"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichReply = void 0;
const sanitizeHtml = require("sanitize-html");
/**
 * Helper for creating rich replies.
 * @category Utilities
 */
class RichReply {
    constructor() {
    }
    /**
     * Generates the event content required to reply to the provided event with the
     * provided text.
     * @param {string} roomId the room ID the event being replied to resides in
     * @param {any} event the event to reply to
     * @param {string} withText the plain text to reply with
     * @param {string} withHtml the HTML to reply with
     * @returns {any} the content of the event representing the reply
     */
    static createFor(roomId, event, withText, withHtml) {
        const originalBody = (event["content"] ? event["content"]["body"] : "") || "";
        let originalHtml = (event["content"] ? event["content"]["formatted_body"] : "") || null;
        if (originalHtml === null) {
            originalHtml = sanitizeHtml(originalBody);
        }
        const fallbackText = "> <" + event["sender"] + "> " + originalBody.split("\n").join("\n> ");
        const fallbackHtml = "<mx-reply><blockquote>"
            + `<a href="https://matrix.to/#/${roomId}/${event["event_id"]}">In reply to</a> `
            + `<a href="https://matrix.to/#/${event["sender"]}">${event["sender"]}</a>`
            + "<br />" + originalHtml
            + "</blockquote></mx-reply>";
        return {
            "m.relates_to": {
                "m.in_reply_to": {
                    "event_id": event["event_id"],
                },
            },
            "msgtype": "m.text", // for those who just want to send the reply as-is
            "body": fallbackText + "\n\n" + withText,
            "format": "org.matrix.custom.html",
            "formatted_body": fallbackHtml + withHtml,
        };
    }
}
exports.RichReply = RichReply;
//# sourceMappingURL=RichReply.js.map
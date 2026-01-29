/**
 * Helper for creating rich replies.
 * @category Utilities
 */
export declare class RichReply {
    private constructor();
    /**
     * Generates the event content required to reply to the provided event with the
     * provided text.
     * @param {string} roomId the room ID the event being replied to resides in
     * @param {any} event the event to reply to
     * @param {string} withText the plain text to reply with
     * @param {string} withHtml the HTML to reply with
     * @returns {any} the content of the event representing the reply
     */
    static createFor(roomId: string, event: any, withText: string, withHtml: string): any;
}

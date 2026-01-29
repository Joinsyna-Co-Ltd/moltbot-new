"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRoomEvent = wrapRoomEvent;
const MembershipEvent_1 = require("./MembershipEvent");
const RoomEvent_1 = require("./RoomEvent");
const MessageEvent_1 = require("./MessageEvent");
/**
 * Wraps a room event into a more suitable container.
 * @param {any} event The event object to wrap.
 * @returns {RoomEvent<any>} An instance of the most suitable container for the event.
 * @category Matrix events
 */
function wrapRoomEvent(event) {
    if (!event)
        return null;
    if (typeof (event['state_key']) === 'string') {
        if (event['type'] === 'm.room.member') {
            return new MembershipEvent_1.MembershipEvent(event);
        }
        else {
            return new RoomEvent_1.StateEvent(event);
        }
    }
    else if (event['type'] === 'm.room.message') {
        const content = event['content'];
        const msgtype = content ? content['msgtype'] : null;
        if (msgtype === "m.text" || msgtype === "m.notice" || msgtype === "m.emote") {
            return new MessageEvent_1.MessageEvent(event);
        }
        else if (msgtype === "m.audio") {
            return new MessageEvent_1.MessageEvent(event);
        }
        else if (msgtype === "m.video") {
            return new MessageEvent_1.MessageEvent(event);
        }
        else if (msgtype === "m.image") {
            return new MessageEvent_1.MessageEvent(event);
        }
        else if (msgtype === "m.location") {
            return new MessageEvent_1.MessageEvent(event);
        }
        else {
            return new MessageEvent_1.MessageEvent(event);
        }
    }
    else {
        return new RoomEvent_1.RoomEvent(event);
    }
}
//# sourceMappingURL=converter.js.map
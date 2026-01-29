"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutojoinRoomsMixin = void 0;
/**
 * Automatically accepts invites for rooms
 * @category Mixins
 */
class AutojoinRoomsMixin {
    static setupOnClient(client) {
        client.on("room.invite", (roomId, inviteEvent) => {
            return client.joinRoom(roomId);
        });
    }
    static setupOnAppservice(appservice, conditional = null) {
        appservice.on("room.invite", (roomId, inviteEvent) => {
            const isFromBot = appservice.botUserId === inviteEvent["sender"];
            if (!isFromBot && conditional && !conditional(inviteEvent))
                return;
            const intent = appservice.getIntentForUserId(inviteEvent["state_key"]);
            return intent.joinRoom(roomId);
        });
    }
}
exports.AutojoinRoomsMixin = AutojoinRoomsMixin;
//# sourceMappingURL=AutojoinRoomsMixin.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutojoinUpgradedRoomsMixin = void 0;
/**
 * Automatically tries to join upgraded rooms
 * @category Mixins
 */
class AutojoinUpgradedRoomsMixin {
    static setupOnClient(client) {
        client.on("room.archived", (roomId, tombstoneEvent) => {
            if (!tombstoneEvent['content'])
                return;
            if (!tombstoneEvent['sender'])
                return;
            if (!tombstoneEvent['content']['replacement_room'])
                return;
            const serverName = tombstoneEvent['sender'].split(':').splice(1).join(':');
            return client.joinRoom(tombstoneEvent['content']['replacement_room'], [serverName]);
        });
    }
    static setupOnAppservice(appservice) {
        appservice.on("room.archived", async (roomId, tombstoneEvent) => {
            if (!tombstoneEvent['content'])
                return;
            if (!tombstoneEvent['sender'])
                return;
            if (!tombstoneEvent['content']['replacement_room'])
                return;
            const newRoomId = tombstoneEvent['content']['replacement_room'];
            const serverName = tombstoneEvent['sender'].split(':').splice(1).join(':');
            const botClient = appservice.botIntent.underlyingClient;
            await botClient.joinRoom(newRoomId, [serverName]);
            const userIds = await botClient.getJoinedRoomMembers(roomId);
            const joinUserIds = userIds.filter(u => u !== appservice.botUserId && appservice.isNamespacedUser(u));
            return await Promise.all(joinUserIds.map(u => appservice.getIntentForUserId(u).joinRoom(newRoomId)));
        });
    }
}
exports.AutojoinUpgradedRoomsMixin = AutojoinUpgradedRoomsMixin;
//# sourceMappingURL=AutojoinUpgradedRoomsMixin.js.map
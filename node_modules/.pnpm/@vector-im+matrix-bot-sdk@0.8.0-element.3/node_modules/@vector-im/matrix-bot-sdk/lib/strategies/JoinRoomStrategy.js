"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleRetryJoinStrategy = void 0;
const __1 = require("..");
/**
 * A join strategy that keeps trying to join the room on a set interval.
 * @category Join strategies
 */
class SimpleRetryJoinStrategy {
    // Note: The schedule must not have duplicate values to avoid problems in positioning.
    schedule = [
        0, // Right away
        1000, // 1 second
        30 * 1000, // 30 seconds
        5 * 60 * 1000, // 5 minutes
        15 * 60 * 1000, // 15 minutes
    ];
    joinRoom(roomIdOrAlias, userId, apiCall) {
        let currentSchedule = this.schedule[0];
        const doJoin = () => waitPromise(currentSchedule).then(() => apiCall(roomIdOrAlias));
        const errorHandler = err => {
            __1.LogService.error("SimpleRetryJoinStrategy", (0, __1.extractRequestError)(err));
            const idx = this.schedule.indexOf(currentSchedule);
            if (idx === this.schedule.length - 1) {
                __1.LogService.warn("SimpleRetryJoinStrategy", "Failed to join room " + roomIdOrAlias);
                return Promise.reject(err);
            }
            else {
                currentSchedule = this.schedule[idx + 1];
                return doJoin().catch(errorHandler);
            }
        };
        return doJoin().catch(errorHandler);
    }
}
exports.SimpleRetryJoinStrategy = SimpleRetryJoinStrategy;
function waitPromise(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, interval);
    });
}
//# sourceMappingURL=JoinRoomStrategy.js.map
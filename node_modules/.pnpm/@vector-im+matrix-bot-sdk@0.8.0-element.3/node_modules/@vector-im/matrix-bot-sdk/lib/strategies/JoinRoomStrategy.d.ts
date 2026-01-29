export interface IJoinRoomStrategy {
    joinRoom(roomIdOrAlias: string, userId: string, apiCall: (targetRoomIdOrAlias: string) => Promise<string>): Promise<string>;
}
/**
 * A join strategy that keeps trying to join the room on a set interval.
 * @category Join strategies
 */
export declare class SimpleRetryJoinStrategy implements IJoinRoomStrategy {
    private schedule;
    joinRoom(roomIdOrAlias: string, userId: string, apiCall: (targetRoomIdOrAlias: string) => Promise<string>): Promise<string>;
}

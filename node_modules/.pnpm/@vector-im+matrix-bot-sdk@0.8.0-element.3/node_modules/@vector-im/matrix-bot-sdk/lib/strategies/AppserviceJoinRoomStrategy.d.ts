import { IJoinRoomStrategy } from "./JoinRoomStrategy";
import { Appservice } from "../appservice/Appservice";
/**
 * A join strategy for application services that proxies joins to an underlying join
 * strategy while also trying to use the appservice's bot user to invite the underlying
 * user if needed.
 * @category Join strategies
 */
export declare class AppserviceJoinRoomStrategy implements IJoinRoomStrategy {
    private underlyingStrategy;
    private appservice;
    constructor(underlyingStrategy: IJoinRoomStrategy, appservice: Appservice);
    joinRoom(roomIdOrAlias: string, userId: string, apiCall: (targetRoomIdOrAlias: string) => Promise<string>): Promise<string>;
}

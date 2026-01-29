import { MatrixClient } from "../MatrixClient";
import { Appservice } from "../appservice/Appservice";
/**
 * Automatically accepts invites for rooms
 * @category Mixins
 */
export declare class AutojoinRoomsMixin {
    static setupOnClient(client: MatrixClient): void;
    static setupOnAppservice(appservice: Appservice, conditional?: (inviteEvent: any) => boolean): void;
}

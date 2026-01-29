import { MatrixClient } from "../MatrixClient";
import { Appservice } from "../appservice/Appservice";
/**
 * Automatically tries to join upgraded rooms
 * @category Mixins
 */
export declare class AutojoinUpgradedRoomsMixin {
    static setupOnClient(client: MatrixClient): void;
    static setupOnAppservice(appservice: Appservice): void;
}

import { type MatrixClient, type PowerLevelsEventContent } from "..";
interface CreateEventContentHydra {
    additional_creators?: string[];
    room_version: "12" | "org.matrix.hydra.11";
}
interface CreateEventContentLegacy {
    /**
     * The room version. "v1" rooms are possibly undefined.
     */
    room_version?: string;
}
export declare const ROOM_MODERATOR_PL = 50;
export declare const ROOM_ADMIN_PL = 100;
export declare const ROOM_CREATOR_PL: number;
/**
 * Handles calculating the true power levels for a given room, taking into
 * account any specific room version features.
 */
export declare class PLManager {
    private readonly createEvent;
    private powerLevels;
    static createFromRoomState(roomState: Awaited<ReturnType<MatrixClient["getRoomState"]>>): PLManager;
    readonly creators: Set<string>;
    static areCreatorsPriviledged(roomVersion: string): boolean;
    get areCreatorsPriviledged(): boolean;
    get getFirstCreator(): string;
    get currentPL(): PowerLevelsEventContent;
    get defaultPL(): number;
    constructor(createEvent: {
        sender: string;
        content: CreateEventContentHydra | CreateEventContentLegacy;
    }, powerLevels: PowerLevelsEventContent | undefined);
    canAdjustUserPL(userId: string): boolean;
    getUserPowerLevel(userId: string): number;
}
/**
 * Information on the bounds of a power level change a user can apply.
 */
export interface PowerLevelBounds {
    /**
     * Whether or not the user can even modify the power level of the user. This
     * will be false if the user can't send power level events, or the user is
     * unobtainably high in power.
     */
    canModify: boolean;
    /**
     * The maximum possible power level the user can set on the target user.
     */
    maximumPossibleLevel: number;
}
/**
 * Actions that can be guarded by power levels.
 */
export declare enum PowerLevelAction {
    /**
     * Power level required to ban other users.
     */
    Ban = "ban",
    /**
     * Power level required to kick other users.
     */
    Kick = "kick",
    /**
     * Power level required to redact events sent by other users. Users can redact
     * their own messages regardless of this power level requirement, unless forbidden
     * by the `events` section of the power levels content.
     */
    RedactEvents = "redact",
    /**
     * Power level required to invite other users.
     */
    Invite = "invite",
    /**
     * Power level required to notify the whole room with "@room".
     */
    NotifyRoom = "notifications.room"
}
export {};

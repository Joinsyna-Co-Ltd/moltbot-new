import { MatrixClient, Metrics } from "..";
import { Appservice, IAppserviceOptions } from "./Appservice";
import { UnstableAppserviceApis } from "./UnstableAppserviceApis";
/**
 * An Intent is an intelligent client that tracks things like the user's membership
 * in rooms to ensure the action being performed is possible. This is very similar
 * to how Intents work in the matrix-js-sdk in that the Intent will ensure that the
 * user is joined to the room before posting a message, for example.
 * @category Application services
 */
export declare class Intent {
    private options;
    private impersonateUserId;
    private appservice;
    /**
     * The metrics instance for this intent. Note that this will not raise metrics
     * for the underlying client - those will be available through this instance's
     * parent (the appservice).
     */
    readonly metrics: Metrics;
    private readonly storage;
    private readonly cryptoStorage;
    private client;
    private unstableApisInstance;
    private cryptoSetupPromise;
    /**
     * Creates a new intent. Intended to be created by application services.
     * @param {IAppserviceOptions} options The options for the application service.
     * @param {string} impersonateUserId The user ID to impersonate.
     * @param {Appservice} appservice The application service itself.
     */
    constructor(options: IAppserviceOptions, impersonateUserId: string, appservice: Appservice);
    private makeClient;
    /**
     * Gets the user ID this intent is for.
     */
    get userId(): string;
    /**
     * Gets the underlying MatrixClient that powers this Intent.
     */
    get underlyingClient(): MatrixClient;
    /**
     * Gets the unstable API access class. This is generally not recommended to be
     * used by appservices.
     * @return {UnstableAppserviceApis} The unstable API access class.
     */
    get unstableApis(): UnstableAppserviceApis;
    /**
     * Sets up crypto on the client if it hasn't already been set up.
     * @param providedDeviceId Optional device ID. If given, this will used instead of trying to
     * masquerade as the first non-key enabled device.
     * @returns {Promise<void>} Resolves when complete.
     */
    enableEncryption(providedDeviceId?: string): Promise<void>;
    /**
     * Gets the joined rooms for the intent.
     * @returns {Promise<string[]>} Resolves to an array of room IDs where
     * the intent is joined.
     */
    getJoinedRooms(): Promise<string[]>;
    /**
     * Leaves the given room.
     * @param {string} roomId The room ID to leave
     * @param {string=} reason Optional reason to be included as the reason for leaving the room.
     * @returns {Promise<any>} Resolves when the room has been left.
     */
    leaveRoom(roomId: string, reason?: string): Promise<any>;
    /**
     * Joins the given room
     * @param {string} roomIdOrAlias the room ID or alias to join
     * @returns {Promise<string>} resolves to the joined room ID
     */
    joinRoom(roomIdOrAlias: string): Promise<string>;
    /**
     * Sends a text message to a room.
     * @param {string} roomId The room ID to send text to.
     * @param {string} body The message body to send.
     * @param {"m.text" | "m.emote" | "m.notice"} msgtype The message type to send.
     * @returns {Promise<string>} Resolves to the event ID of the sent message.
     */
    sendText(roomId: string, body: string, msgtype?: "m.text" | "m.emote" | "m.notice"): Promise<string>;
    /**
     * Sends an event to a room.
     * @param {string} roomId The room ID to send the event to.
     * @param {any} content The content of the event.
     * @returns {Promise<string>} Resolves to the event ID of the sent event.
     */
    sendEvent(roomId: string, content: any): Promise<string>;
    /**
     * Ensures the user is registered and joined to the given room.
     * @param {string} roomId The room ID to join
     * @returns {Promise<any>} Resolves when complete
     */
    ensureRegisteredAndJoined(roomId: string): Promise<void>;
    /**
     * Ensures the user is joined to the given room
     * @param {string} roomId The room ID to join
     * @returns {Promise<any>} Resolves when complete
     * @deprecated Use `joinRoom()` instead
     */
    ensureJoined(roomId: string): Promise<string>;
    /**
     * Refreshes which rooms the user is joined to, potentially saving time on
     * calls like ensureJoined()
     * @deprecated There is no longer a joined rooms cache, use `getJoinedRooms()` instead
     * @returns {Promise<string[]>} Resolves to the joined room IDs for the user.
     */
    refreshJoinedRooms(): Promise<string[]>;
    /**
     * Ensures the user is registered
     * @param deviceId An optional device ID to register with.
     * @returns {Promise<any>} Resolves when complete
     */
    ensureRegistered(deviceId?: string): Promise<any>;
}

import { EventEmitter } from "events";
import { IStorageProvider } from "./storage/IStorageProvider";
import { IJoinRoomStrategy } from "./strategies/JoinRoomStrategy";
import { UnstableApis } from "./UnstableApis";
import { IPreprocessor } from "./preprocessors/IPreprocessor";
import { Metrics } from "./metrics/Metrics";
import { AdminApis } from "./AdminApis";
import { Presence } from "./models/Presence";
import { Membership, MembershipEvent } from "./models/events/MembershipEvent";
import { APIRoomEvent, APIRoomStateEvent, RoomEvent } from "./models/events/RoomEvent";
import { EventContext } from "./models/EventContext";
import { IdentityClient } from "./identity/IdentityClient";
import { OpenIDConnectToken } from "./models/OpenIDConnect";
import { DoHttpRequestOpts } from "./http";
import { Space, SpaceCreateOptions } from "./models/Spaces";
import { CryptoClient } from "./e2ee/CryptoClient";
import { FallbackKey, MultiUserDeviceListResponse, OTKAlgorithm, OTKClaimResponse, OTKCounts, OTKs, OwnUserDevice } from "./models/Crypto";
import { ICryptoStorageProvider } from "./storage/ICryptoStorageProvider";
import { IWhoAmI } from "./models/Account";
import { DMs } from "./DMs";
import { ServerVersions } from "./models/ServerVersions";
import { RoomCreateOptions } from "./models/CreateRoom";
import { PresenceState } from './models/events/PresenceEvent';
import { IKeyBackupInfoRetrieved, IKeyBackupInfoUnsigned, IKeyBackupInfoUpdate, IKeyBackupVersion, KeyBackupVersion } from "./models/KeyBackup";
import { MatrixContentScannerClient } from "./MatrixContentScannerClient";
import { MatrixCapabilities } from "./models/Capabilities";
import { PowerLevelAction, PowerLevelBounds } from "./models/PowerLevels";
import { CreateEvent } from "./models/events/CreateEvent";
import { IJsonType } from "./helpers/Types";
/**
 * A client that is capable of interacting with a matrix homeserver.
 */
export declare class MatrixClient extends EventEmitter {
    readonly homeserverUrl: string;
    readonly accessToken: string;
    private storage;
    readonly cryptoStore: ICryptoStorageProvider;
    /**
     * The presence status to use while syncing. The valid values are "online" to set the account as online,
     * "offline" to set the user as offline, "unavailable" for marking the user away, and null for not setting
     * an explicit presence (the default).
     *
     * Has no effect if the client is not syncing. Does not apply until the next sync request.
     */
    syncingPresence: PresenceState | null;
    /**
     * The number of milliseconds to wait for new events for on the next sync.
     *
     * Has no effect if the client is not syncing. Does not apply until the next sync request.
     */
    syncingTimeout: number;
    /**
     * The crypto manager instance for this client. Generally speaking, this shouldn't
     * need to be accessed but is made available.
     *
     * Will be null/undefined if crypto is not possible.
     */
    readonly crypto: CryptoClient;
    /**
     * The Content Scanner API instance for this client. This is set if `opts.enableContentScanner`
     * is true. The `downloadContent` and `crypto.decryptMedia` methods automatically go via
     * the content scanner when this is set.
     */
    readonly contentScannerInstance?: MatrixContentScannerClient;
    /**
     * The DM manager instance for this client.
     */
    readonly dms: DMs;
    private userId;
    private requestId;
    private lastJoinedRoomIds;
    private impersonatedUserId;
    private impersonatedDeviceId;
    private joinStrategy;
    private eventProcessors;
    private filterId;
    private stopSyncing;
    private metricsInstance;
    private readonly unstableApisInstance;
    private cachedVersions;
    private versionsLastFetched;
    private cachedCapabilites;
    private capabilitesLastFetched;
    private createEventCache;
    /**
     * Set this to true to have the client only persist the sync token after the sync
     * has been processed successfully. Note that if this is true then when the sync
     * loop throws an error the client will not persist a token.
     */
    protected persistTokenAfterSync: boolean;
    /**
     * Creates a new matrix client
     * @param {string} homeserverUrl The homeserver's client-server API URL
     * @param {string} accessToken The access token for the homeserver
     * @param {IStorageProvider} storage The storage provider to use. Defaults to MemoryStorageProvider.
     * @param {ICryptoStorageProvider} cryptoStore Optional crypto storage provider to use. If not supplied,
     * end-to-end encryption will not be functional in this client.
     */
    constructor(homeserverUrl: string, accessToken: string, storage?: IStorageProvider, cryptoStore?: ICryptoStorageProvider, opts?: {
        enableContentScanner?: boolean;
    });
    /**
     * The storage provider for this client. Direct access is usually not required.
     */
    get storageProvider(): IStorageProvider;
    /**
     * The metrics instance for this client
     */
    get metrics(): Metrics;
    /**
     * Assigns a new metrics instance, overwriting the old one.
     * @param {Metrics} metrics The new metrics instance.
     */
    set metrics(metrics: Metrics);
    /**
     * Gets the unstable API access class. This is generally not recommended to be
     * used by clients.
     * @return {UnstableApis} The unstable API access class.
     */
    get unstableApis(): UnstableApis;
    /**
     * Gets the admin API access class.
     * @return {AdminApis} The admin API access class.
     */
    get adminApis(): AdminApis;
    /**
     * Sets a user ID to impersonate as. This will assume that the access token for this client
     * is for an application service, and that the userId given is within the reach of the
     * application service. Setting this to null will stop future impersonation. The user ID is
     * assumed to already be valid
     * @param {string} userId The user ID to masquerade as, or `null` to clear masquerading.
     * @param {string} deviceId Optional device ID to impersonate under the given user, if supported
     * by the server. Check the whoami response after setting.
     */
    impersonateUserId(userId: string | null, deviceId?: string): void;
    /**
     * Acquires an identity server client for communicating with an identity server. Note that
     * this will automatically do the login portion to establish a usable token with the identity
     * server provided, but it will not automatically accept any terms of service.
     *
     * The identity server name provided will in future be resolved to a server address - for now
     * that resolution is assumed to be prefixing the name with `https://`.
     * @param {string} identityServerName The domain of the identity server to connect to.
     * @returns {Promise<IdentityClient>} Resolves to a prepared identity client.
     */
    getIdentityServerClient(identityServerName: string): Promise<IdentityClient>;
    /**
     * Sets the strategy to use for when joinRoom is called on this client
     * @param {IJoinRoomStrategy} strategy The strategy to use, or null to use none
     */
    setJoinStrategy(strategy: IJoinRoomStrategy): void;
    /**
     * Adds a preprocessor to the event pipeline. When this client encounters an event, it
     * will try to run it through the preprocessors it can in the order they were added.
     * @param {IPreprocessor} preprocessor the preprocessor to add
     */
    addPreprocessor(preprocessor: IPreprocessor): void;
    private processEvent;
    /**
     * Get the set of capabilites for the authenticated client.
     * @returns {Promise<MatrixCapabilities>} Resolves to the server's supported versions.
     */
    getCapabilities(): Promise<MatrixCapabilities>;
    /**
     * Retrieves the server's supported specification versions and unstable features.
     * @returns {Promise<ServerVersions>} Resolves to the server's supported versions.
     */
    getServerVersions(): Promise<ServerVersions>;
    /**
     * Determines if the server supports a given unstable feature flag. Useful for determining
     * if the server can support an unstable MSC.
     * @param {string} feature The feature name to look for.
     * @returns {Promise<boolean>} Resolves to true if the server supports the flag, false otherwise.
     */
    doesServerSupportUnstableFeature(feature: string): Promise<boolean>;
    /**
     * Determines if the server supports a given version of the specification or not.
     * @param {string} version The version to look for. Eg: "v1.1"
     * @returns {Promise<boolean>} Resolves to true if the server supports the version, false otherwise.
     */
    doesServerSupportVersion(version: string): Promise<boolean>;
    /**
     * Determines if the server supports at least one of the given specification versions or not.
     * @param {string[]} versions The versions to look for. Eg: ["v1.1"]
     * @returns {Promise<boolean>} Resolves to true if the server supports any of the versions, false otherwise.
     */
    doesServerSupportAnyOneVersion(versions: string[]): Promise<boolean>;
    /**
     * Retrieves an OpenID Connect token from the homeserver for the current user.
     * @returns {Promise<OpenIDConnectToken>} Resolves to the token.
     */
    getOpenIDConnectToken(): Promise<OpenIDConnectToken>;
    /**
     * Retrieves content from account data.
     * @param {string} eventType The type of account data to retrieve.
     * @returns {Promise<any>} Resolves to the content of that account data.
     */
    getAccountData<T>(eventType: string): Promise<T>;
    /**
     * Retrieves content from room account data.
     * @param {string} eventType The type of room account data to retrieve.
     * @param {string} roomId The room to read the account data from.
     * @returns {Promise<any>} Resolves to the content of that account data.
     */
    getRoomAccountData<T>(eventType: string, roomId: string): Promise<T>;
    /**
     * Retrieves content from account data. If the account data request throws an error,
     * this simply returns the default provided.
     * @param {string} eventType The type of account data to retrieve.
     * @param {any} defaultContent The default value. Defaults to null.
     * @returns {Promise<any>} Resolves to the content of that account data, or the default.
     */
    getSafeAccountData<T>(eventType: string, defaultContent?: T): Promise<T>;
    /**
     * Retrieves content from room account data. If the account data request throws an error,
     * this simply returns the default provided.
     * @param {string} eventType The type of room account data to retrieve.
     * @param {string} roomId The room to read the account data from.
     * @param {any} defaultContent The default value. Defaults to null.
     * @returns {Promise<any>} Resolves to the content of that room account data, or the default.
     */
    getSafeRoomAccountData<T>(eventType: string, roomId: string, defaultContent?: T): Promise<T>;
    /**
     * Sets account data.
     * @param {string} eventType The type of account data to set
     * @param {any} content The content to set
     * @returns {Promise<any>} Resolves when updated
     */
    setAccountData(eventType: string, content: any): Promise<any>;
    /**
     * Sets room account data.
     * @param {string} eventType The type of room account data to set
     * @param {string} roomId The room to set account data in
     * @param {any} content The content to set
     * @returns {Promise<any>} Resolves when updated
     */
    setRoomAccountData(eventType: string, roomId: string, content: any): Promise<any>;
    /**
     * Gets the presence information for the current user.
     * @returns {Promise<Presence>} Resolves to the presence status of the user.
     */
    getPresenceStatus(): Promise<Presence>;
    /**
     * Gets the presence information for a given user.
     * @param {string} userId The user ID to look up the presence of.
     * @returns {Promise<Presence>} Resolves to the presence status of the user.
     */
    getPresenceStatusFor(userId: string): Promise<Presence>;
    /**
     * Sets the presence status for the current user.
     * @param {PresenceState} presence The new presence state for the user.
     * @param {string?} statusMessage Optional status message to include with the presence.
     * @returns {Promise<any>} Resolves when complete.
     */
    setPresenceStatus(presence: PresenceState, statusMessage?: string | undefined): Promise<any>;
    /**
     * Gets a published alias for the given room. These are supplied by the room admins
     * and should point to the room, but may not. This is primarily intended to be used
     * in the context of rendering a mention (pill) for a room.
     * @param {string} roomIdOrAlias The room ID or alias to get an alias for.
     * @returns {Promise<string>} Resolves to a published room alias, or falsey if none found.
     */
    getPublishedAlias(roomIdOrAlias: string): Promise<string>;
    /**
     * Adds a new room alias to the room directory
     * @param {string} alias The alias to add (eg: "#my-room:matrix.org")
     * @param {string} roomId The room ID to add the alias to
     * @returns {Promise} resolves when the alias has been added
     */
    createRoomAlias(alias: string, roomId: string): Promise<any>;
    /**
     * Removes a room alias from the room directory
     * @param {string} alias The alias to remove
     * @returns {Promise} resolves when the alias has been deleted
     */
    deleteRoomAlias(alias: string): Promise<any>;
    /**
     * Sets the visibility of a room in the directory.
     * @param {string} roomId The room ID to manipulate the visibility of
     * @param {"public" | "private"} visibility The visibility to set for the room
     * @return {Promise} resolves when the visibility has been updated
     */
    setDirectoryVisibility(roomId: string, visibility: "public" | "private"): Promise<any>;
    /**
     * Gets the visibility of a room in the directory.
     * @param {string} roomId The room ID to query the visibility of
     * @return {Promise<"public"|"private">} The visibility of the room
     */
    getDirectoryVisibility(roomId: string): Promise<"public" | "private">;
    /**
     * Resolves a room ID or alias to a room ID. If the given ID or alias looks like a room ID
     * already, it will be returned as-is. If the room ID or alias looks like a room alias, it
     * will be resolved to a room ID if possible. If the room ID or alias is neither, an error
     * will be raised.
     * @param {string} roomIdOrAlias the room ID or alias to resolve to a room ID
     * @returns {Promise<string>} resolves to the room ID
     */
    resolveRoom(roomIdOrAlias: string): Promise<string>;
    /**
     * Does a room directory lookup for a given room alias
     * @param {string} roomAlias the room alias to look up in the room directory
     * @returns {Promise<RoomDirectoryLookupResponse>} resolves to the room's information
     */
    lookupRoomAlias(roomAlias: string): Promise<RoomDirectoryLookupResponse>;
    /**
     * Invites a user to a room.
     * @param {string} userId the user ID to invite
     * @param {string} roomId the room ID to invite the user to
     * @returns {Promise<any>} resolves when completed
     */
    inviteUser(userId: any, roomId: any): Promise<any>;
    /**
     * Kicks a user from a room.
     * @param {string} userId the user ID to kick
     * @param {string} roomId the room ID to kick the user in
     * @param {string?} reason optional reason for the kick
     * @returns {Promise<any>} resolves when completed
     */
    kickUser(userId: any, roomId: any, reason?: any): Promise<any>;
    /**
     * Bans a user from a room.
     * @param {string} userId the user ID to ban
     * @param {string} roomId the room ID to set the ban in
     * @param {string?} reason optional reason for the ban
     * @returns {Promise<any>} resolves when completed
     */
    banUser(userId: any, roomId: any, reason?: any): Promise<any>;
    /**
     * Unbans a user in a room.
     * @param {string} userId the user ID to unban
     * @param {string} roomId the room ID to lift the ban in
     * @returns {Promise<any>} resolves when completed
     */
    unbanUser(userId: any, roomId: any): Promise<any>;
    /**
     * Gets the current user ID for this client
     * @returns {Promise<string>} The user ID of this client
     */
    getUserId(): Promise<string>;
    /**
     * Gets the user's information from the server directly.
     * @returns {Promise<IWhoAmI>} The "who am I" response.
     */
    getWhoAmI(): Promise<IWhoAmI>;
    /**
     * Stops the client from syncing.
     */
    stop(): void;
    /**
     * Starts syncing the client with an optional filter
     * @param {any} filter The filter to use, or null for none
     * @returns {Promise<any>} Resolves when the client has started syncing
     */
    start(filter?: any): Promise<any>;
    protected startSyncInternal(): Promise<any>;
    protected startSync(emitFn?: (emitEventType: string, ...payload: any[]) => Promise<any>): Promise<void>;
    protected doSync(token: string): Promise<any>;
    protected processSync(raw: any, emitFn?: (emitEventType: string, ...payload: any[]) => Promise<any>): Promise<any>;
    /**
     * Gets an event for a room. If the event is encrypted, and the client supports encryption,
     * and the room is encrypted, then this will return a decrypted event.
     * @param {string} roomId the room ID to get the event in
     * @param {string} eventId the event ID to look up
     * @returns {Promise<any>} resolves to the found event
     */
    getEvent(roomId: string, eventId: string): Promise<RoomEvent<IJsonType>>;
    /**
     * Gets an event for a room. Returned as a raw event.
     * @param {string} roomId the room ID to get the event in
     * @param {string} eventId the event ID to look up
     * @returns {Promise<any>} resolves to the found event
     */
    getRawEvent(roomId: string, eventId: string): Promise<APIRoomEvent>;
    /**
     * Gets the room state for the given room. Returned as raw events.
     * @param {string} roomId the room ID to get state for
     * @returns {Promise<any[]>} resolves to the room's state
     */
    getRoomState(roomId: string): Promise<APIRoomStateEvent[]>;
    /**
     * Gets the state events for a given room of a given type under the given state key.
     * @param {string} roomId the room ID
     * @param {string} type the event type
     * @param {String} stateKey the state key, falsey if not needed
     * @returns {Promise<any|any[]>} resolves to the state event(s)
     * @deprecated It is not possible to get an array of events - use getRoomStateEventContent instead
     */
    getRoomStateEvents(roomId: any, type: any, stateKey: any): Promise<any | any[]>;
    /**
     * Gets a state event for a given room of a given type under the given state key.
     * @param roomId the room ID
     * @param type the event type
     * @param stateKey the state key
     * @returns resolves to the state event
     * @throws If the event could not be found or you do not have access to the room.
     * @deprecated Use {@link getRoomStateEventContent} instead.
     */
    getRoomStateEvent(roomId: string, type: string, stateKey: string): Promise<any>;
    /**
     * Gets a state event's `content` for a given room of a given type under the given state key.
     * @param roomId the room ID
     * @param type the event type
     * @param stateKey the state key.
     * @returns resolves to the state event content
     * @throws If the event could not be found or you do not have access to the room.
     */
    getRoomStateEventContent(roomId: string, type: string, stateKey: string): Promise<APIRoomStateEvent["content"]>;
    /**
     * Gets a state event's full event body for a given room of a given type under the given state key.
     * @param roomId the room ID
     * @param type the event type
     * @param stateKey the state key
     * @returns resolves to the state event body
     * @throws If the event could not be found or you do not have access to the room.
     */
    getRoomStateEventBody(roomId: string, type: string, stateKey: string): Promise<APIRoomStateEvent>;
    /**
     * Gets the context surrounding an event.
     * @param {string} roomId The room ID to get the context in.
     * @param {string} eventId The event ID to get the context of.
     * @param {number} limit The maximum number of events to return on either side of the event.
     * @returns {Promise<EventContext>} The context of the event
     */
    getEventContext(roomId: string, eventId: string, limit?: number): Promise<EventContext>;
    /**
     * Get the nearest event to a given timestamp, either forwards or backwards.
     * @param roomId The room ID to get the context in.
     * @param ts The event ID to get the context of.
     * @param dir The maximum number of events to return on either side of the event.
     * @returns The ID and origin server timestamp of the event.
     */
    getEventNearestToTimestamp(roomId: string, ts: number, dir: "f" | "b"): Promise<{
        event_id: string;
        origin_server_ts: number;
    }>;
    /**
     * Gets the profile for a given user
     * @param {string} userId the user ID to lookup
     * @returns {Promise<any>} the profile of the user
     */
    getUserProfile(userId: string): Promise<any>;
    /**
     * Sets a new display name for the user.
     * @param {string} displayName the new display name for the user, or null to clear
     * @returns {Promise<any>} resolves when complete
     */
    setDisplayName(displayName: string): Promise<any>;
    /**
     * Sets a new avatar url for the user.
     * @param {string} avatarUrl the new avatar URL for the user, in the form of a Matrix Content URI
     * @returns {Promise<any>} resolves when complete
     */
    setAvatarUrl(avatarUrl: string): Promise<any>;
    /**
     * Joins the given room
     * @param {string} roomIdOrAlias the room ID or alias to join
     * @param {string[]} viaServers the server names to try and join through
     * @returns {Promise<string>} resolves to the joined room ID
     */
    joinRoom(roomIdOrAlias: string, viaServers?: string[]): Promise<string>;
    /**
     * Gets a list of joined room IDs
     * @returns {Promise<string[]>} resolves to a list of room IDs the client participates in
     */
    getJoinedRooms(): Promise<string[]>;
    /**
     * Gets the joined members in a room. The client must be in the room to make this request.
     * @param {string} roomId The room ID to get the joined members of.
     * @returns {Promise<string>} The joined user IDs in the room
     */
    getJoinedRoomMembers(roomId: string): Promise<string[]>;
    /**
     * Gets the joined members in a room, as an object mapping userIds to profiles. The client must be in the room to make this request.
     * @param {string} roomId The room ID to get the joined members of.
     * @returns {Object} The joined user IDs in the room as an object mapped to a set of profiles.
     */
    getJoinedRoomMembersWithProfiles(roomId: string): Promise<{
        [userId: string]: {
            display_name?: string;
            avatar_url?: string;
        };
    }>;
    /**
     * Gets the membership events of users in the room. Defaults to all membership
     * types, though this can be controlled with the membership and notMembership
     * arguments. To change the point in time, use the batchToken.
     * @param {string} roomId The room ID to get members in.
     * @param {string} batchToken The point in time to get members at (or null for 'now')
     * @param {string[]} membership The membership kinds to search for.
     * @param {string[]} notMembership The membership kinds to not search for.
     * @returns {Promise<MembershipEvent[]>} Resolves to the membership events of the users in the room.
     * @see getRoomMembersByMembership
     * @see getRoomMembersWithoutMembership
     * @see getAllRoomMembers
     */
    getRoomMembers(roomId: string, batchToken?: string, membership?: Membership[], notMembership?: Membership[]): Promise<MembershipEvent[]>;
    /**
     * Gets all room members in the room, optionally at a given point in time.
     * @param {string} roomId The room ID to get members of.
     * @param {string} atToken Optional batch token to get members at. Leave falsy for "now".
     * @returns {Promise<MembershipEvent[]>} Resolves to the member events in the room.
     */
    getAllRoomMembers(roomId: string, atToken?: string): Promise<MembershipEvent[]>;
    /**
     * Gets the membership events of users in the room which have a particular membership type. To change
     * the point in time the server should return membership events at, use `atToken`.
     * @param {string} roomId The room ID to get members in.
     * @param {Membership} membership The membership to search for.
     * @param {string?} atToken Optional batch token to use, or null for "now".
     * @returns {Promise<MembershipEvent[]>} Resolves to the membership events of the users in the room.
     */
    getRoomMembersByMembership(roomId: string, membership: Membership, atToken?: string): Promise<MembershipEvent[]>;
    /**
     * Gets the membership events of users in the room which lack a particular membership type. To change
     * the point in time the server should return membership events at, use `atToken`.
     * @param {string} roomId The room ID to get members in.
     * @param {Membership} notMembership The membership to NOT search for.
     * @param {string?} atToken Optional batch token to use, or null for "now".
     * @returns {Promise<MembershipEvent[]>} Resolves to the membership events of the users in the room.
     */
    getRoomMembersWithoutMembership(roomId: string, notMembership: Membership, atToken?: string): Promise<MembershipEvent[]>;
    private getRoomMembersAt;
    /**
     * Leaves the given room
     * @param {string} roomId the room ID to leave
     * @param {string=} reason Optional reason to be included as the reason for leaving the room.
     * @returns {Promise<any>} resolves when left
     */
    leaveRoom(roomId: string, reason?: string): Promise<any>;
    /**
     * Forgets the given room
     * @param {string} roomId the room ID to forget
     * @returns {Promise<{}>} Resolves when forgotten
     */
    forgetRoom(roomId: string): Promise<{}>;
    /**
     * Sends a read receipt for an event in a room
     * @param {string} roomId the room ID to send the receipt to
     * @param {string} eventId the event ID to set the receipt at
     * @returns {Promise<any>} resolves when the receipt has been sent
     */
    sendReadReceipt(roomId: string, eventId: string): Promise<any>;
    /**
     * Sets the typing status of the current user in a room
     * @param {string} roomId the room ID the user is typing in
     * @param {boolean} typing is the user currently typing
     * @param {number} timeout how long should the server preserve the typing state, in milliseconds
     * @returns {Promise<any>} resolves when the typing state has been set
     */
    setTyping(roomId: string, typing: boolean, timeout?: number): Promise<any>;
    /**
     * Replies to a given event with the given text. The event is sent with a msgtype of m.text.
     * The message will be encrypted if the client supports encryption and the room is encrypted.
     * @param {string} roomId the room ID to reply in
     * @param {any} event the event to reply to
     * @param {string} text the text to reply with
     * @param {string} html the HTML to reply with, or falsey to use the `text`
     * @returns {Promise<string>} resolves to the event ID which was sent
     */
    replyText(roomId: string, event: any, text: string, html?: string): Promise<string>;
    /**
     * Replies to a given event with the given HTML. The event is sent with a msgtype of m.text.
     * The message will be encrypted if the client supports encryption and the room is encrypted.
     * @param {string} roomId the room ID to reply in
     * @param {any} event the event to reply to
     * @param {string} html the HTML to reply with.
     * @returns {Promise<string>} resolves to the event ID which was sent
     */
    replyHtmlText(roomId: string, event: any, html: string): Promise<string>;
    /**
     * Replies to a given event with the given text. The event is sent with a msgtype of m.notice.
     * The message will be encrypted if the client supports encryption and the room is encrypted.
     * @param {string} roomId the room ID to reply in
     * @param {any} event the event to reply to
     * @param {string} text the text to reply with
     * @param {string} html the HTML to reply with, or falsey to use the `text`
     * @returns {Promise<string>} resolves to the event ID which was sent
     */
    replyNotice(roomId: string, event: any, text: string, html?: string): Promise<string>;
    /**
     * Replies to a given event with the given HTML. The event is sent with a msgtype of m.notice.
     * The message will be encrypted if the client supports encryption and the room is encrypted.
     * @param {string} roomId the room ID to reply in
     * @param {any} event the event to reply to
     * @param {string} html the HTML to reply with.
     * @returns {Promise<string>} resolves to the event ID which was sent
     */
    replyHtmlNotice(roomId: string, event: any, html: string): Promise<string>;
    /**
     * Sends a notice to the given room. The message will be encrypted if the client supports
     * encryption and the room is encrypted.
     * @param {string} roomId the room ID to send the notice to
     * @param {string} text the text to send
     * @returns {Promise<string>} resolves to the event ID that represents the message
     */
    sendNotice(roomId: string, text: string): Promise<string>;
    /**
     * Sends a notice to the given room with HTML content. The message will be encrypted if the client supports
     * encryption and the room is encrypted.
     * @param {string} roomId the room ID to send the notice to
     * @param {string} html the HTML to send
     * @returns {Promise<string>} resolves to the event ID that represents the message
     */
    sendHtmlNotice(roomId: string, html: string): Promise<string>;
    /**
     * Sends a text message to the given room. The message will be encrypted if the client supports
     * encryption and the room is encrypted.
     * @param {string} roomId the room ID to send the text to
     * @param {string} text the text to send
     * @returns {Promise<string>} resolves to the event ID that represents the message
     */
    sendText(roomId: string, text: string): Promise<string>;
    /**
     * Sends a text message to the given room with HTML content. The message will be encrypted if the client supports
     * encryption and the room is encrypted.
     * @param {string} roomId the room ID to send the text to
     * @param {string} html the HTML to send
     * @returns {Promise<string>} resolves to the event ID that represents the message
     */
    sendHtmlText(roomId: string, html: string): Promise<string>;
    /**
     * Sends a message to the given room. The message will be encrypted if the client supports
     * encryption and the room is encrypted.
     * @param {string} roomId the room ID to send the message to
     * @param {object} content the event content to send
     * @returns {Promise<string>} resolves to the event ID that represents the message
     */
    sendMessage(roomId: string, content: any): Promise<string>;
    /**
     * Sends an event to the given room. This will encrypt the event before sending if the room is
     * encrypted and the client supports encryption. Use sendRawEvent() to avoid this behaviour.
     * @param {string} roomId the room ID to send the event to
     * @param {string} eventType the type of event to send
     * @param {string} content the event body to send
     * @returns {Promise<string>} resolves to the event ID that represents the event
     */
    sendEvent(roomId: string, eventType: string, content: any): Promise<string>;
    /**
     * Sends an event to the given room.
     * @param {string} roomId the room ID to send the event to
     * @param {string} eventType the type of event to send
     * @param {string} content the event body to send
     * @returns {Promise<string>} resolves to the event ID that represents the event
     */
    sendRawEvent(roomId: string, eventType: string, content: any): Promise<string>;
    /**
     * Sends a state event to the given room
     * @param {string} roomId the room ID to send the event to
     * @param {string} type the event type to send
     * @param {string} stateKey the state key to send, should not be null
     * @param {string} content the event body to send
     * @returns {Promise<string>} resolves to the event ID that represents the message
     */
    sendStateEvent(roomId: string, type: string, stateKey: string, content: any): Promise<string>;
    /**
     * Redact an event in a given room
     * @param {string} roomId the room ID to send the redaction to
     * @param {string} eventId the event ID to redact
     * @param {String} reason an optional reason for redacting the event
     * @returns {Promise<string>} resolves to the event ID that represents the redaction
     */
    redactEvent(roomId: string, eventId: string, reason?: string | null): Promise<string>;
    /**
     * Creates a room. See the RoomCreateOptions interface
     * for more information on what to provide for `properties`. Note that creating
     * a room may cause the bot/appservice to raise a join event.
     * @param {RoomCreateOptions} properties the properties of the room.
     * @returns {Promise<string>} resolves to the room ID that represents the room
     */
    createRoom(properties?: RoomCreateOptions): Promise<string>;
    /**
     * Get the m.room.create event for a room, using the cached value if stored by the client.
     * @param roomId The room ID
     * @returns A create event.
     * @throws If the room does not exist, or you are not able to access the room.
     */
    getRoomCreateEvent(roomId: string): Promise<CreateEvent>;
    /**
     * Checks if a given user has a required power level required to send the given event.
     * @param userId the user ID to check the power level of
     * @param roomId the room ID to check the power level in
     * @param eventType the event type to look for in the `events` property of the power levels
     * @param isState true to indicate the event is intended to be a state event
     * @returns resolves to true if the user has the required power level, resolves to false otherwise
     */
    userHasPowerLevelFor(userId: string, roomId: string, eventType: string, isState: boolean): Promise<boolean>;
    /**
     * Checks if a given user has a required power level to perform the given action
     * @param {string} userId the user ID to check the power level of
     * @param {string} roomId the room ID to check the power level in
     * @param {PowerLevelAction} action the action to check power level for
     * @returns {Promise<boolean>} resolves to true if the user has the required power level, resolves to false otherwise
     */
    userHasPowerLevelForAction(userId: string, roomId: string, action: PowerLevelAction): Promise<boolean>;
    /**
     * Determines the boundary conditions for this client's ability to change another user's power level
     * in a given room. This will identify the maximum possible level this client can change the user to,
     * and if that change could even be possible. If the returned object indicates that the client can
     * change the power level of the user, the client is able to set the power level to any value equal
     * to or less than the maximum value.
     * @param {string} targetUserId The user ID to compare against.
     * @param {string} roomId The room ID to compare within.
     * @returns {Promise<PowerLevelBounds>} The bounds of the client's ability to change the user's power level.
     */
    calculatePowerLevelChangeBoundsOn(targetUserId: string, roomId: string): Promise<PowerLevelBounds>;
    /**
     * Sets the power level for a given user ID in the given room. Note that this is not safe to
     * call multiple times concurrently as changes are not atomic. This will throw an error if
     * the user lacks enough permission to change the power level, or if a power level event is
     * missing from the room.
     * @param {string} userId The user ID to change
     * @param {string} roomId The room ID to change the power level in
     * @param {number} newLevel The integer power level to set the user to.
     * @returns {Promise<any>} Resolves when complete.
     */
    setUserPowerLevel(userId: string, roomId: string, newLevel: number): Promise<any>;
    private getMediaEndpointPrefix;
    /**
     * Converts a MXC URI to an HTTP URL.
     * @param {string} mxc The MXC URI to convert
     * @returns {string} The HTTP URL for the content.
     */
    mxcToHttp(mxc: string): Promise<string>;
    /**
     * Converts a MXC URI to an HTTP URL for downsizing the content.
     * @param {string} mxc The MXC URI to convert and downsize.
     * @param {number} width The width, as an integer, for the thumbnail.
     * @param {number} height The height, as an intenger, for the thumbnail.
     * @param {"crop"|"scale"} method Whether to crop or scale (preserve aspect ratio) the content.
     * @returns {string} The HTTP URL for the downsized content.
     */
    mxcToHttpThumbnail(mxc: string, width: number, height: number, method: "crop" | "scale"): Promise<string>;
    /**
     * Uploads data to the homeserver's media repository. Note that this will <b>not</b> automatically encrypt
     * media as it cannot determine if the media should be encrypted.
     * @param {Buffer} data the content to upload.
     * @param {string} contentType the content type of the file. Defaults to application/octet-stream
     * @param {string} filename the name of the file. Optional.
     * @returns {Promise<string>} resolves to the MXC URI of the content
     */
    uploadContent(data: Buffer, contentType?: string, filename?: string): Promise<string>;
    /**
     * Download content from the homeserver's media repository. Note that this will <b>not</b> automatically decrypt
     * media as it cannot determine if the media is encrypted.
     * @param {string} mxcUrl The MXC URI for the content.
     * @param {string} allowRemote Indicates to the server that it should not attempt to fetch the
     * media if it is deemed remote. This is to prevent routing loops where the server contacts itself.
     * Defaults to true if not provided.
     * This is IGNORED if the content scanner is configured, as the API has no compatible option.
     * @returns {Promise<{data: Buffer, contentType: string}>} Resolves to the downloaded content.
     */
    downloadContent(mxcUrl: string, allowRemote?: boolean): Promise<{
        data: Buffer;
        contentType: string;
    }>;
    /**
     * Uploads data to the homeserver's media repository after downloading it from the
     * provided URL.
     * @param {string} url The URL to download content from.
     * @returns {Promise<string>} Resolves to the MXC URI of the content
     */
    uploadContentFromUrl(url: string): Promise<string>;
    /**
     * Upgrade a room. This will call the room upgrade endpoint on the homeserver, which will create a new room with some of the
     * state carried over. See the spec for which state will be carried over.
     * @param roomId The room to upgrade
     * @param newVersion The room version of the new room.
     * @see {@link https://spec.matrix.org/v1.15/client-server-api/#server-behaviour-19}
     * @returns The new room ID
     */
    upgradeRoom(roomId: string, newVersion: string): Promise<string>;
    /**
     * Determines the upgrade history for a given room as a doubly-linked list styled structure. Given
     * a room ID in the history of upgrades, the resulting `previous` array will hold any rooms which
     * are older than the given room. The resulting `newer` array will hold any rooms which are newer
     * versions of the room. Both arrays will be defined, but may be empty individually. Element zero
     * of each will always be the nearest to the given room ID and the last element will be the furthest
     * from the room. The given room will never be in either array.
     * @param {string} roomId the room ID to get the history of
     * @returns {Promise<{previous: RoomReference[], newer: RoomReference[]}>} Resolves to the room's
     * upgrade history
     */
    getRoomUpgradeHistory(roomId: string): Promise<{
        previous: RoomReference[];
        newer: RoomReference[];
        current: RoomReference;
    }>;
    /**
     * Creates a Space room.
     * @param {SpaceCreateOptions} opts The creation options.
     * @returns {Promise<Space>} Resolves to the created space.
     */
    createSpace(opts: SpaceCreateOptions): Promise<Space>;
    /**
     * Gets a Space.
     * This API does not work with unstable spaces (e.g. org.matrix.msc.1772.space)
     *
     * @throws If the room is not a space or there was an error
     * @returns {Promise<Space>} Resolves to the space.
     */
    getSpace(roomIdOrAlias: string): Promise<Space>;
    /**
     * Uploads One Time Keys for the current device.
     * @param {OTKs} keys The keys to upload.
     * @returns {Promise<OTKCounts>} Resolves to the current One Time Key counts when complete.
     */
    uploadDeviceOneTimeKeys(keys: OTKs): Promise<OTKCounts>;
    /**
     * Gets the current One Time Key counts.
     * @returns {Promise<OTKCounts>} Resolves to the One Time Key counts.
     */
    checkOneTimeKeyCounts(): Promise<OTKCounts>;
    /**
     * Uploads a fallback One Time Key to the server for usage. This will replace the existing fallback
     * key.
     * @param {FallbackKey} fallbackKey The fallback key.
     * @returns {Promise<OTKCounts>} Resolves to the One Time Key counts.
     */
    uploadFallbackKey(fallbackKey: FallbackKey): Promise<OTKCounts>;
    /**
     * Gets <b>unverified</b> device lists for the given users. The caller is expected to validate
     * and verify the device lists, including that the returned devices belong to the claimed users.
     *
     * Failures with federation are reported in the returned object. Users which did not fail a federation
     * lookup but have no devices will not appear in either the failures or in the returned devices.
     *
     * See https://matrix.org/docs/spec/client_server/r0.6.1#post-matrix-client-r0-keys-query for more
     * information.
     * @param {string[]} userIds The user IDs to query.
     * @param {number} federationTimeoutMs The default timeout for requesting devices over federation. Defaults to
     * 10 seconds.
     * @returns {Promise<MultiUserDeviceListResponse>} Resolves to the device list/errors for the requested user IDs.
     */
    getUserDevices(userIds: string[], federationTimeoutMs?: number): Promise<MultiUserDeviceListResponse>;
    /**
     * Gets a device list for the client's own account, with metadata. The devices are not verified
     * in this response, but should be active on the account.
     * @returns {Promise<OwnUserDevice[]>} Resolves to the active devices on the account.
     */
    getOwnDevices(): Promise<OwnUserDevice[]>;
    /**
     * Claims One Time Keys for a set of user devices, returning those keys. The caller is expected to verify
     * and validate the returned keys.
     *
     * Failures with federation are reported in the returned object.
     * @param {Record<string, Record<string, OTKAlgorithm>>} userDeviceMap The map of user IDs to device IDs to
     * OTKAlgorithm to request a claim for.
     * @param {number} federationTimeoutMs The default timeout for claiming keys over federation. Defaults to
     * 10 seconds.
     */
    claimOneTimeKeys(userDeviceMap: Record<string, Record<string, OTKAlgorithm>>, federationTimeoutMs?: number): Promise<OTKClaimResponse>;
    /**
     * Sends to-device messages to the respective users/devices.
     * @param {string} type The message type being sent.
     * @param {Record<string, Record<string, any>>} messages The messages to send, mapped as user ID to
     * device ID (or "*" to denote all of the user's devices) to message payload (content).
     * @returns {Promise<void>} Resolves when complete.
     */
    sendToDevices(type: string, messages: Record<string, Record<string, any>>): Promise<void>;
    /**
     * Get information about the latest room key backup version.
     * @returns {Promise<IKeyBackupInfoRetrieved|null>} Resolves to the retrieved key backup info,
     * or null if there is no existing backup.
     */
    getKeyBackupVersion(): Promise<IKeyBackupInfoRetrieved | null>;
    /**
     * Create a new room key backup.
     * @param {IKeyBackupInfoUnsigned} info The properties of the key backup to create,
     * with its auth_data left unsigned.
     * @returns {Promise<IKeyBackupVersion>} Resolves to the version id of the new backup.
     */
    signAndCreateKeyBackupVersion(info: IKeyBackupInfoUnsigned): Promise<IKeyBackupVersion>;
    /**
     * Update an existing room key backup.
     * @param {KeyBackupVersion} version The key backup version to update.
     * @param {IKeyBackupInfoUpdate} info The properties of the key backup to be applied.
     * @returns {Promise<void>} Resolves when complete.
     */
    updateKeyBackupVersion(version: KeyBackupVersion, info: IKeyBackupInfoUpdate): Promise<void>;
    /**
     * Enable backing up of room keys.
     * @param {IKeyBackupInfoRetrieved} info The configuration for key backup behaviour,
     * as returned by {@link getKeyBackupVersion}.
     * @returns {Promise<void>} Resolves when complete.
     */
    enableKeyBackup(info: IKeyBackupInfoRetrieved): Promise<void>;
    /**
     * Disable backing up of room keys.
     */
    disableKeyBackup(): Promise<void>;
    /**
     * Exports a set of keys for a given session.
     * @param roomId The room ID for the session.
     * @param sessionId The session ID.
     * @returns An array of session keys.
     */
    exportRoomKeysForSession(roomId: string, sessionId: string): Promise<import("./models/KeyBackup").IMegolmSessionDataExport[]>;
    /**
     * Get relations for a given event.
     * @param {string} roomId The room ID to for the given event.
     * @param {string} eventId The event ID to list relations for.
     * @param {string?} relationType The type of relations (e.g. `m.room.member`) to filter for. Optional.
     * @param {string?} eventType The type of event to look for (e.g. `m.room.member`). Optional.
     * @returns {Promise<{chunk: any[]}>} Resolves to an object containing the chunk of relations
     */
    getRelationsForEvent(roomId: string, eventId: string, relationType?: string, eventType?: string): Promise<{
        chunk: any[];
    }>;
    /**
     * Performs a web request to the homeserver, applying appropriate authorization headers for
     * this client.
     * @param {"GET"|"POST"|"PUT"|"DELETE"} method The HTTP method to use in the request
     * @param {string} endpoint The endpoint to call. For example: "/_matrix/client/v3/account/whoami"
     * @param {any} qs The query string to send. Optional.
     * @param {any} body The request body to send. Optional. Will be converted to JSON unless the type is a Buffer.
     * @param {number} timeout The number of milliseconds to wait before timing out.
     * @param {boolean} raw If true, the raw response will be returned instead of the response body.
     * @param {string} contentType The content type to send. Only used if the `body` is a Buffer.
     * @param {string} noEncoding Set to true to disable encoding, and return a Buffer. Defaults to false
     * @returns {Promise<any>} Resolves to the response (body), rejected if a non-2xx status code was returned.
     */
    doRequest(method: any, endpoint: any, qs?: any, body?: any, timeout?: number, raw?: boolean, contentType?: string, noEncoding?: boolean, opts?: DoHttpRequestOpts): Promise<any>;
}
export interface RoomDirectoryLookupResponse {
    roomId: string;
    residentServers: string[];
}
export interface RoomReference {
    /**
     * The room ID being referenced
     */
    roomId: string;
    /**
     * The version of the room at the time
     */
    version: string;
    /**
     * If going backwards, the tombstone event ID, otherwise the creation
     * event. If the room can't be verified, this will be null. Will be
     * null if this reference is to the current room.
     */
    refEventId: string;
}

import { EventEmitter } from "events";
import { Intent } from "./Intent";
import { IAppserviceCryptoStorageProvider, IAppserviceStorageProvider, IJoinRoomStrategy, IPreprocessor, MatrixClient, Metrics } from "..";
import { MatrixBridge } from "./MatrixBridge";
import { AppserviceApis, PingHomeserverResponse } from "../AppserviceApis";
/**
 * Represents an application service's registration file. This is expected to be
 * loaded from another source, such as a YAML file.
 * @category Application services
 */
export interface IAppserviceRegistration {
    /**
     * Optional ID for the appplication service. Used by homeservers to track which application
     * service registers what.
     */
    id?: string;
    /**
     * URL at which the application service can be contacted. If not in use, this must be `null`.
     */
    url: string | null;
    /**
     * The token the application service uses to communicate with the homeserver.
     */
    as_token: string;
    /**
     * The token the homeserver uses to communicate with the application service.
     */
    hs_token: string;
    /**
     * The application service's own localpart (eg: "_irc_bot" in the user ID "@_irc_bot:domain.com")
     */
    sender_localpart: string;
    /**
     * The various namespaces the application service can support.
     */
    namespaces: {
        /**
         * The user namespaces the application service is requesting.
         */
        users?: {
            /**
             * Whether or not the application service holds an exclusive lock on the namespace. This
             * means that no other user on the homeserver may register users that match this namespace.
             */
            exclusive: boolean;
            /**
             * The regular expression that the homeserver uses to determine if a user is in this namespace.
             */
            regex: string;
        }[];
        /**
         * The room namespaces the application service is requesting. This is not for alises.
         */
        rooms?: {
            /**
             * Whether or not the application service holds an exclusive lock on the namespace.
             */
            exclusive: boolean;
            /**
             * The regular expression that the homeserver uses to determine if a user is in this namespace.
             */
            regex: string;
        }[];
        /**
         * The room alias namespaces the application service is requesting.
         */
        aliases?: {
            /**
             * Whether or not the application service holds an exclusive lock on the namespace. This means
             * that no other user on the homeserver may register aliases that match this namespace.
             */
            exclusive: boolean;
            /**
             * The regular expression that the homeserver uses to determine if an alias is in this namespace.
             */
            regex: string;
        }[];
    };
    /**
     * The protocols the application service supports. Optional.
     */
    protocols?: string[];
    /**
     * If the application service is rate limited by the homeserver. Optional.
     */
    rate_limited?: boolean;
    /**
     * **Experimental**
     *
     * Should the application service receive ephemeral events from the homeserver. Optional.
     * @see https://github.com/matrix-org/matrix-doc/pull/2409
     */
    "de.sorunome.msc2409.push_ephemeral"?: boolean;
    /**
     * ** Experimental **
     *
     * Should the AS use the new device management APIs. Optional.
     * @see https://github.com/matrix-org/matrix-spec-proposals/pull/4190
     */
    "io.element.msc4190"?: boolean;
}
/**
 * General options for the application service
 * @category Application services
 */
export interface IAppserviceOptions {
    /**
     * The port to listen for requests from the homeserver on.
     */
    port: number;
    /**
     * The bind address to listen for requests on.
     */
    bindAddress: string;
    /**
     * The name of the homeserver, as presented over federation (eg: "matrix.org")
     */
    homeserverName: string;
    /**
     * The URL to the homeserver's client server API (eg: "https://matrix.org")
     */
    homeserverUrl: string;
    /**
     * The storage provider to use for this application service.
     */
    storage?: IAppserviceStorageProvider;
    /**
     * The storage provider to use for setting up encryption. Encryption will be
     * disabled for all intents and the appservice if not configured.
     */
    cryptoStorage?: IAppserviceCryptoStorageProvider;
    /**
     * The registration for this application service.
     */
    registration: IAppserviceRegistration;
    /**
     * The join strategy to use for all intents, if any.
     */
    joinStrategy?: IJoinRoomStrategy;
    /**
     * If provided, use this as the user prefix rather than calculating from the namespace.
     */
    userPrefix?: string;
    /**
     * If provided, use this as the alias prefix rather than calculating from the namespace.
     */
    aliasPrefix?: string;
    /**
     * Options for how Intents are handled.
     */
    intentOptions?: {
        /**
         * The maximum number of intents to keep cached. Defaults to 10 thousand.
         */
        maxCached?: number;
        /**
         * The maximum age in milliseconds to keep an Intent around for, provided
         * the maximum number of intents has been reached. Defaults to 60 minutes.
         */
        maxAgeMs?: number;
        /**
         * If false (default), crypto will not be automatically set up for all intent
         * instances - it will need to be manually enabled with
         * `await intent.enableEncryption()`.
         *
         * If true, crypto will be automatically set up.
         *
         * Note that the appservice bot account is considered an intent.
         */
        encryption?: boolean;
        /**
         * Enable the content scanner API when creating new intents. This means
         * that all media requests will be proxied through the scanner.
         */
        enableContentScanner?: boolean;
    };
}
/**
 * Represents an application service. This provides helper utilities such as tracking
 * of user intents (clients that are aware of their membership in rooms).
 * @category Application services
 */
export declare class Appservice extends EventEmitter {
    private options;
    /**
     * The metrics instance for this appservice. This will raise all metrics
     * from this appservice instance as well as any intents/MatrixClients created
     * by the appservice.
     */
    readonly metrics: Metrics;
    private readonly userPrefix;
    private readonly aliasPrefix;
    private readonly registration;
    private readonly storage;
    private readonly cryptoStorage;
    private readonly bridgeInstance;
    private pingRequest?;
    private app;
    private appServer;
    private intentsCache;
    private eventProcessors;
    private pendingTransactions;
    /**
     * Appservice specific APIs.
     */
    readonly apis: AppserviceApis;
    /**
     * A cache of intents for the purposes of decrypting rooms
     */
    private cryptoClientForRoomId;
    /**
     * Creates a new application service.
     * @param {IAppserviceOptions} options The options for the application service.
     */
    constructor(options: IAppserviceOptions);
    /**
     * Gets the express app instance which is serving requests. Not recommended for
     * general usage, but may be used to append routes to the web server.
     */
    get expressAppInstance(): import("express-serve-static-core").Express;
    /**
     * Gets the bridge-specific APIs for this application service.
     */
    get bridge(): MatrixBridge;
    /**
     * Get the application service's "bot" user ID (the sender_localpart).
     */
    get botUserId(): string;
    /**
     * Get the application service's "bot" Intent (the sender_localpart).
     * @returns {Intent} The intent for the application service itself.
     */
    get botIntent(): Intent;
    /**
     * Get the application service's "bot" MatrixClient (the sender_localpart).
     * Normally the botIntent should be used to ensure that the bot user is safely
     * handled.
     * @returns {MatrixClient} The client for the application service itself.
     */
    get botClient(): MatrixClient;
    /**
     * Starts the application service, opening the bind address to begin processing requests.
     * @returns {Promise<void>} resolves when started
     */
    begin(): Promise<void>;
    /**
     * Stops the application service, freeing the web server.
     */
    stop(): void;
    /**
     * Gets an intent for a given localpart. The user ID will be formed with the domain name given
     * in the constructor.
     * @param localpart The localpart to get an Intent for.
     * @returns {Intent} An Intent for the user.
     */
    getIntent(localpart: string): Intent;
    /**
     * Gets a full user ID for a given localpart. The user ID will be formed with the domain name given
     * in the constructor.
     * @param localpart The localpart to get a user ID for.
     * @returns {string} The user's ID.
     */
    getUserId(localpart: string): string;
    /**
     * Gets an Intent for a given user suffix. The prefix is automatically detected from the registration
     * options.
     * Note: If the registration file contains *multiple* prefixes then this will throw.
     * @param suffix The user's suffix
     * @returns {Intent} An Intent for the user.
     */
    getIntentForSuffix(suffix: string): Intent;
    /**
     * Gets a full user ID for a given suffix. The prefix is automatically detected from the registration
     * options.
     * Note: If the registration file contains *multiple* prefixes then this will throw.
     * @param suffix The user's suffix
     * @returns {string} The user's ID.
     */
    getUserIdForSuffix(suffix: string): string;
    /**
     * Gets an Intent for a given user ID.
     * @param {string} userId The user ID to get an Intent for.
     * @returns {Intent} An Intent for the user.
     */
    getIntentForUserId(userId: string): Intent;
    /**
     * Gets the suffix for the provided user ID. If the user ID is not a namespaced
     * user, this will return a falsey value.
     * Note: If the registration file contains *multiple* prefixes then this will throw.
     * @param {string} userId The user ID to parse
     * @returns {string} The suffix from the user ID.
     */
    getSuffixForUserId(userId: string): string;
    /**
     * Determines if a given user ID is namespaced by this application service.
     * @param {string} userId The user ID to check
     * @returns {boolean} true if the user is namespaced, false otherwise
     */
    isNamespacedUser(userId: string): boolean;
    /**
     * Gets a full alias for a given localpart. The alias will be formed with the domain name given
     * in the constructor.
     * @param localpart The localpart to get an alias for.
     * @returns {string} The alias.
     */
    getAlias(localpart: string): string;
    /**
     * Gets a full alias for a given suffix. The prefix is automatically detected from the registration
     * options.
     * Note: If the registration file contains *multiple* prefixes then this will throw.
     * @param suffix The alias's suffix
     * @returns {string} The alias.
     */
    getAliasForSuffix(suffix: string): string;
    /**
     * Gets the localpart of an alias for a given suffix. The prefix is automatically detected from the registration
     * options. Useful for the createRoom endpoint.
     * Note: If the registration file contains *multiple* prefixes then this will throw.
     * @param suffix The alias's suffix
     * @returns {string} The alias localpart.
     */
    getAliasLocalpartForSuffix(suffix: string): string;
    /**
     * Gets the suffix for the provided alias. If the alias is not a namespaced
     * alias, this will return a falsey value.
     * Note: If the registration file contains *multiple* prefixes then this will throw.
     * @param {string} alias The alias to parse
     * @returns {string} The suffix from the alias.
     */
    getSuffixForAlias(alias: string): string;
    /**
     * Determines if a given alias is namespaced by this application service.
     * @param {string} alias The alias to check
     * @returns {boolean} true if the alias is namespaced, false otherwise
     */
    isNamespacedAlias(alias: string): boolean;
    /**
     * Adds a preprocessor to the event pipeline. When this appservice encounters an event, it
     * will try to run it through the preprocessors it can in the order they were added.
     * @param {IPreprocessor} preprocessor the preprocessor to add
     */
    addPreprocessor(preprocessor: IPreprocessor): void;
    /**
     * Sets the visibility of a room in the appservice's room directory.
     * @param {string} networkId The network ID to group the room under.
     * @param {string} roomId The room ID to manipulate the visibility of.
     * @param {"public" | "private"} visibility The visibility to set for the room.
     * @return {Promise<any>} resolves when the visibility has been updated.
     */
    setRoomDirectoryVisibility(networkId: string, roomId: string, visibility: "public" | "private"): Promise<any>;
    /**
     * Ping the homeserver to check for connectivity and await the response.
     * @returns Resolves if the ping succeded, otherwise rejects.
     */
    pingHomeserver(): Promise<PingHomeserverResponse>;
    private processEphemeralEvent;
    private processEvent;
    private processMembershipEvent;
    private isAuthed;
    private decryptAppserviceEvent;
    private handleTransaction;
    private onTransaction;
    private onUser;
    private onRoomAlias;
    private onKeysClaim;
    private onKeysQuery;
    private onThirdpartyProtocol;
    private handleThirdpartyObject;
    private onThirdpartyUser;
    private onThirdpartyLocation;
    private onPing;
}

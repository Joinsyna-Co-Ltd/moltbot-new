import { MatrixClient } from "../MatrixClient";
import { IMegolmEncrypted, IOlmEncrypted, IToDeviceMessage, OTKAlgorithm, OTKCounts, Signatures } from "../models/Crypto";
import { EncryptedRoomEvent } from "../models/events/EncryptedRoomEvent";
import { RoomEvent } from "../models/events/RoomEvent";
import { EncryptedFile } from "../models/events/MessageEvent";
import { IKeyBackupInfoRetrieved } from "../models/KeyBackup";
/**
 * Manages encryption for a MatrixClient. Get an instance from a MatrixClient directly
 * rather than creating one manually.
 * @category Encryption
 */
export declare class CryptoClient {
    private client;
    private ready;
    private deviceId;
    private deviceEd25519;
    private deviceCurve25519;
    private roomTracker;
    private engine;
    constructor(client: MatrixClient);
    private get storage();
    /**
     * The device ID for the MatrixClient.
     */
    get clientDeviceId(): string;
    /**
     * The device's Ed25519 identity
     */
    get clientDeviceEd25519(): string;
    /**
     * Whether or not the crypto client is ready to be used. If not ready, prepare() should be called.
     * @see prepare
     */
    get isReady(): boolean;
    /**
     * Prepares the crypto client for usage.
     * @param {string[]} roomIds The room IDs the MatrixClient is joined to.
     */
    prepare(): Promise<void>;
    /**
     * Handles a room event.
     * @internal
     * @param roomId The room ID.
     * @param event The event.
     */
    onRoomEvent(roomId: string, event: any): Promise<void>;
    /**
     * Handles a room join.
     * @internal
     * @param roomId The room ID.
     */
    onRoomJoin(roomId: string): Promise<void>;
    /**
     * Exports a set of keys for a given session.
     * @param roomId The room ID for the session.
     * @param sessionId The session ID.
     * @returns An array of session keys.
     */
    exportRoomKeysForSession(roomId: string, sessionId: string): Promise<import("../models/KeyBackup").IMegolmSessionDataExport[]>;
    /**
     * Checks if a room is encrypted.
     * @param {string} roomId The room ID to check.
     * @returns {Promise<boolean>} Resolves to true if encrypted, false otherwise.
     */
    isRoomEncrypted(roomId: string): Promise<boolean>;
    /**
     * Updates the client's sync-related data.
     * @param {Array.<IToDeviceMessage<IOlmEncrypted>>} toDeviceMessages The to-device messages received.
     * @param {OTKCounts} otkCounts The current OTK counts.
     * @param {OTKAlgorithm[]} unusedFallbackKeyAlgs The unused fallback key algorithms.
     * @param {string[]} changedDeviceLists The user IDs which had device list changes.
     * @param {string[]} leftDeviceLists The user IDs which the server believes we no longer need to track.
     * @returns {Promise<void>} Resolves when complete.
     */
    updateSyncData(toDeviceMessages: IToDeviceMessage<IOlmEncrypted>[], otkCounts: OTKCounts, unusedFallbackKeyAlgs: OTKAlgorithm[], changedDeviceLists: string[], leftDeviceLists: string[]): Promise<void>;
    /**
     * Signs an object using the device keys.
     * @param {object} obj The object to sign.
     * @returns {Promise<Signatures>} The signatures for the object.
     */
    sign(obj: object): Promise<Signatures>;
    /**
     * Encrypts the details of a room event, returning an encrypted payload to be sent in an
     * `m.room.encrypted` event to the room. If needed, this function will send decryption keys
     * to the appropriate devices in the room (this happens when the Megolm session rotates or
     * gets created).
     * @param {string} roomId The room ID to encrypt within. If the room is not encrypted, an
     * error is thrown.
     * @param {string} eventType The event type being encrypted.
     * @param {any} content The event content being encrypted.
     * @returns {Promise<IMegolmEncrypted>} Resolves to the encrypted content for an `m.room.encrypted` event.
     */
    encryptRoomEvent(roomId: string, eventType: string, content: any): Promise<IMegolmEncrypted>;
    /**
     * Decrypts a room event. Currently only supports Megolm-encrypted events (default for this SDK).
     * @param {EncryptedRoomEvent} event The encrypted event.
     * @param {string} roomId The room ID where the event was sent.
     * @returns {Promise<RoomEvent<unknown>>} Resolves to a decrypted room event, or rejects/throws with
     * an error if the event is undecryptable.
     */
    decryptRoomEvent(event: EncryptedRoomEvent, roomId: string): Promise<RoomEvent<unknown>>;
    /**
     * Encrypts a file for uploading in a room, returning the encrypted data and information
     * to include in a message event (except media URL) for sending.
     * @param {Buffer} file The file to encrypt.
     * @returns {{buffer: Buffer, file: Omit<EncryptedFile, "url">}} Resolves to the encrypted
     * contents and file information.
     */
    encryptMedia(file: Buffer): Promise<{
        buffer: Buffer;
        file: Omit<EncryptedFile, "url">;
    }>;
    /**
     * Decrypts a previously-uploaded encrypted file, validating the fields along the way.
     * @param {EncryptedFile} file The file to decrypt.
     * @returns {Promise<Buffer>} Resolves to the decrypted file contents.
     */
    decryptMedia(file: EncryptedFile): Promise<Buffer>;
    /**
     * Enable backing up of room keys.
     * @param {IKeyBackupInfoRetrieved} info The configuration for key backup behaviour,
     * as returned by {@link MatrixClient#getKeyBackupVersion}.
     * @returns {Promise<void>} Resolves once backups have been enabled.
     */
    enableKeyBackup(info: IKeyBackupInfoRetrieved): Promise<void>;
    /**
     * Disable backing up of room keys.
     */
    disableKeyBackup(): Promise<void>;
    private readonly onToDeviceMessage;
}

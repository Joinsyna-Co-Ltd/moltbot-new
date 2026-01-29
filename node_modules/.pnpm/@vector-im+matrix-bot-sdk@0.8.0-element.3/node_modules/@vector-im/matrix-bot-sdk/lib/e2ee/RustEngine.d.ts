import { OlmMachine } from "@matrix-org/matrix-sdk-crypto-nodejs";
import * as AsyncLock from "async-lock";
import { MatrixClient } from "../MatrixClient";
import { ICryptoRoomInformation } from "./ICryptoRoomInformation";
import { IKeyBackupInfoRetrieved, IMegolmSessionDataExport } from "../models/KeyBackup";
/**
 * @internal
 */
export declare const SYNC_LOCK_NAME = "sync";
/**
 * @internal
 */
export declare class RustEngine {
    readonly machine: OlmMachine;
    private client;
    readonly lock: AsyncLock;
    readonly trackedUsersToAdd: Set<string>;
    addTrackedUsersPromise: Promise<void> | undefined;
    private keyBackupVersion;
    private keyBackupWaiter;
    private backupEnabled;
    isBackupEnabled(): boolean;
    constructor(machine: OlmMachine, client: MatrixClient);
    run(): Promise<void>;
    private runOnly;
    addTrackedUsers(userIds: string[]): Promise<void>;
    prepareEncrypt(roomId: string, roomInfo: ICryptoRoomInformation): Promise<void>;
    enableKeyBackup(info: IKeyBackupInfoRetrieved): Promise<void>;
    disableKeyBackup(): Promise<void>;
    private actuallyDisableKeyBackup;
    backupRoomKeys(): Promise<void>;
    exportRoomKeysForSession(roomId: string, sessionId: string): Promise<IMegolmSessionDataExport[]>;
    private backupRoomKeysIfEnabled;
    private actuallyBackupRoomKeys;
    private processKeysClaimRequest;
    private processKeysUploadRequest;
    private processKeysQueryRequest;
    private processToDeviceRequest;
    private processKeysBackupRequest;
}

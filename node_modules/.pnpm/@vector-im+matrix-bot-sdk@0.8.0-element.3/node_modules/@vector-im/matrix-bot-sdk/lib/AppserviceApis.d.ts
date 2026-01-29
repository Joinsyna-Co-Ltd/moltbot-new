import type { MatrixClient } from "./MatrixClient";
export interface PingHomeserverResponse {
    duration_ms: number;
}
/**
 * APIs for use within the scope of an appservice.
 */
export declare class AppserviceApis {
    private readonly client;
    private readonly appserviceId?;
    /**
     *
     * @param client A client with the appservice token configured.
     * @param appserviceId The `id` of the appservice, as per its registration file.
     */
    constructor(client: MatrixClient, appserviceId?: string);
    /**
     * This API asks the homeserver to call the /_matrix/app/v1/ping endpoint on the application service
     * to ensure that the homeserver can communicate with the application service.
     * @param transactionId A unique ID that identifies the ping request.
     */
    pingHomeserver(transactionId: string): Promise<PingHomeserverResponse>;
}

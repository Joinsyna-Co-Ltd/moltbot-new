"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppserviceApis = void 0;
/**
 * APIs for use within the scope of an appservice.
 */
class AppserviceApis {
    client;
    appserviceId;
    /**
     *
     * @param client A client with the appservice token configured.
     * @param appserviceId The `id` of the appservice, as per its registration file.
     */
    constructor(client, appserviceId) {
        this.client = client;
        this.appserviceId = appserviceId;
    }
    /**
     * This API asks the homeserver to call the /_matrix/app/v1/ping endpoint on the application service
     * to ensure that the homeserver can communicate with the application service.
     * @param transactionId A unique ID that identifies the ping request.
     */
    pingHomeserver(transactionId) {
        if (!this.appserviceId) {
            throw Error('No `id` given in registration information. Cannot ping homeserver');
        }
        return this.client.doRequest("POST", `/_matrix/client/v1/appservice/${this.appserviceId}/ping`, undefined, { transaction_id: transactionId });
    }
}
exports.AppserviceApis = AppserviceApis;
//# sourceMappingURL=AppserviceApis.js.map
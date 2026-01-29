"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminApis = void 0;
const SynapseAdminApis_1 = require("./SynapseAdminApis");
/**
 * Access to various administrative APIs.
 * @category Admin APIs
 */
class AdminApis {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Gets access to the Synapse administrative APIs object.
     */
    get synapse() {
        return new SynapseAdminApis_1.SynapseAdminApis(this.client);
    }
    /**
     * Gets information about a particular user.
     * @param {string} userId the user ID to lookup
     * @returns {Promise<WhoisInfo>} resolves to the whois information
     */
    whoisUser(userId) {
        return this.client.doRequest("GET", "/_matrix/client/v3/admin/whois/" + encodeURIComponent(userId));
    }
}
exports.AdminApis = AdminApis;
//# sourceMappingURL=AdminApis.js.map
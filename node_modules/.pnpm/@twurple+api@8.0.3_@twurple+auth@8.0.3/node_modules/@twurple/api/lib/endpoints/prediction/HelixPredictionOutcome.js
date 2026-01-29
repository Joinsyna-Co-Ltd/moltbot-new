import { __decorate } from "tslib";
import { Enumerable } from '@d-fischer/shared-utils';
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
import { HelixPredictor } from './HelixPredictor.js';
/**
 * A possible outcome in a channel prediction.
 */
let HelixPredictionOutcome = class HelixPredictionOutcome extends DataObject {
    /** @internal */ _client;
    /** @internal */
    constructor(data, client) {
        super(data);
        this._client = client;
    }
    /**
     * The ID of the outcome.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The title of the outcome.
     */
    get title() {
        return this[rawDataSymbol].title;
    }
    /**
     * The number of users that guessed the outcome.
     */
    get users() {
        return this[rawDataSymbol].users;
    }
    /**
     * The total number of channel points that were spent on guessing the outcome.
     */
    get totalChannelPoints() {
        return this[rawDataSymbol].channel_points;
    }
    /**
     * The color of the outcome.
     */
    get color() {
        return this[rawDataSymbol].color;
    }
    /**
     * The top predictors of the outcome.
     */
    get topPredictors() {
        return this[rawDataSymbol].top_predictors?.map(data => new HelixPredictor(data, this._client)) ?? [];
    }
};
__decorate([
    Enumerable(false)
], HelixPredictionOutcome.prototype, "_client", void 0);
HelixPredictionOutcome = __decorate([
    rtfm('api', 'HelixPredictionOutcome', 'id')
], HelixPredictionOutcome);
export { HelixPredictionOutcome };

import { __decorate } from "tslib";
import { DataObject, rawDataSymbol, rtfm } from '@twurple/common';
/**
 * An object representing monetary amount and currency information for charity donations/goals.
 */
let HelixCharityCampaignAmount = class HelixCharityCampaignAmount extends DataObject {
    /**
     * The monetary amount. The amount is specified in the currency’s minor unit.
     * For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550.
     */
    get value() {
        return this[rawDataSymbol].value;
    }
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal places.
     * Use this number to translate `value` from minor units to major units by using the formula:
     *
     * `value / 10^decimalPlaces`
     */
    get decimalPlaces() {
        return this[rawDataSymbol].decimal_places;
    }
    /**
     * The localized monetary amount based on the value and the decimal places of the currency.
     * For example, the minor units for USD is cents which uses two decimal places, so if `value` is 550, `localizedValue` is set to 5.50.
     */
    get localizedValue() {
        return this.value / 10 ** this.decimalPlaces;
    }
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in `value`.
     */
    get currency() {
        return this[rawDataSymbol].currency;
    }
};
HelixCharityCampaignAmount = __decorate([
    rtfm('api', 'HelixCharityCampaignAmount')
], HelixCharityCampaignAmount);
export { HelixCharityCampaignAmount };

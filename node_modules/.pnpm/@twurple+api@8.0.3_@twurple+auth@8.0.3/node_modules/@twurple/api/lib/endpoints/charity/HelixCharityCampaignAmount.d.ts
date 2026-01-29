import { DataObject } from '@twurple/common';
import { type HelixCharityCampaignAmountData } from '../../interfaces/endpoints/charity.external.js';
/**
 * An object representing monetary amount and currency information for charity donations/goals.
 */
export declare class HelixCharityCampaignAmount extends DataObject<HelixCharityCampaignAmountData> {
    /**
     * The monetary amount. The amount is specified in the currency’s minor unit.
     * For example, the minor units for USD is cents, so if the amount is $5.50 USD, `value` is set to 550.
     */
    get value(): number;
    /**
     * The number of decimal places used by the currency. For example, USD uses two decimal places.
     * Use this number to translate `value` from minor units to major units by using the formula:
     *
     * `value / 10^decimalPlaces`
     */
    get decimalPlaces(): number;
    /**
     * The localized monetary amount based on the value and the decimal places of the currency.
     * For example, the minor units for USD is cents which uses two decimal places, so if `value` is 550, `localizedValue` is set to 5.50.
     */
    get localizedValue(): number;
    /**
     * The ISO-4217 three-letter currency code that identifies the type of currency in `value`.
     */
    get currency(): string;
}
//# sourceMappingURL=HelixCharityCampaignAmount.d.ts.map
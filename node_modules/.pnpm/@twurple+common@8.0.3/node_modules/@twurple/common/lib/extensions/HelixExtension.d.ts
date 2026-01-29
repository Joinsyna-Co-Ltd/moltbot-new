import { DataObject } from '../DataObject.js';
import { type HelixExtensionConfigurationLocation, type HelixExtensionData, type HelixExtensionIconSize, type HelixExtensionState, type HelixExtensionSubscriptionsSupportLevel } from './HelixExtension.external.js';
/**
 * A Twitch Extension.
 */
export declare class HelixExtension extends DataObject<HelixExtensionData> {
    /**
     * The name of the extension's author.
     */
    get authorName(): string;
    /**
     * Whether bits are enabled for the extension.
     */
    get bitsEnabled(): boolean;
    /**
     * Whether the extension can be installed.
     */
    get installable(): boolean;
    /**
     * The location of the extension's configuration.
     */
    get configurationLocation(): HelixExtensionConfigurationLocation;
    /**
     * The extension's description.
     */
    get description(): string;
    /**
     * The URL of the extension's terms of service.
     */
    get tosUrl(): string;
    /**
     * Whether the extension has support for sending chat messages.
     */
    get hasChatSupport(): boolean;
    /**
     * The URL of the extension's default sized icon.
     */
    get iconUrl(): string;
    /**
     * Gets the URL of the extension's icon in the given size.
     *
     * @param size The size of the icon.
     */
    getIconUrl(size: HelixExtensionIconSize): string;
    /**
     * The extension's ID.
     */
    get id(): string;
    /**
     * The extension's name.
     */
    get name(): string;
    /**
     * The URL of the extension's privacy policy.
     */
    get privacyPolicyUrl(): string;
    /**
     * Whether the extension requests its users to share their identity with it.
     */
    get requestsIdentityLink(): boolean;
    /**
     * The URLs of the extension's screenshots.
     */
    get screenshotUrls(): string[];
    /**
     * The extension's activity state.
     */
    get state(): HelixExtensionState;
    /**
     * The extension's level of support for subscriptions.
     */
    get subscriptionsSupportLevel(): HelixExtensionSubscriptionsSupportLevel;
    /**
     * The extension's feature summary.
     */
    get summary(): string;
    /**
     * The extension's support email address.
     */
    get supportEmail(): string;
    /**
     * The extension's version.
     */
    get version(): string;
    /**
     * The extension's feature summary for viewers.
     */
    get viewerSummary(): string;
    /**
     * The extension's feature summary for viewers.
     *
     * @deprecated Use `viewerSummary` instead.
     */
    get viewerSummery(): string;
    /**
     * The extension's allowed configuration URLs.
     */
    get allowedConfigUrls(): string[];
    /**
     * The extension's allowed panel URLs.
     */
    get allowedPanelUrls(): string[];
    /**
     * The URL shown when a viewer opens the extension on a mobile device.
     *
     * If the extension does not have a mobile view, this is null.
     */
    get mobileViewerUrl(): string | null;
    /**
     * The URL shown to the viewer when the extension is shown as a panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelViewerUrl(): string | null;
    /**
     * The height of the extension panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelHeight(): number | null;
    /**
     * Whether the extension can link to external content from its panel view.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelCanLinkExternalContent(): boolean | null;
    /**
     * The URL shown to the viewer when the extension is shown as a video overlay.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayViewerUrl(): string | null;
    /**
     * Whether the extension can link to external content from its overlay view.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayCanLinkExternalContent(): boolean | null;
    /**
     * The URL shown to the viewer when the extension is shown as a video component.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentViewerUrl(): string | null;
    /**
     * The aspect width of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectWidth(): number | null;
    /**
     * The aspect height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectHeight(): number | null;
    /**
     * The horizontal aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioX(): number | null;
    /**
     * The vertical aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioY(): number | null;
    /**
     * Whether the extension's component view should automatically scale.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAutoScales(): boolean | null;
    /**
     * The base width of the extension's component view to use for scaling.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentScalePixels(): number | null;
    /**
     * The target height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentTargetHeight(): number | null;
    /**
     * The size of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentSize(): number | null;
    /**
     * Whether zooming is enabled for the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoom(): boolean | null;
    /**
     * The zoom pixels of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoomPixels(): number | null;
    /**
     * Whether the extension can link to external content from its component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentCanLinkExternalContent(): boolean | null;
    /**
     * The URL shown to the viewer when the extension's configuration page is shown.
     *
     * If the extension does not have a config view, this is null.
     */
    get configViewerUrl(): string | null;
    /**
     * Whether the extension can link to external content from its config view.
     *
     * If the extension does not have a config view, this is null.
     */
    get configCanLinkExternalContent(): boolean | null;
}
//# sourceMappingURL=HelixExtension.d.ts.map
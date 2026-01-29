import { __decorate } from "tslib";
import { DataObject, rawDataSymbol } from '../DataObject.js';
import { rtfm } from '../rtfm.js';
/**
 * A Twitch Extension.
 */
let HelixExtension = class HelixExtension extends DataObject {
    /**
     * The name of the extension's author.
     */
    get authorName() {
        return this[rawDataSymbol].author_name;
    }
    /**
     * Whether bits are enabled for the extension.
     */
    get bitsEnabled() {
        return this[rawDataSymbol].bits_enabled;
    }
    /**
     * Whether the extension can be installed.
     */
    get installable() {
        return this[rawDataSymbol].can_install;
    }
    /**
     * The location of the extension's configuration.
     */
    get configurationLocation() {
        return this[rawDataSymbol].configuration_location;
    }
    /**
     * The extension's description.
     */
    get description() {
        return this[rawDataSymbol].description;
    }
    /**
     * The URL of the extension's terms of service.
     */
    get tosUrl() {
        return this[rawDataSymbol].eula_tos_url;
    }
    /**
     * Whether the extension has support for sending chat messages.
     */
    get hasChatSupport() {
        return this[rawDataSymbol].has_chat_support;
    }
    /**
     * The URL of the extension's default sized icon.
     */
    get iconUrl() {
        return this[rawDataSymbol].icon_url;
    }
    /**
     * Gets the URL of the extension's icon in the given size.
     *
     * @param size The size of the icon.
     */
    getIconUrl(size) {
        return this[rawDataSymbol].icon_urls[size];
    }
    /**
     * The extension's ID.
     */
    get id() {
        return this[rawDataSymbol].id;
    }
    /**
     * The extension's name.
     */
    get name() {
        return this[rawDataSymbol].name;
    }
    /**
     * The URL of the extension's privacy policy.
     */
    get privacyPolicyUrl() {
        return this[rawDataSymbol].privacy_policy_url;
    }
    /**
     * Whether the extension requests its users to share their identity with it.
     */
    get requestsIdentityLink() {
        return this[rawDataSymbol].request_identity_link;
    }
    /**
     * The URLs of the extension's screenshots.
     */
    get screenshotUrls() {
        return this[rawDataSymbol].screenshot_urls;
    }
    /**
     * The extension's activity state.
     */
    get state() {
        return this[rawDataSymbol].state;
    }
    /**
     * The extension's level of support for subscriptions.
     */
    get subscriptionsSupportLevel() {
        return this[rawDataSymbol].subscriptions_support_level;
    }
    /**
     * The extension's feature summary.
     */
    get summary() {
        return this[rawDataSymbol].summary;
    }
    /**
     * The extension's support email address.
     */
    get supportEmail() {
        return this[rawDataSymbol].support_email;
    }
    /**
     * The extension's version.
     */
    get version() {
        return this[rawDataSymbol].version;
    }
    /**
     * The extension's feature summary for viewers.
     */
    get viewerSummary() {
        return this[rawDataSymbol].viewer_summary;
    }
    /**
     * The extension's feature summary for viewers.
     *
     * @deprecated Use `viewerSummary` instead.
     */
    get viewerSummery() {
        return this[rawDataSymbol].viewer_summary;
    }
    /**
     * The extension's allowed configuration URLs.
     */
    get allowedConfigUrls() {
        return this[rawDataSymbol].allowlisted_config_urls;
    }
    /**
     * The extension's allowed panel URLs.
     */
    get allowedPanelUrls() {
        return this[rawDataSymbol].allowlisted_panel_urls;
    }
    /**
     * The URL shown when a viewer opens the extension on a mobile device.
     *
     * If the extension does not have a mobile view, this is null.
     */
    get mobileViewerUrl() {
        return this[rawDataSymbol].views.mobile?.viewer_url ?? null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelViewerUrl() {
        return this[rawDataSymbol].views.panel?.viewer_url ?? null;
    }
    /**
     * The height of the extension panel.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelHeight() {
        return this[rawDataSymbol].views.panel?.height ?? null;
    }
    /**
     * Whether the extension can link to external content from its panel view.
     *
     * If the extension does not have a panel view, this is null.
     */
    get panelCanLinkExternalContent() {
        return this[rawDataSymbol].views.panel?.can_link_external_content ?? null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a video overlay.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayViewerUrl() {
        return this[rawDataSymbol].views.video_overlay?.viewer_url ?? null;
    }
    /**
     * Whether the extension can link to external content from its overlay view.
     *
     * If the extension does not have a overlay view, this is null.
     */
    get overlayCanLinkExternalContent() {
        return this[rawDataSymbol].views.video_overlay?.can_link_external_content ?? null;
    }
    /**
     * The URL shown to the viewer when the extension is shown as a video component.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentViewerUrl() {
        return this[rawDataSymbol].views.component?.viewer_url ?? null;
    }
    /**
     * The aspect width of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectWidth() {
        return this[rawDataSymbol].views.component?.aspect_width ?? null;
    }
    /**
     * The aspect height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectHeight() {
        return this[rawDataSymbol].views.component?.aspect_height ?? null;
    }
    /**
     * The horizontal aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioX() {
        return this[rawDataSymbol].views.component?.aspect_ratio_x ?? null;
    }
    /**
     * The vertical aspect ratio of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAspectRatioY() {
        return this[rawDataSymbol].views.component?.aspect_ratio_y ?? null;
    }
    /**
     * Whether the extension's component view should automatically scale.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentAutoScales() {
        return this[rawDataSymbol].views.component?.autoscale ?? null;
    }
    /**
     * The base width of the extension's component view to use for scaling.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentScalePixels() {
        return this[rawDataSymbol].views.component?.scale_pixels ?? null;
    }
    /**
     * The target height of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentTargetHeight() {
        return this[rawDataSymbol].views.component?.target_height ?? null;
    }
    /**
     * The size of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentSize() {
        return this[rawDataSymbol].views.component?.size ?? null;
    }
    /**
     * Whether zooming is enabled for the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoom() {
        return this[rawDataSymbol].views.component?.zoom ?? null;
    }
    /**
     * The zoom pixels of the extension's component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentZoomPixels() {
        return this[rawDataSymbol].views.component?.zoom_pixels ?? null;
    }
    /**
     * Whether the extension can link to external content from its component view.
     *
     * If the extension does not have a component view, this is null.
     */
    get componentCanLinkExternalContent() {
        return this[rawDataSymbol].views.component?.can_link_external_content ?? null;
    }
    /**
     * The URL shown to the viewer when the extension's configuration page is shown.
     *
     * If the extension does not have a config view, this is null.
     */
    get configViewerUrl() {
        return this[rawDataSymbol].views.config?.viewer_url ?? null;
    }
    /**
     * Whether the extension can link to external content from its config view.
     *
     * If the extension does not have a config view, this is null.
     */
    get configCanLinkExternalContent() {
        return this[rawDataSymbol].views.config?.can_link_external_content ?? null;
    }
};
HelixExtension = __decorate([
    rtfm('api', 'HelixExtension', 'id')
], HelixExtension);
export { HelixExtension };

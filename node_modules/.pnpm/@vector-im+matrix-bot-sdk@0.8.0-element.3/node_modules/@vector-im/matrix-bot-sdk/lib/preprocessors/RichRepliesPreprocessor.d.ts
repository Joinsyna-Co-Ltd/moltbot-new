import { MatrixClient } from "../MatrixClient";
import { IPreprocessor } from "./IPreprocessor";
import { EventKind } from "..";
/**
 * Metadata for a rich reply. Usually stored under the "mx_richreply"
 * field of an event (at the top level).
 * @category Preprocessors
 * @see RichRepliesPreprocessor
 */
export interface IRichReplyMetadata {
    /**
     * If true, the preprocessor found some inconsistencies in the reply
     * information that does not match the specification. For example,
     * this may indicate that a reply was sent without an HTML component.
     */
    wasLenient: boolean;
    /**
     * The event ID the event references. May be an empty string if
     * wasLenient is true.
     */
    parentEventId: string;
    /**
     * The fallback plain text the preprocessor found. May be an empty
     * string if wasLenient is true. The prefix characters to indicate
     * this is a fallback will have already been removed.
     */
    fallbackPlainBody: string;
    /**
     * The fallback HTML the processor found. May be an empty string if
     * wasLenient is true. The fallback structure will have already been
     * removed, leaving just the original assumed HTML.
     */
    fallbackHtmlBody: string;
    /**
     * The user ID that sent the parent event, as determined by the fallback
     * text. This should not be relied upon for anything serious, and instead
     * the preprocessor should be configured to fetch the real event to
     * populate the realEvent property. May be an empty string if wasLenient
     * is true.
     */
    fallbackSender: string;
    /**
     * If the preprocessor is configured to fetch event content, this field
     * will contain the event as reported by the homeserver. May be null if
     * wasLenient is true.
     */
    realEvent: any;
}
/**
 * Processes rich replies found in events. This automatically strips
 * the fallback representation from events, providing the information
 * as a top level "mx_richreply" key. The "mx_richreply" property may
 * be cast to the type IRichReplyMetadata.
 * @category Preprocessors
 */
export declare class RichRepliesPreprocessor implements IPreprocessor {
    private fetchRealEventContents;
    /**
     * Creates a new rich replies preprocessor.
     * @param fetchRealEventContents If enabled, this preprocessor will
     * attempt to get the real event contents and append them to the event
     * information.
     */
    constructor(fetchRealEventContents?: boolean);
    getSupportedEventTypes(): string[];
    processEvent(event: any, client: MatrixClient, kind?: EventKind): Promise<any>;
}

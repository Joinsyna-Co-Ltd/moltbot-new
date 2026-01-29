import { type HelixExtensionType } from '../../../interfaces/endpoints/userExtension.external.js';
import { HelixBaseExtension } from './HelixBaseExtension.js';
/**
 * A Twitch Extension that was installed by a user.
 *
 * @inheritDoc
 */
export declare class HelixUserExtension extends HelixBaseExtension {
    /**
     * Whether the user has configured the extension to be able to activate it.
     */
    get canActivate(): boolean;
    /**
     * The available types of the extension.
     */
    get types(): HelixExtensionType[];
}
//# sourceMappingURL=HelixUserExtension.d.ts.map
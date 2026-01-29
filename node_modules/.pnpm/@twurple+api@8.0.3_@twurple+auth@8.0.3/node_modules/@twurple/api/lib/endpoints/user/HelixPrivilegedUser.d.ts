import { HelixUser } from './HelixUser.js';
/**
 * A user you have extended privilges for, i.e. yourself.
 *
 * @inheritDoc
 */
export declare class HelixPrivilegedUser extends HelixUser {
    /**
     * The email address of the user.
     */
    get email(): string | undefined;
    /**
     * Changes the description of the user.
     *
     * @param description The new description.
     */
    setDescription(description: string): Promise<HelixPrivilegedUser>;
}
//# sourceMappingURL=HelixPrivilegedUser.d.ts.map
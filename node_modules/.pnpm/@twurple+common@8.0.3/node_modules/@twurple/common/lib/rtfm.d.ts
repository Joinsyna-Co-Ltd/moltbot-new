import type { NoInfer } from '@d-fischer/shared-utils';
/** @private */
type PackageName = 'api' | 'auth' | 'chat' | 'common' | 'easy-bot' | 'eventsub-base' | 'eventsub-http' | 'eventsub-ws';
/** @private */
export declare function rtfm(pkg: PackageName, name: string): ClassDecorator;
/** @private */
export declare function rtfm<T>(pkg: PackageName, name: string, idKey: keyof NoInfer<T>): ClassDecorator;
export {};
//# sourceMappingURL=rtfm.d.ts.map
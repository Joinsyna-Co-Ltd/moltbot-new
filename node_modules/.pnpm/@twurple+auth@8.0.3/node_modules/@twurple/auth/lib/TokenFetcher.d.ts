import type { AccessToken } from './AccessToken.js';
export declare class TokenFetcher<T extends AccessToken = AccessToken> {
    private readonly _executor;
    private _newTokenScopeSets;
    private _newTokenPromise;
    private _queuedScopeSets;
    private _queueExecutor;
    private _queuePromise;
    constructor(executor: (scopeSets: string[][]) => Promise<T>);
    fetch(...scopeSets: Array<string[] | undefined>): Promise<T>;
}
//# sourceMappingURL=TokenFetcher.d.ts.map
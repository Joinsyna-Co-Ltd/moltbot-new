import { promiseWithResolvers } from '@d-fischer/shared-utils';
export class TokenFetcher {
    _executor;
    _newTokenScopeSets = [];
    _newTokenPromise = null;
    _queuedScopeSets = [];
    _queueExecutor = null;
    _queuePromise = null;
    constructor(executor) {
        this._executor = executor;
    }
    async fetch(...scopeSets) {
        const filteredScopeSets = scopeSets.filter((val) => Boolean(val));
        if (this._newTokenPromise) {
            if (!filteredScopeSets.length) {
                return await this._newTokenPromise;
            }
            if (this._queueExecutor) {
                this._queuedScopeSets.push(...filteredScopeSets);
            }
            else {
                this._queuedScopeSets = [...filteredScopeSets];
            }
            if (!this._queuePromise) {
                const { promise, resolve, reject } = promiseWithResolvers();
                this._queuePromise = promise;
                this._queueExecutor = async () => {
                    if (!this._queuePromise) {
                        return;
                    }
                    this._newTokenScopeSets = this._queuedScopeSets;
                    this._queuedScopeSets = [];
                    this._newTokenPromise = this._queuePromise;
                    this._queuePromise = null;
                    this._queueExecutor = null;
                    try {
                        resolve(await this._executor(this._newTokenScopeSets));
                    }
                    catch (e) {
                        reject(e);
                    }
                    finally {
                        this._newTokenPromise = null;
                        this._newTokenScopeSets = [];
                        this._queueExecutor?.();
                    }
                };
            }
            return await this._queuePromise;
        }
        this._newTokenScopeSets = [...filteredScopeSets];
        const { promise, resolve, reject } = promiseWithResolvers();
        this._newTokenPromise = promise;
        try {
            resolve(await this._executor(this._newTokenScopeSets));
        }
        catch (e) {
            reject(e);
        }
        finally {
            this._newTokenPromise = null;
            this._newTokenScopeSets = [];
            this._queueExecutor?.();
        }
        return await promise;
    }
}

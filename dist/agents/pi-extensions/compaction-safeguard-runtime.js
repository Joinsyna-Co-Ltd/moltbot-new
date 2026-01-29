// Session-scoped runtime registry keyed by object identity.
// Follows the same WeakMap pattern as context-pruning/runtime.ts.
const REGISTRY = new WeakMap();
export function setCompactionSafeguardRuntime(sessionManager, value) {
    if (!sessionManager || typeof sessionManager !== "object") {
        return;
    }
    const key = sessionManager;
    if (value === null) {
        REGISTRY.delete(key);
        return;
    }
    REGISTRY.set(key, value);
}
export function getCompactionSafeguardRuntime(sessionManager) {
    if (!sessionManager || typeof sessionManager !== "object") {
        return null;
    }
    return REGISTRY.get(sessionManager) ?? null;
}

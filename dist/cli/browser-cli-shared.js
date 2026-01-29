import { callGatewayFromCli } from "./gateway-rpc.js";
function normalizeQuery(query) {
    if (!query)
        return undefined;
    const out = {};
    for (const [key, value] of Object.entries(query)) {
        if (value === undefined)
            continue;
        out[key] = String(value);
    }
    return Object.keys(out).length ? out : undefined;
}
export async function callBrowserRequest(opts, params, extra) {
    const resolvedTimeoutMs = typeof extra?.timeoutMs === "number" && Number.isFinite(extra.timeoutMs)
        ? Math.max(1, Math.floor(extra.timeoutMs))
        : typeof opts.timeout === "string"
            ? Number.parseInt(opts.timeout, 10)
            : undefined;
    const resolvedTimeout = typeof resolvedTimeoutMs === "number" && Number.isFinite(resolvedTimeoutMs)
        ? resolvedTimeoutMs
        : undefined;
    const timeout = typeof resolvedTimeout === "number" ? String(resolvedTimeout) : opts.timeout;
    const payload = await callGatewayFromCli("browser.request", { ...opts, timeout }, {
        method: params.method,
        path: params.path,
        query: normalizeQuery(params.query),
        body: params.body,
        timeoutMs: resolvedTimeout,
    }, { progress: extra?.progress });
    if (payload === undefined) {
        throw new Error("Unexpected browser.request response");
    }
    return payload;
}

import { fetchBrowserJson } from "./client-fetch.js";
function buildProfileQuery(profile) {
    return profile ? `?profile=${encodeURIComponent(profile)}` : "";
}
function withBaseUrl(baseUrl, path) {
    const trimmed = baseUrl?.trim();
    if (!trimmed)
        return path;
    return `${trimmed.replace(/\/$/, "")}${path}`;
}
export async function browserNavigate(baseUrl, opts) {
    const q = buildProfileQuery(opts.profile);
    return await fetchBrowserJson(withBaseUrl(baseUrl, `/navigate${q}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: opts.url, targetId: opts.targetId }),
        timeoutMs: 20000,
    });
}
export async function browserArmDialog(baseUrl, opts) {
    const q = buildProfileQuery(opts.profile);
    return await fetchBrowserJson(withBaseUrl(baseUrl, `/hooks/dialog${q}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            accept: opts.accept,
            promptText: opts.promptText,
            targetId: opts.targetId,
            timeoutMs: opts.timeoutMs,
        }),
        timeoutMs: 20000,
    });
}
export async function browserArmFileChooser(baseUrl, opts) {
    const q = buildProfileQuery(opts.profile);
    return await fetchBrowserJson(withBaseUrl(baseUrl, `/hooks/file-chooser${q}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            paths: opts.paths,
            ref: opts.ref,
            inputRef: opts.inputRef,
            element: opts.element,
            targetId: opts.targetId,
            timeoutMs: opts.timeoutMs,
        }),
        timeoutMs: 20000,
    });
}
export async function browserWaitForDownload(baseUrl, opts) {
    const q = buildProfileQuery(opts.profile);
    return await fetchBrowserJson(withBaseUrl(baseUrl, `/wait/download${q}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            targetId: opts.targetId,
            path: opts.path,
            timeoutMs: opts.timeoutMs,
        }),
        timeoutMs: 20000,
    });
}
export async function browserDownload(baseUrl, opts) {
    const q = buildProfileQuery(opts.profile);
    return await fetchBrowserJson(withBaseUrl(baseUrl, `/download${q}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            targetId: opts.targetId,
            ref: opts.ref,
            path: opts.path,
            timeoutMs: opts.timeoutMs,
        }),
        timeoutMs: 20000,
    });
}
export async function browserAct(baseUrl, req, opts) {
    const q = buildProfileQuery(opts?.profile);
    return await fetchBrowserJson(withBaseUrl(baseUrl, `/act${q}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
        timeoutMs: 20000,
    });
}
export async function browserScreenshotAction(baseUrl, opts) {
    const q = buildProfileQuery(opts.profile);
    return await fetchBrowserJson(withBaseUrl(baseUrl, `/screenshot${q}`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            targetId: opts.targetId,
            fullPage: opts.fullPage,
            ref: opts.ref,
            element: opts.element,
            type: opts.type,
        }),
        timeoutMs: 20000,
    });
}

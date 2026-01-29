import { isTruthyEnvValue } from "../infra/env.js";
export async function startBrowserControlServerIfEnabled() {
    if (isTruthyEnvValue(process.env.CLAWDBOT_SKIP_BROWSER_CONTROL_SERVER))
        return null;
    // Lazy import: keeps startup fast, but still bundles for the embedded
    // gateway (bun --compile) via the static specifier path.
    const override = process.env.CLAWDBOT_BROWSER_CONTROL_MODULE?.trim();
    const mod = override ? await import(override) : await import("../browser/control-service.js");
    const start = typeof mod
        .startBrowserControlServiceFromConfig === "function"
        ? mod
            .startBrowserControlServiceFromConfig
        : mod
            .startBrowserControlServerFromConfig;
    const stop = typeof mod.stopBrowserControlService === "function"
        ? mod.stopBrowserControlService
        : mod.stopBrowserControlServer;
    if (!start)
        return null;
    await start();
    return { stop: stop ?? (async () => { }) };
}

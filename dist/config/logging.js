import { displayPath } from "../utils.js";
import { CONFIG_PATH } from "./paths.js";
export function formatConfigPath(path = CONFIG_PATH) {
    return displayPath(path);
}
export function logConfigUpdated(runtime, opts = {}) {
    const path = formatConfigPath(opts.path ?? CONFIG_PATH);
    const suffix = opts.suffix ? ` ${opts.suffix}` : "";
    runtime.log(`Updated ${path}${suffix}`);
}

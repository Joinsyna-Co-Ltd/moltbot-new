import process from "node:process";
import { isTruthyEnvValue } from "../infra/env.js";
export const TELEGRAM_DISABLE_AUTO_SELECT_FAMILY_ENV = "CLAWDBOT_TELEGRAM_DISABLE_AUTO_SELECT_FAMILY";
export const TELEGRAM_ENABLE_AUTO_SELECT_FAMILY_ENV = "CLAWDBOT_TELEGRAM_ENABLE_AUTO_SELECT_FAMILY";
export function resolveTelegramAutoSelectFamilyDecision(params) {
    const env = params?.env ?? process.env;
    const nodeMajor = typeof params?.nodeMajor === "number"
        ? params.nodeMajor
        : Number(process.versions.node.split(".")[0]);
    if (isTruthyEnvValue(env[TELEGRAM_ENABLE_AUTO_SELECT_FAMILY_ENV])) {
        return { value: true, source: `env:${TELEGRAM_ENABLE_AUTO_SELECT_FAMILY_ENV}` };
    }
    if (isTruthyEnvValue(env[TELEGRAM_DISABLE_AUTO_SELECT_FAMILY_ENV])) {
        return { value: false, source: `env:${TELEGRAM_DISABLE_AUTO_SELECT_FAMILY_ENV}` };
    }
    if (typeof params?.network?.autoSelectFamily === "boolean") {
        return { value: params.network.autoSelectFamily, source: "config" };
    }
    if (Number.isFinite(nodeMajor) && nodeMajor >= 22) {
        return { value: false, source: "default-node22" };
    }
    return { value: null };
}

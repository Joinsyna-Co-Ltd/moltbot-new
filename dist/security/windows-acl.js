import os from "node:os";
import { runExec } from "../process/exec.js";
const INHERIT_FLAGS = new Set(["I", "OI", "CI", "IO", "NP"]);
const WORLD_PRINCIPALS = new Set([
    "everyone",
    "users",
    "builtin\\users",
    "authenticated users",
    "nt authority\\authenticated users",
]);
const TRUSTED_BASE = new Set([
    "nt authority\\system",
    "system",
    "builtin\\administrators",
    "creator owner",
]);
const WORLD_SUFFIXES = ["\\users", "\\authenticated users"];
const TRUSTED_SUFFIXES = ["\\administrators", "\\system"];
const normalize = (value) => value.trim().toLowerCase();
export function resolveWindowsUserPrincipal(env) {
    const username = env?.USERNAME?.trim() || os.userInfo().username?.trim();
    if (!username)
        return null;
    const domain = env?.USERDOMAIN?.trim();
    return domain ? `${domain}\\${username}` : username;
}
function buildTrustedPrincipals(env) {
    const trusted = new Set(TRUSTED_BASE);
    const principal = resolveWindowsUserPrincipal(env);
    if (principal) {
        trusted.add(normalize(principal));
        const parts = principal.split("\\");
        const userOnly = parts.at(-1);
        if (userOnly)
            trusted.add(normalize(userOnly));
    }
    return trusted;
}
function classifyPrincipal(principal, env) {
    const normalized = normalize(principal);
    const trusted = buildTrustedPrincipals(env);
    if (trusted.has(normalized) || TRUSTED_SUFFIXES.some((s) => normalized.endsWith(s)))
        return "trusted";
    if (WORLD_PRINCIPALS.has(normalized) || WORLD_SUFFIXES.some((s) => normalized.endsWith(s)))
        return "world";
    return "group";
}
function rightsFromTokens(tokens) {
    const upper = tokens.join("").toUpperCase();
    const canWrite = upper.includes("F") || upper.includes("M") || upper.includes("W") || upper.includes("D");
    const canRead = upper.includes("F") || upper.includes("M") || upper.includes("R");
    return { canRead, canWrite };
}
export function parseIcaclsOutput(output, targetPath) {
    const entries = [];
    const normalizedTarget = targetPath.trim();
    const lowerTarget = normalizedTarget.toLowerCase();
    const quotedTarget = `"${normalizedTarget}"`;
    const quotedLower = quotedTarget.toLowerCase();
    for (const rawLine of output.split(/\r?\n/)) {
        const line = rawLine.trimEnd();
        if (!line.trim())
            continue;
        const trimmed = line.trim();
        const lower = trimmed.toLowerCase();
        if (lower.startsWith("successfully processed") ||
            lower.startsWith("processed") ||
            lower.startsWith("failed processing") ||
            lower.startsWith("no mapping between account names")) {
            continue;
        }
        let entry = trimmed;
        if (lower.startsWith(lowerTarget)) {
            entry = trimmed.slice(normalizedTarget.length).trim();
        }
        else if (lower.startsWith(quotedLower)) {
            entry = trimmed.slice(quotedTarget.length).trim();
        }
        if (!entry)
            continue;
        const idx = entry.indexOf(":");
        if (idx === -1)
            continue;
        const principal = entry.slice(0, idx).trim();
        const rawRights = entry.slice(idx + 1).trim();
        const tokens = rawRights
            .match(/\(([^)]+)\)/g)
            ?.map((token) => token.slice(1, -1).trim())
            .filter(Boolean) ?? [];
        if (tokens.some((token) => token.toUpperCase() === "DENY"))
            continue;
        const rights = tokens.filter((token) => !INHERIT_FLAGS.has(token.toUpperCase()));
        if (rights.length === 0)
            continue;
        const { canRead, canWrite } = rightsFromTokens(rights);
        entries.push({ principal, rights, rawRights, canRead, canWrite });
    }
    return entries;
}
export function summarizeWindowsAcl(entries, env) {
    const trusted = [];
    const untrustedWorld = [];
    const untrustedGroup = [];
    for (const entry of entries) {
        const classification = classifyPrincipal(entry.principal, env);
        if (classification === "trusted")
            trusted.push(entry);
        else if (classification === "world")
            untrustedWorld.push(entry);
        else
            untrustedGroup.push(entry);
    }
    return { trusted, untrustedWorld, untrustedGroup };
}
export async function inspectWindowsAcl(targetPath, opts) {
    const exec = opts?.exec ?? runExec;
    try {
        const { stdout, stderr } = await exec("icacls", [targetPath]);
        const output = `${stdout}\n${stderr}`.trim();
        const entries = parseIcaclsOutput(output, targetPath);
        const { trusted, untrustedWorld, untrustedGroup } = summarizeWindowsAcl(entries, opts?.env);
        return { ok: true, entries, trusted, untrustedWorld, untrustedGroup };
    }
    catch (err) {
        return {
            ok: false,
            entries: [],
            trusted: [],
            untrustedWorld: [],
            untrustedGroup: [],
            error: String(err),
        };
    }
}
export function formatWindowsAclSummary(summary) {
    if (!summary.ok)
        return "unknown";
    const untrusted = [...summary.untrustedWorld, ...summary.untrustedGroup];
    if (untrusted.length === 0)
        return "trusted-only";
    return untrusted.map((entry) => `${entry.principal}:${entry.rawRights}`).join(", ");
}
export function formatIcaclsResetCommand(targetPath, opts) {
    const user = resolveWindowsUserPrincipal(opts.env) ?? "%USERNAME%";
    const grant = opts.isDir ? "(OI)(CI)F" : "F";
    return `icacls "${targetPath}" /inheritance:r /grant:r "${user}:${grant}" /grant:r "SYSTEM:${grant}"`;
}
export function createIcaclsResetCommand(targetPath, opts) {
    const user = resolveWindowsUserPrincipal(opts.env);
    if (!user)
        return null;
    const grant = opts.isDir ? "(OI)(CI)F" : "F";
    const args = [
        targetPath,
        "/inheritance:r",
        "/grant:r",
        `${user}:${grant}`,
        "/grant:r",
        `SYSTEM:${grant}`,
    ];
    return { command: "icacls", args, display: formatIcaclsResetCommand(targetPath, opts) };
}

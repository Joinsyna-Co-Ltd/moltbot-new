import { lookup as dnsLookup } from "node:dns/promises";
import { lookup as dnsLookupCb } from "node:dns";
import { Agent } from "undici";
export class SsrFBlockedError extends Error {
    constructor(message) {
        super(message);
        this.name = "SsrFBlockedError";
    }
}
const PRIVATE_IPV6_PREFIXES = ["fe80:", "fec0:", "fc", "fd"];
const BLOCKED_HOSTNAMES = new Set(["localhost", "metadata.google.internal"]);
function normalizeHostname(hostname) {
    const normalized = hostname.trim().toLowerCase().replace(/\.$/, "");
    if (normalized.startsWith("[") && normalized.endsWith("]")) {
        return normalized.slice(1, -1);
    }
    return normalized;
}
function parseIpv4(address) {
    const parts = address.split(".");
    if (parts.length !== 4)
        return null;
    const numbers = parts.map((part) => Number.parseInt(part, 10));
    if (numbers.some((value) => Number.isNaN(value) || value < 0 || value > 255))
        return null;
    return numbers;
}
function parseIpv4FromMappedIpv6(mapped) {
    if (mapped.includes(".")) {
        return parseIpv4(mapped);
    }
    const parts = mapped.split(":").filter(Boolean);
    if (parts.length === 1) {
        const value = Number.parseInt(parts[0], 16);
        if (Number.isNaN(value) || value < 0 || value > 0xffff_ffff)
            return null;
        return [(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff];
    }
    if (parts.length !== 2)
        return null;
    const high = Number.parseInt(parts[0], 16);
    const low = Number.parseInt(parts[1], 16);
    if (Number.isNaN(high) ||
        Number.isNaN(low) ||
        high < 0 ||
        low < 0 ||
        high > 0xffff ||
        low > 0xffff) {
        return null;
    }
    const value = (high << 16) + low;
    return [(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff];
}
function isPrivateIpv4(parts) {
    const [octet1, octet2] = parts;
    if (octet1 === 0)
        return true;
    if (octet1 === 10)
        return true;
    if (octet1 === 127)
        return true;
    if (octet1 === 169 && octet2 === 254)
        return true;
    if (octet1 === 172 && octet2 >= 16 && octet2 <= 31)
        return true;
    if (octet1 === 192 && octet2 === 168)
        return true;
    if (octet1 === 100 && octet2 >= 64 && octet2 <= 127)
        return true;
    return false;
}
export function isPrivateIpAddress(address) {
    let normalized = address.trim().toLowerCase();
    if (normalized.startsWith("[") && normalized.endsWith("]")) {
        normalized = normalized.slice(1, -1);
    }
    if (!normalized)
        return false;
    if (normalized.startsWith("::ffff:")) {
        const mapped = normalized.slice("::ffff:".length);
        const ipv4 = parseIpv4FromMappedIpv6(mapped);
        if (ipv4)
            return isPrivateIpv4(ipv4);
    }
    if (normalized.includes(":")) {
        if (normalized === "::" || normalized === "::1")
            return true;
        return PRIVATE_IPV6_PREFIXES.some((prefix) => normalized.startsWith(prefix));
    }
    const ipv4 = parseIpv4(normalized);
    if (!ipv4)
        return false;
    return isPrivateIpv4(ipv4);
}
export function isBlockedHostname(hostname) {
    const normalized = normalizeHostname(hostname);
    if (!normalized)
        return false;
    if (BLOCKED_HOSTNAMES.has(normalized))
        return true;
    return (normalized.endsWith(".localhost") ||
        normalized.endsWith(".local") ||
        normalized.endsWith(".internal"));
}
export function createPinnedLookup(params) {
    const normalizedHost = normalizeHostname(params.hostname);
    const fallback = params.fallback ?? dnsLookupCb;
    const fallbackLookup = fallback;
    const fallbackWithOptions = fallback;
    const records = params.addresses.map((address) => ({
        address,
        family: address.includes(":") ? 6 : 4,
    }));
    let index = 0;
    return ((host, options, callback) => {
        const cb = typeof options === "function" ? options : callback;
        if (!cb)
            return;
        const normalized = normalizeHostname(host);
        if (!normalized || normalized !== normalizedHost) {
            if (typeof options === "function" || options === undefined) {
                return fallbackLookup(host, cb);
            }
            return fallbackWithOptions(host, options, cb);
        }
        const opts = typeof options === "object" && options !== null
            ? options
            : {};
        const requestedFamily = typeof options === "number" ? options : typeof opts.family === "number" ? opts.family : 0;
        const candidates = requestedFamily === 4 || requestedFamily === 6
            ? records.filter((entry) => entry.family === requestedFamily)
            : records;
        const usable = candidates.length > 0 ? candidates : records;
        if (opts.all) {
            cb(null, usable);
            return;
        }
        const chosen = usable[index % usable.length];
        index += 1;
        cb(null, chosen.address, chosen.family);
    });
}
export async function resolvePinnedHostname(hostname, lookupFn = dnsLookup) {
    const normalized = normalizeHostname(hostname);
    if (!normalized) {
        throw new Error("Invalid hostname");
    }
    if (isBlockedHostname(normalized)) {
        throw new SsrFBlockedError(`Blocked hostname: ${hostname}`);
    }
    if (isPrivateIpAddress(normalized)) {
        throw new SsrFBlockedError("Blocked: private/internal IP address");
    }
    const results = await lookupFn(normalized, { all: true });
    if (results.length === 0) {
        throw new Error(`Unable to resolve hostname: ${hostname}`);
    }
    for (const entry of results) {
        if (isPrivateIpAddress(entry.address)) {
            throw new SsrFBlockedError("Blocked: resolves to private/internal IP address");
        }
    }
    const addresses = Array.from(new Set(results.map((entry) => entry.address)));
    if (addresses.length === 0) {
        throw new Error(`Unable to resolve hostname: ${hostname}`);
    }
    return {
        hostname: normalized,
        addresses,
        lookup: createPinnedLookup({ hostname: normalized, addresses }),
    };
}
export function createPinnedDispatcher(pinned) {
    return new Agent({
        connect: {
            lookup: pinned.lookup,
        },
    });
}
export async function closeDispatcher(dispatcher) {
    if (!dispatcher)
        return;
    const candidate = dispatcher;
    try {
        if (typeof candidate.close === "function") {
            await candidate.close();
            return;
        }
        if (typeof candidate.destroy === "function") {
            candidate.destroy();
        }
    }
    catch {
        // ignore dispatcher cleanup errors
    }
}
export async function assertPublicHostname(hostname, lookupFn = dnsLookup) {
    await resolvePinnedHostname(hostname, lookupFn);
}

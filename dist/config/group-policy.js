import { normalizeAccountId } from "../routing/session-key.js";
function normalizeSenderKey(value) {
    const trimmed = value.trim();
    if (!trimmed)
        return "";
    const withoutAt = trimmed.startsWith("@") ? trimmed.slice(1) : trimmed;
    return withoutAt.toLowerCase();
}
export function resolveToolsBySender(params) {
    const toolsBySender = params.toolsBySender;
    if (!toolsBySender)
        return undefined;
    const entries = Object.entries(toolsBySender);
    if (entries.length === 0)
        return undefined;
    const normalized = new Map();
    let wildcard;
    for (const [rawKey, policy] of entries) {
        if (!policy)
            continue;
        const key = normalizeSenderKey(rawKey);
        if (!key)
            continue;
        if (key === "*") {
            wildcard = policy;
            continue;
        }
        if (!normalized.has(key)) {
            normalized.set(key, policy);
        }
    }
    const candidates = [];
    const pushCandidate = (value) => {
        const trimmed = value?.trim();
        if (!trimmed)
            return;
        candidates.push(trimmed);
    };
    pushCandidate(params.senderId);
    pushCandidate(params.senderE164);
    pushCandidate(params.senderUsername);
    pushCandidate(params.senderName);
    for (const candidate of candidates) {
        const key = normalizeSenderKey(candidate);
        if (!key)
            continue;
        const match = normalized.get(key);
        if (match)
            return match;
    }
    return wildcard;
}
function resolveChannelGroups(cfg, channel, accountId) {
    const normalizedAccountId = normalizeAccountId(accountId);
    const channelConfig = cfg.channels?.[channel];
    if (!channelConfig)
        return undefined;
    const accountGroups = channelConfig.accounts?.[normalizedAccountId]?.groups ??
        channelConfig.accounts?.[Object.keys(channelConfig.accounts ?? {}).find((key) => key.toLowerCase() === normalizedAccountId.toLowerCase()) ?? ""]?.groups;
    return accountGroups ?? channelConfig.groups;
}
export function resolveChannelGroupPolicy(params) {
    const { cfg, channel } = params;
    const groups = resolveChannelGroups(cfg, channel, params.accountId);
    const allowlistEnabled = Boolean(groups && Object.keys(groups).length > 0);
    const normalizedId = params.groupId?.trim();
    const groupConfig = normalizedId && groups ? groups[normalizedId] : undefined;
    const defaultConfig = groups?.["*"];
    const allowAll = allowlistEnabled && Boolean(groups && Object.hasOwn(groups, "*"));
    const allowed = !allowlistEnabled ||
        allowAll ||
        (normalizedId ? Boolean(groups && Object.hasOwn(groups, normalizedId)) : false);
    return {
        allowlistEnabled,
        allowed,
        groupConfig,
        defaultConfig,
    };
}
export function resolveChannelGroupRequireMention(params) {
    const { requireMentionOverride, overrideOrder = "after-config" } = params;
    const { groupConfig, defaultConfig } = resolveChannelGroupPolicy(params);
    const configMention = typeof groupConfig?.requireMention === "boolean"
        ? groupConfig.requireMention
        : typeof defaultConfig?.requireMention === "boolean"
            ? defaultConfig.requireMention
            : undefined;
    if (overrideOrder === "before-config" && typeof requireMentionOverride === "boolean") {
        return requireMentionOverride;
    }
    if (typeof configMention === "boolean")
        return configMention;
    if (overrideOrder !== "before-config" && typeof requireMentionOverride === "boolean") {
        return requireMentionOverride;
    }
    return true;
}
export function resolveChannelGroupToolsPolicy(params) {
    const { groupConfig, defaultConfig } = resolveChannelGroupPolicy(params);
    const groupSenderPolicy = resolveToolsBySender({
        toolsBySender: groupConfig?.toolsBySender,
        senderId: params.senderId,
        senderName: params.senderName,
        senderUsername: params.senderUsername,
        senderE164: params.senderE164,
    });
    if (groupSenderPolicy)
        return groupSenderPolicy;
    if (groupConfig?.tools)
        return groupConfig.tools;
    const defaultSenderPolicy = resolveToolsBySender({
        toolsBySender: defaultConfig?.toolsBySender,
        senderId: params.senderId,
        senderName: params.senderName,
        senderUsername: params.senderUsername,
        senderE164: params.senderE164,
    });
    if (defaultSenderPolicy)
        return defaultSenderPolicy;
    if (defaultConfig?.tools)
        return defaultConfig.tools;
    return undefined;
}

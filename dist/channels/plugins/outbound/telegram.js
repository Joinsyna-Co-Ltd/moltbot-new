import { markdownToTelegramHtmlChunks } from "../../../telegram/format.js";
import { sendMessageTelegram } from "../../../telegram/send.js";
function parseReplyToMessageId(replyToId) {
    if (!replyToId)
        return undefined;
    const parsed = Number.parseInt(replyToId, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
}
function parseThreadId(threadId) {
    if (threadId == null)
        return undefined;
    if (typeof threadId === "number") {
        return Number.isFinite(threadId) ? Math.trunc(threadId) : undefined;
    }
    const trimmed = threadId.trim();
    if (!trimmed)
        return undefined;
    const parsed = Number.parseInt(trimmed, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
}
export const telegramOutbound = {
    deliveryMode: "direct",
    chunker: markdownToTelegramHtmlChunks,
    chunkerMode: "markdown",
    textChunkLimit: 4000,
    sendText: async ({ to, text, accountId, deps, replyToId, threadId }) => {
        const send = deps?.sendTelegram ?? sendMessageTelegram;
        const replyToMessageId = parseReplyToMessageId(replyToId);
        const messageThreadId = parseThreadId(threadId);
        const result = await send(to, text, {
            verbose: false,
            textMode: "html",
            messageThreadId,
            replyToMessageId,
            accountId: accountId ?? undefined,
        });
        return { channel: "telegram", ...result };
    },
    sendMedia: async ({ to, text, mediaUrl, accountId, deps, replyToId, threadId }) => {
        const send = deps?.sendTelegram ?? sendMessageTelegram;
        const replyToMessageId = parseReplyToMessageId(replyToId);
        const messageThreadId = parseThreadId(threadId);
        const result = await send(to, text, {
            verbose: false,
            mediaUrl,
            textMode: "html",
            messageThreadId,
            replyToMessageId,
            accountId: accountId ?? undefined,
        });
        return { channel: "telegram", ...result };
    },
    sendPayload: async ({ to, payload, accountId, deps, replyToId, threadId }) => {
        const send = deps?.sendTelegram ?? sendMessageTelegram;
        const replyToMessageId = parseReplyToMessageId(replyToId);
        const messageThreadId = parseThreadId(threadId);
        const telegramData = payload.channelData?.telegram;
        const quoteText = typeof telegramData?.quoteText === "string" ? telegramData.quoteText : undefined;
        const text = payload.text ?? "";
        const mediaUrls = payload.mediaUrls?.length
            ? payload.mediaUrls
            : payload.mediaUrl
                ? [payload.mediaUrl]
                : [];
        const baseOpts = {
            verbose: false,
            textMode: "html",
            messageThreadId,
            replyToMessageId,
            quoteText,
            accountId: accountId ?? undefined,
        };
        if (mediaUrls.length === 0) {
            const result = await send(to, text, {
                ...baseOpts,
                buttons: telegramData?.buttons,
            });
            return { channel: "telegram", ...result };
        }
        // Telegram allows reply_markup on media; attach buttons only to first send.
        let finalResult;
        for (let i = 0; i < mediaUrls.length; i += 1) {
            const mediaUrl = mediaUrls[i];
            const isFirst = i === 0;
            finalResult = await send(to, isFirst ? text : "", {
                ...baseOpts,
                mediaUrl,
                ...(isFirst ? { buttons: telegramData?.buttons } : {}),
            });
        }
        return { channel: "telegram", ...(finalResult ?? { messageId: "unknown", chatId: to }) };
    },
};

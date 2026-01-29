import { Bot } from "grammy";
import { resolveTelegramFetch } from "./fetch.js";
import { withTelegramApiErrorLogging } from "./api-logging.js";
export async function setTelegramWebhook(opts) {
    const fetchImpl = resolveTelegramFetch(undefined, { network: opts.network });
    const client = fetchImpl
        ? { fetch: fetchImpl }
        : undefined;
    const bot = new Bot(opts.token, client ? { client } : undefined);
    await withTelegramApiErrorLogging({
        operation: "setWebhook",
        fn: () => bot.api.setWebhook(opts.url, {
            secret_token: opts.secret,
            drop_pending_updates: opts.dropPendingUpdates ?? false,
        }),
    });
}
export async function deleteTelegramWebhook(opts) {
    const fetchImpl = resolveTelegramFetch(undefined, { network: opts.network });
    const client = fetchImpl
        ? { fetch: fetchImpl }
        : undefined;
    const bot = new Bot(opts.token, client ? { client } : undefined);
    await withTelegramApiErrorLogging({
        operation: "deleteWebhook",
        fn: () => bot.api.deleteWebhook(),
    });
}

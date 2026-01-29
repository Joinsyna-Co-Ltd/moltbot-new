import { formatCliCommand } from "../cli/command-format.js";
export function buildPairingReply(params) {
    const { channel, idLine, code } = params;
    return [
        "Moltbot: access not configured.",
        "",
        idLine,
        "",
        `Pairing code: ${code}`,
        "",
        "Ask the bot owner to approve with:",
        formatCliCommand(`moltbot pairing approve ${channel} <code>`),
    ].join("\n");
}

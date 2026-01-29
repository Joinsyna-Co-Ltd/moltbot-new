import { Message } from 'ircv3';
import { ChatUser } from '../../../ChatUser.js';
import { parseEmoteOffsets } from '../../../utils/emoteUtil.js';
/** @private */
export class Whisper extends Message {
    static COMMAND = 'WHISPER';
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            text: { trailing: true },
        });
    }
    get userInfo() {
        return new ChatUser(this._prefix.nick, this._tags);
    }
    get emoteOffsets() {
        return parseEmoteOffsets(this._tags.get('emotes'));
    }
}

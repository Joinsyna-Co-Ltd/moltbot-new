import { Message } from 'ircv3';
import { ChatUser } from '../../../ChatUser.js';
import { parseEmoteOffsets } from '../../../utils/emoteUtil.js';
export class UserNotice extends Message {
    static COMMAND = 'USERNOTICE';
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            text: { trailing: true, optional: true },
        });
    }
    get id() {
        return this._tags.get('id');
    }
    get date() {
        const timestamp = this._tags.get('tmi-sent-ts');
        return new Date(Number(timestamp));
    }
    get userInfo() {
        return new ChatUser(this._tags.get('login'), this._tags);
    }
    get channelId() {
        return this._tags.get('room-id') ?? null;
    }
    get emoteOffsets() {
        return parseEmoteOffsets(this._tags.get('emotes'));
    }
}

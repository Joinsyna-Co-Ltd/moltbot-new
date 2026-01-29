import { Message } from 'ircv3';
export class ClearMsg extends Message {
    static COMMAND = 'CLEARMSG';
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            text: { trailing: true },
        });
    }
    get date() {
        const timestamp = this._tags.get('tmi-sent-ts');
        return new Date(Number(timestamp));
    }
    get userName() {
        return this._tags.get('login');
    }
    get channelId() {
        return this._tags.get('room-id');
    }
    get targetMessageId() {
        return this._tags.get('target-msg-id');
    }
}

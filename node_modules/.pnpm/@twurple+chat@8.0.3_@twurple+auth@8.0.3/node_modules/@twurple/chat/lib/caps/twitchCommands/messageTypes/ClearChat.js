import { Message } from 'ircv3';
export class ClearChat extends Message {
    static COMMAND = 'CLEARCHAT';
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
            user: { trailing: true, optional: true },
        });
    }
    get date() {
        const timestamp = this._tags.get('tmi-sent-ts');
        return new Date(Number(timestamp));
    }
    get channelId() {
        return this._tags.get('room-id');
    }
    get targetUserId() {
        return this._tags.get('target-user-id') ?? null;
    }
}

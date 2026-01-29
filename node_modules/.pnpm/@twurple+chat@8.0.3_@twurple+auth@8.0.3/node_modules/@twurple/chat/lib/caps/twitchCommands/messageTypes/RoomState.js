import { Message } from 'ircv3';
export class RoomState extends Message {
    static COMMAND = 'ROOMSTATE';
    constructor(command, contents, config) {
        super(command, contents, config, {
            channel: { type: 'channel' },
        });
    }
}

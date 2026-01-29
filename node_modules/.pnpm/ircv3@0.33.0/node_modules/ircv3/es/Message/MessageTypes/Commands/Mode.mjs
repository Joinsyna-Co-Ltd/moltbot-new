import { UnknownChannelModeCharError } from "../../../Errors/UnknownChannelModeCharError.mjs";
import { isChannel } from "../../../Toolkit/StringTools.mjs";
import { Message } from "../../Message.mjs";
export class Mode extends Message {
    constructor(command, contents, config) {
        super(command, contents, config, {
            target: {},
            modes: { rest: true, optional: true }
        });
    }
    get isChannel() {
        return isChannel(this.target, this._serverProperties.channelTypes);
    }
    separate() {
        const result = [];
        const modeRestParam = this.modes;
        if (!modeRestParam) {
            throw new Error("can't separate a channel mode request, just set actions");
        }
        const modeParams = modeRestParam.split(' ');
        const modes = modeParams.shift();
        let currentModeAction = 'add';
        for (const ch of modes) {
            let thisModeAction = currentModeAction;
            switch (ch) {
                case '+': {
                    currentModeAction = 'add';
                    break;
                }
                case '-': {
                    currentModeAction = 'remove';
                    break;
                }
                default: {
                    let requiresParam = false;
                    let known = true;
                    if (this.isChannel) {
                        if (this._serverProperties.supportedChannelModes.alwaysWithParam.includes(ch) ||
                            this._serverProperties.supportedChannelModes.prefix.includes(ch)) {
                            requiresParam = true;
                        }
                        else if (this._serverProperties.supportedChannelModes.paramWhenSet.includes(ch)) {
                            if (currentModeAction === 'add') {
                                requiresParam = true;
                            }
                        }
                        else if (this._serverProperties.supportedChannelModes.list.includes(ch)) {
                            if (modeParams.length) {
                                requiresParam = true;
                            }
                            else {
                                thisModeAction = 'getList';
                            }
                        }
                        else if (this._serverProperties.supportedChannelModes.noParam.includes(ch)) {
                            // whatever
                        }
                        else {
                            throw new UnknownChannelModeCharError(ch);
                        }
                    }
                    else {
                        // user modes never have a param
                        // also, they don't break the whole command if invalid mode letters are given
                        known = this._serverProperties.supportedUserModes.includes(ch);
                    }
                    if (requiresParam && !modeParams.length) {
                        continue;
                    }
                    result.push({
                        prefix: this._prefix,
                        action: thisModeAction,
                        letter: ch,
                        param: requiresParam ? modeParams.shift() : undefined,
                        known
                    });
                }
            }
        }
        return result;
    }
}
Mode.COMMAND = 'MODE';

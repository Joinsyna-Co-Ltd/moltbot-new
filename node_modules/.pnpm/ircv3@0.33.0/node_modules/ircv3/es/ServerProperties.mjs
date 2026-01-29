// sane defaults based on RFC 1459
export const defaultServerProperties = {
    channelTypes: '#&',
    supportedUserModes: 'iwso',
    supportedChannelModes: {
        prefix: 'ov',
        list: 'b',
        alwaysWithParam: 'ovk',
        paramWhenSet: 'l',
        noParam: 'imnpst'
    },
    prefixes: [
        {
            modeChar: 'v',
            prefix: '+'
        },
        {
            modeChar: 'o',
            prefix: '@'
        }
    ]
};

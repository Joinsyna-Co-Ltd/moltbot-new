import { NostrEvent } from './core.ts';
import { AddressPointer, EventPointer, ProfilePointer } from './nip19.ts';
export type Block = {
    type: 'text';
    text: string;
} | {
    type: 'reference';
    pointer: ProfilePointer | AddressPointer | EventPointer;
} | {
    type: 'url';
    url: string;
} | {
    type: 'relay';
    url: string;
} | {
    type: 'image';
    url: string;
} | {
    type: 'video';
    url: string;
} | {
    type: 'audio';
    url: string;
} | {
    type: 'emoji';
    shortcode: string;
    url: string;
} | {
    type: 'hashtag';
    value: string;
};
export declare function parse(content: string | NostrEvent): Iterable<Block>;

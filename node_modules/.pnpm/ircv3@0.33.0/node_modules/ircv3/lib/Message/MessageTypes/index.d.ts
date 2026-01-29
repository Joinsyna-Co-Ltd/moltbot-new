import type { MessageConstructor } from '../Message';
import * as Commands from './Commands';
import * as Numerics from './Numerics';
export { Commands, Numerics };
export declare const all: Map<string, MessageConstructor<import("../Message").Message<{}>>>;

import * as Commands from "./Commands/index.mjs";
import * as Numerics from "./Numerics/index.mjs";
export { Commands, Numerics };
export const all = new Map([...Object.values(Commands), ...Object.values(Numerics)].map((cmd) => [cmd.COMMAND, cmd]));

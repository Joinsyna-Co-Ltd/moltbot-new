"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.all = exports.Numerics = exports.Commands = void 0;
const Commands = require("./Commands");
exports.Commands = Commands;
const Numerics = require("./Numerics");
exports.Numerics = Numerics;
exports.all = new Map([...Object.values(Commands), ...Object.values(Numerics)].map((cmd) => [cmd.COMMAND, cmd]));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruccion_1 = require("./Instruccion");
class Switch extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    execute(ambito) {
    }
}
exports.Switch = Switch;

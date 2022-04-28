"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    execute(ambito) {
        return { type: 'Break', line: this.line, column: this.column };
    }
    grafo() {
        return "";
    }
}
exports.Break = Break;

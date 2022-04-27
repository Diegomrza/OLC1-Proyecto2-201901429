"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = void 0;
const Instruccion_1 = require("./Instruccion");
class Return extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    execute(ambito) {
        let Valor = this.expresion.execute(ambito);
        return {
            type: "Return",
            line: this.line,
            column: this.column,
            value: Valor.value
        };
    }
}
exports.Return = Return;

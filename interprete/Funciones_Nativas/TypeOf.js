"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOf = void 0;
const Literal_1 = require("../Expresion/Literal");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("../Instruccion/Instruccion");
class TypeOf extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    execute(ambito) {
        let valor = this.expresion.execute(ambito);
        return {
            value: (0, Literal_1.nombreTipos)(valor.tipoDato),
            type: Retorno_1.Type.CADENA,
            tipoDato: Retorno_1.TipoDato.CADENA
        };
    }
}
exports.TypeOf = TypeOf;

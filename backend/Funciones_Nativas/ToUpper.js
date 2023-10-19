"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToUpper = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("../Instruccion/Instruccion");
class ToUpper extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    execute(ambito) {
        let valor = this.expresion.execute(ambito);
        if (valor.tipoDato != Retorno_1.TipoDato.CADENA)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `No se aplicar esta función a un tipo: ${(0, Literal_1.nombreTipos)(valor.tipoDato)}`);
        let mayus = valor.value.toUpperCase();
        return {
            value: mayus,
            type: Retorno_1.Type.CADENA,
            tipoDato: Retorno_1.TipoDato.CADENA
        };
    }
    grafo() {
        return "";
    }
}
exports.ToUpper = ToUpper;

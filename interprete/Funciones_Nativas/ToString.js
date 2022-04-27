"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToString = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("../Instruccion/Instruccion");
class ToString extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    execute(ambito) {
        let valor = this.expresion.execute(ambito);
        let val = valor.value;
        val = val.toString();
        if (valor.tipoDato == Retorno_1.TipoDato.CADENA)
            throw new Error_1.Error_(this.line, this.column, "", `No se puede castear un string a string`);
        return {
            value: val,
            type: Retorno_1.Type.CADENA,
            tipoDato: Retorno_1.TipoDato.CADENA
        };
    }
}
exports.ToString = ToString;

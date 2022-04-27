"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Length = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("../Instruccion/Instruccion");
class Length extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    execute(ambito) {
        //Recibe vector, lista o cadena
        let exp = this.expresion.execute(ambito);
        if (exp.tipoDato != Retorno_1.TipoDato.VECTOR && exp.tipoDato != Retorno_1.TipoDato.CADENA)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede obtener el tamaño de un tipo: ${exp.tipoDato}`);
        let tamanio = exp.value.length;
        return {
            value: tamanio,
            type: Retorno_1.Type.ENTERO,
            tipoDato: Retorno_1.TipoDato.ENTERO //Tipo de estructura
        };
    }
}
exports.Length = Length;

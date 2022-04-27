"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToCharArray = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("../Instruccion/Instruccion");
class ToCharArray extends Instruccion_1.Instruccion {
    constructor(expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
    }
    execute(ambito) {
        //Tiene que ser una cadena
        let val = this.expresion.execute(ambito);
        if (val.tipoDato != Retorno_1.TipoDato.CADENA)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor recibido no es un string`);
        let arreglo = val.value.split("");
        let aux = [];
        for (const i of arreglo) {
            aux.push(new Literal_1.Literal(i, Literal_1.TipoLiteral.CARACTER, this.line, this.column));
        }
        return {
            value: aux,
            type: Retorno_1.Type.CARACTER,
            tipoDato: Retorno_1.TipoDato.VECTOR //Tipo de estructura
        };
    }
}
exports.ToCharArray = ToCharArray;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nombreTipos = exports.TipoLiteral = exports.Literal = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Literal extends Expresion_1.Expresion {
    constructor(value, tipo, line, column) {
        super(line, column);
        this.value = value;
        this.tipo = tipo;
    }
    execute(ambito) {
        if (this.tipo == TipoLiteral.ENTERO) { //Si es int
            return {
                value: Number(this.value),
                type: Retorno_1.Type.ENTERO,
                tipoDato: Retorno_1.TipoDato.ENTERO
            };
        }
        else if (this.tipo == TipoLiteral.CADENA) { //Si es string
            return {
                value: this.value.toString(),
                type: Retorno_1.Type.CADENA,
                tipoDato: Retorno_1.TipoDato.CADENA
            };
        }
        else if (this.tipo == TipoLiteral.BOOLEAN) { //Si es boolean
            if (this.value.toString().toLowerCase() == "true") {
                return {
                    value: true,
                    type: Retorno_1.Type.BOOLEAN,
                    tipoDato: Retorno_1.TipoDato.BOOLEAN
                };
            }
            else {
                return {
                    value: false,
                    type: Retorno_1.Type.BOOLEAN,
                    tipoDato: Retorno_1.TipoDato.BOOLEAN
                };
            }
        }
        else if (this.tipo == TipoLiteral.DOBLE) { //Si es double
            return {
                value: Number(this.value),
                type: Retorno_1.Type.DOBLE,
                tipoDato: Retorno_1.TipoDato.DOBLE
            };
        }
        else if (this.tipo == TipoLiteral.CARACTER) { //Si es char
            return {
                value: this.value,
                type: Retorno_1.Type.CARACTER,
                tipoDato: Retorno_1.TipoDato.CARACTER
            };
        }
    }
}
exports.Literal = Literal;
var TipoLiteral;
(function (TipoLiteral) {
    TipoLiteral[TipoLiteral["ENTERO"] = 0] = "ENTERO";
    TipoLiteral[TipoLiteral["DOBLE"] = 1] = "DOBLE";
    TipoLiteral[TipoLiteral["BOOLEAN"] = 2] = "BOOLEAN";
    TipoLiteral[TipoLiteral["CARACTER"] = 3] = "CARACTER";
    TipoLiteral[TipoLiteral["CADENA"] = 4] = "CADENA"; //CADENA
})(TipoLiteral = exports.TipoLiteral || (exports.TipoLiteral = {}));
function nombreTipos(num) {
    switch (num) {
        case 0:
            return "int";
        case 1:
            return "double";
        case 2:
            return "boolean";
        case 3:
            return "char";
        case 4:
            return "string";
        case 5:
            return "vector";
    }
}
exports.nombreTipos = nombreTipos;

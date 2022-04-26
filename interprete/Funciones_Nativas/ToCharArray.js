"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToCharArray = void 0;
const Error_1 = require("../Error/Error");
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
        if (val.type != Retorno_1.Type.CADENA)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor recibido no es un string`);
        let arreglo = val.value.split("");
        return {
            value: arreglo,
            type: Retorno_1.Type.VECTOR
        };
    }
}
exports.ToCharArray = ToCharArray;

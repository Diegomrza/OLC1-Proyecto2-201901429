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
        if (exp.type != Retorno_1.Type.VECTOR && exp.type != Retorno_1.Type.CADENA)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede obtener el tamaño de un tipo: ${exp.type}`);
        let tamanio = exp.value.length;
        return {
            value: tamanio,
            type: Retorno_1.Type.ENTERO
        };
    }
}
exports.Length = Length;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOf = void 0;
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
            value: this.tipo(valor.type),
            type: Retorno_1.Type.CADENA
        };
    }
    tipo(num) {
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
}
exports.TypeOf = TypeOf;

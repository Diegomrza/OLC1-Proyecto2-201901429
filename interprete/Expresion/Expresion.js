"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
const Retorno_1 = require("./Retorno");
class Expresion {
    constructor(line, column) {
        this.line = line;
        this.column = column;
        this.line = line;
        this.column = column;
    }
    //public abstract grafo()
    tipoDominante(tipo1, tipo2) {
        return Retorno_1.tipos[tipo1][tipo2];
    }
}
exports.Expresion = Expresion;

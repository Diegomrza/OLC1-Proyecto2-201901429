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
    tipoDominante(tipo1, tipo2) {
        return Retorno_1.tipos[tipo1][tipo2];
    }
    tipoDominanteSuma(tipo1, tipo2) {
        return Retorno_1.tipos[tipo1][tipo2];
    }
    tipoDominanteResta(tipo1, tipo2) {
        return Retorno_1.matrizResta[tipo1][tipo2];
    }
    tipoDominanteMultiplicacion(tipo1, tipo2) {
        return Retorno_1.matrizMultiplicacion[tipo1][tipo2];
    }
    tipoDominanteDivision(tipo1, tipo2) {
        return Retorno_1.matrizDivision[tipo1][tipo2];
    }
    tipoDominantePotencia(tipo1, tipo2) {
        return Retorno_1.matrizPotencia[tipo1][tipo2];
    }
    tipoDominanteModulo(tipo1, tipo2) {
        return Retorno_1.matrizModulo[tipo1][tipo2];
    }
}
exports.Expresion = Expresion;

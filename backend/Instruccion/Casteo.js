"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoCasteo = exports.Casteo = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class Casteo extends Instruccion_1.Instruccion {
    constructor(tipo, expresion, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.expresion = expresion;
    }
    execute(ambito) {
        const valor = this.expresion.execute(ambito);
        switch (this.tipo) {
            case 0:
                if (valor.type == Retorno_1.Type.CARACTER) {
                    return {
                        value: valor.value.charCodeAt(0),
                        type: Retorno_1.Type.ENTERO,
                        tipoDato: Retorno_1.TipoDato.ENTERO
                    };
                }
                else if (valor.type == Retorno_1.Type.DOBLE) {
                    return {
                        value: parseInt(valor.value),
                        type: Retorno_1.Type.ENTERO,
                        tipoDato: Retorno_1.TipoDato.ENTERO
                    };
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede castear un ${(0, Literal_1.nombreTipos)(valor.type)} a ${(0, Literal_1.nombreTipos)(this.tipo)}.`);
                }
            case 1:
                if (valor.type == Retorno_1.Type.CARACTER) {
                    return {
                        value: valor.value.charCodeAt(0),
                        type: Retorno_1.Type.DOBLE,
                        tipoDato: Retorno_1.TipoDato.DOBLE
                    };
                }
                else if (valor.type == Retorno_1.Type.ENTERO) {
                    return {
                        value: parseFloat(valor.value).toFixed(2),
                        type: Retorno_1.Type.DOBLE,
                        tipoDato: Retorno_1.TipoDato.DOBLE
                    };
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede castear un ${(0, Literal_1.nombreTipos)(valor.type)} a ${(0, Literal_1.nombreTipos)(this.tipo)}.`);
                }
            case 2:
                if (valor.type == Retorno_1.Type.ENTERO) {
                    return {
                        value: String.fromCharCode(valor.value),
                        type: Retorno_1.Type.CARACTER,
                        tipoDato: Retorno_1.TipoDato.CARACTER
                    };
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede castear un ${(0, Literal_1.nombreTipos)(valor.type)} a ${(0, Literal_1.nombreTipos)(this.tipo)}.`);
                }
            case 3:
                throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede castear un ${(0, Literal_1.nombreTipos)(valor.type)} a ${(0, Literal_1.nombreTipos)(this.tipo)}.`);
            case 4:
                return {
                    value: valor.value.toString(),
                    type: Retorno_1.Type.CADENA,
                    tipoDato: Retorno_1.TipoDato.CADENA
                };
        }
    }
    grafo() {
        return "";
    }
}
exports.Casteo = Casteo;
var TipoCasteo;
(function (TipoCasteo) {
    TipoCasteo[TipoCasteo["ENTERO"] = 0] = "ENTERO";
    TipoCasteo[TipoCasteo["DOBLE"] = 1] = "DOBLE";
    TipoCasteo[TipoCasteo["CARACTER"] = 2] = "CARACTER";
    TipoCasteo[TipoCasteo["BOOLEAN"] = 3] = "BOOLEAN";
    TipoCasteo[TipoCasteo["CADENA"] = 4] = "CADENA"; //Castear a string
})(TipoCasteo || (exports.TipoCasteo = TipoCasteo = {}));
/*
Casteos permitidos:

int - double
int - string        //toString
int - char
double - int
double - string     //toString
char - int
char - double


*/ 

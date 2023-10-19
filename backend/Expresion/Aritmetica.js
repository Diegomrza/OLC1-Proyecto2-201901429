"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAritmetica = exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
const Literal_1 = require("./Literal");
class Aritmetica extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
    }
    execute(ambito) {
        switch (this.tipo) {
            case TipoAritmetica.SUMA:
                return this.suma(ambito);
            case TipoAritmetica.RESTA:
                return this.resta(ambito);
            case TipoAritmetica.MULTIPLICACION:
                return this.multiplicacion(ambito);
            case TipoAritmetica.DIVISION:
                return this.division(ambito);
            case TipoAritmetica.POTENCIA:
                return this.potencia(ambito);
            case TipoAritmetica.MODULO:
                return this.modulo(ambito);
        }
    }
    grafo() {
        return "";
    }
    suma(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        let asciiIzq;
        let asciiDer;
        if (izquierda.type == Retorno_1.Type.CARACTER)
            asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            asciiDer = derecha.value.charCodeAt(0);
        let tipoDominante = this.tipoDominante(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Retorno_1.Type.ENTERO:
                if (izquierda.type == Retorno_1.Type.CARACTER)
                    izquierda.value = asciiIzq;
                if (derecha.type == Retorno_1.Type.CARACTER)
                    derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) + Number(derecha.value)),
                    type: Retorno_1.Type.ENTERO,
                    tipoDato: Retorno_1.TipoDato.ENTERO
                };
            case Retorno_1.Type.DOBLE:
                if (izquierda.type == Retorno_1.Type.CARACTER)
                    izquierda.value = asciiIzq;
                if (derecha.type == Retorno_1.Type.CARACTER)
                    derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) + Number(derecha.value)),
                    type: Retorno_1.Type.DOBLE,
                    tipoDato: Retorno_1.TipoDato.DOBLE
                };
            case Retorno_1.Type.CADENA:
                return {
                    value: (izquierda.value + derecha.value),
                    type: Retorno_1.Type.CADENA,
                    tipoDato: Retorno_1.TipoDato.CADENA
                };
            default:
                throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se puede sumar: ${(0, Literal_1.nombreTipos)(izquierda.type)} con ${(0, Literal_1.nombreTipos)(derecha.type)}.`);
        }
    }
    resta(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        let asciiIzq;
        let asciiDer;
        if (izquierda.type == Retorno_1.Type.CARACTER)
            asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            asciiDer = derecha.value.charCodeAt(0);
        let tipoDominante = this.tipoDominanteResta(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Retorno_1.Type.ENTERO:
                if (izquierda.type == Retorno_1.Type.CARACTER)
                    izquierda.value = asciiIzq;
                if (derecha.type == Retorno_1.Type.CARACTER)
                    derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) - Number(derecha.value)),
                    type: Retorno_1.Type.ENTERO,
                    tipoDato: Retorno_1.TipoDato.ENTERO
                };
            case Retorno_1.Type.DOBLE:
                if (izquierda.type == Retorno_1.Type.CARACTER)
                    izquierda.value = asciiIzq;
                if (derecha.type == Retorno_1.Type.CARACTER)
                    derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) - Number(derecha.value)),
                    type: Retorno_1.Type.DOBLE,
                    tipoDato: Retorno_1.TipoDato.DOBLE
                };
            default:
                throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se puede restar: ${(0, Literal_1.nombreTipos)(izquierda.type)} con ${(0, Literal_1.nombreTipos)(derecha.type)}.`); //Error
        }
    }
    multiplicacion(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        let asciiIzq;
        let asciiDer;
        if (izquierda.type == Retorno_1.Type.CARACTER)
            asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            asciiDer = derecha.value.charCodeAt(0);
        let tipoDominante = this.tipoDominanteMultiplicacion(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Retorno_1.Type.ENTERO:
                if (izquierda.type == Retorno_1.Type.CARACTER)
                    izquierda.value = asciiIzq;
                if (derecha.type == Retorno_1.Type.CARACTER)
                    derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) * Number(derecha.value)),
                    type: Retorno_1.Type.ENTERO,
                    tipoDato: Retorno_1.TipoDato.ENTERO
                };
            case Retorno_1.Type.DOBLE:
                if (izquierda.type == Retorno_1.Type.CARACTER)
                    izquierda.value = asciiIzq;
                if (derecha.type == Retorno_1.Type.CARACTER)
                    derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) * Number(derecha.value)),
                    type: Retorno_1.Type.DOBLE,
                    tipoDato: Retorno_1.TipoDato.DOBLE
                };
            default:
                throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se puede multiplicar: ${(0, Literal_1.nombreTipos)(izquierda.type)} con ${(0, Literal_1.nombreTipos)(derecha.type)}.`);
        }
    }
    division(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        let asciiIzq;
        let asciiDer;
        if (izquierda.type == Retorno_1.Type.CARACTER)
            asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            asciiDer = derecha.value.charCodeAt(0);
        if (derecha.value == 0)
            throw new Error_1.Error_(this.line, this.column, 'Semántico', `La división entre cero no está definida.`);
        let tipoDominante = this.tipoDominanteDivision(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Retorno_1.Type.DOBLE:
                if (izquierda.type == Retorno_1.Type.CARACTER)
                    izquierda.value = asciiIzq;
                if (derecha.type == Retorno_1.Type.CARACTER)
                    derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) / Number(derecha.value)),
                    type: Retorno_1.Type.DOBLE,
                    tipoDato: Retorno_1.TipoDato.DOBLE
                };
            default:
                throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se puede dividir: ${(0, Literal_1.nombreTipos)(izquierda.type)} con ${(0, Literal_1.nombreTipos)(derecha.type)}.`); //Error
        }
    }
    potencia(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        let tipoDominante = this.tipoDominantePotencia(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Retorno_1.Type.ENTERO:
                return {
                    value: Math.pow(Number(izquierda.value), Number(derecha.value)),
                    type: Retorno_1.Type.ENTERO,
                    tipoDato: Retorno_1.TipoDato.ENTERO
                };
            case Retorno_1.Type.DOBLE:
                return {
                    value: Math.pow(Number(izquierda.value), Number(derecha.value)),
                    type: Retorno_1.Type.DOBLE,
                    tipoDato: Retorno_1.TipoDato.DOBLE
                };
            default:
                throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se puede hacer la potencia: ${(0, Literal_1.nombreTipos)(izquierda.type)} con ${(0, Literal_1.nombreTipos)(derecha.type)}.`); //Error
        }
    }
    modulo(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        let tipoDominante = this.tipoDominanteModulo(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Retorno_1.Type.DOBLE:
                return {
                    value: (Number(izquierda.value) % Number(derecha.value)),
                    type: Retorno_1.Type.DOBLE,
                    tipoDato: Retorno_1.TipoDato.DOBLE
                };
            default:
                throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se puede sacar el módulo: ${(0, Literal_1.nombreTipos)(izquierda.type)} con ${(0, Literal_1.nombreTipos)(derecha.type)}.`); //Error
        }
    }
}
exports.Aritmetica = Aritmetica;
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["POTENCIA"] = 4] = "POTENCIA";
    TipoAritmetica[TipoAritmetica["MODULO"] = 5] = "MODULO";
})(TipoAritmetica || (exports.TipoAritmetica = TipoAritmetica = {}));

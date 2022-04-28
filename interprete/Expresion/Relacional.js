"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRelacional = exports.Relacional = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
const Literal_1 = require("./Literal");
class Relacional extends Expresion_1.Expresion {
    constructor(left, right, tipoR, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipoR = tipoR;
        this.tipo = Retorno_1.Type.BOOLEAN;
    }
    execute(ambito) {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        if ((leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOBLE)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.CARACTER)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.ENTERO)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.DOBLE)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.CARACTER)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.CARACTER && rightValue.type == Retorno_1.Type.ENTERO)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.CARACTER && rightValue.type == Retorno_1.Type.DOBLE)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.CARACTER && rightValue.type == Retorno_1.Type.CARACTER)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.BOOLEAN && rightValue.type == Retorno_1.Type.BOOLEAN)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else if ((leftValue.type == Retorno_1.Type.CADENA && rightValue.type == Retorno_1.Type.CADENA)) {
            let objeto = this.relaciones(ambito);
            return objeto;
        }
        else {
            throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se puede operar ${(0, Literal_1.nombreTipos)(leftValue.type)} con  ${(0, Literal_1.nombreTipos)(rightValue.type)}`);
        }
    }
    grafo() {
        return "";
    }
    relaciones(ambito) {
        switch (this.tipoR) {
            case TipoRelacional.IGUALIGUAL:
                return this.igual_igual(ambito);
            case TipoRelacional.DIFERENTE:
                return this.diferente(ambito);
            case TipoRelacional.MAYOR:
                return this.mayor(ambito);
            case TipoRelacional.MAYOR_IGUAL:
                return this.mayor_igual(ambito);
            case TipoRelacional.MENOR:
                return this.menor(ambito);
            case TipoRelacional.MENOR_IGUAL:
                return this.menor_igual(ambito);
        }
    }
    igual_igual(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type == Retorno_1.Type.CARACTER)
            izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            derecha.value = derecha.value.charCodeAt(0);
        return {
            value: izquierda.value == derecha.value,
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
    diferente(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type == Retorno_1.Type.CARACTER)
            izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            derecha.value = derecha.value.charCodeAt(0);
        return {
            value: izquierda.value != derecha.value,
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
    mayor(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type == Retorno_1.Type.CARACTER)
            izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            derecha.value = derecha.value.charCodeAt(0);
        return {
            value: izquierda.value > derecha.value,
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
    mayor_igual(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type == Retorno_1.Type.CARACTER)
            izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            derecha.value = derecha.value.charCodeAt(0);
        return {
            value: izquierda.value >= derecha.value,
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
    menor(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type == Retorno_1.Type.CARACTER)
            izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            derecha.value = derecha.value.charCodeAt(0);
        return {
            value: izquierda.value < derecha.value,
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
    menor_igual(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type == Retorno_1.Type.CARACTER)
            izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Retorno_1.Type.CARACTER)
            derecha.value = derecha.value.charCodeAt(0);
        return {
            value: izquierda.value <= derecha.value,
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
}
exports.Relacional = Relacional;
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional[TipoRelacional["IGUALIGUAL"] = 0] = "IGUALIGUAL";
    TipoRelacional[TipoRelacional["DIFERENTE"] = 2] = "DIFERENTE";
    TipoRelacional[TipoRelacional["MAYOR"] = 3] = "MAYOR";
    TipoRelacional[TipoRelacional["MAYOR_IGUAL"] = 4] = "MAYOR_IGUAL";
    TipoRelacional[TipoRelacional["MENOR"] = 5] = "MENOR";
    TipoRelacional[TipoRelacional["MENOR_IGUAL"] = 6] = "MENOR_IGUAL";
})(TipoRelacional = exports.TipoRelacional || (exports.TipoRelacional = {}));
/*


Válidos:

entero - double -caracter:

    entero - entero
    entero - double
    entero - caracter
    
    double - entero
    double - double
    double - caracter
    
    caracter - entero
    caracter - double
    caracter - caracter

    boolean - boolean
    cadena - cadena

No válidos:
    cadena - caracter


 */ 

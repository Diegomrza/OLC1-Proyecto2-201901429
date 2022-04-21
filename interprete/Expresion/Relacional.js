"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRelacional = exports.Relacional = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
class Relacional extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
    }
    execute(ambito) {
        const leftValue = this.left.execute(ambito); //Ejecucion de la parte izquierda => {type, value}
        const rightValue = this.right.execute(ambito); //Ejecucion de la parte derecha => {type, value}
        if ((leftValue.type == Retorno_1.Type.CADENA && rightValue.type == Retorno_1.Type.CARACTER) || (leftValue.type == Retorno_1.Type.CARACTER && rightValue.type == Retorno_1.Type.CADENA)) {
            throw new Error_1.Error_(this.line, this.column, 'Semantico', `No se pueden operar ${leftValue.type} con  ${rightValue.type}`);
        }
        else {
            if ((leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO) ||
                (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOBLE) ||
                (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.CARACTER) ||
                (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.ENTERO) ||
                (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.DOBLE) ||
                (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.CARACTER) ||
                (leftValue.type == Retorno_1.Type.CARACTER && rightValue.type == Retorno_1.Type.ENTERO) ||
                (leftValue.type == Retorno_1.Type.CARACTER && rightValue.type == Retorno_1.Type.DOBLE) ||
                (leftValue.type == Retorno_1.Type.CARACTER && rightValue.type == Retorno_1.Type.CARACTER) ||
                (leftValue.type == Retorno_1.Type.BOOLEAN && rightValue.type == Retorno_1.Type.BOOLEAN) ||
                (leftValue.type == Retorno_1.Type.CADENA && rightValue.type == Retorno_1.Type.CADENA)) {
                return this.relaciones(leftValue, rightValue);
            }
            else {
                throw new Error_1.Error_(this.line, this.column, 'Semantico', `No se pueden operar ${leftValue.type} con  ${rightValue.type}`);
            }
        }
    }
    relaciones(leftValue, rightValue) {
        let asciiLeft = null;
        let asciiRight = null;
        if (leftValue.type == Retorno_1.Type.CARACTER)
            asciiLeft = leftValue.value.charCodeAt(0);
        if (rightValue.type == Retorno_1.Type.CARACTER)
            asciiRight = rightValue.value.charCodeAt(0);
        if (leftValue.type == Retorno_1.Type.ENTERO || leftValue.type == Retorno_1.Type.DOBLE) {
            leftValue.value = Number(leftValue.value);
        }
        if (rightValue.type == Retorno_1.Type.ENTERO || rightValue.type == Retorno_1.Type.DOBLE) {
            rightValue.value = Number(rightValue.value);
        }
        if (this.tipo == TipoRelacional.IGUALIGUAL) { // ==
            let result;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = (asciiLeft === asciiRight);
            }
            else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = (asciiLeft === rightValue.value);
            }
            else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = (leftValue.value === asciiRight);
            }
            else {
                result = (leftValue.value == rightValue.value);
            }
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.DIFERENTE) { // !=
            let result;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft != asciiRight;
            }
            else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft != rightValue.value;
            }
            else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value != asciiRight;
            }
            else {
                result = leftValue.value != rightValue.value;
            }
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYOR) { // >
            let result;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft > asciiRight;
            }
            else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft > rightValue.value;
            }
            else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value > asciiRight;
            }
            else {
                result = leftValue.value > rightValue.value;
            }
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYOR_IGUAL) { // >=
            let result;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft >= asciiRight;
            }
            else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft >= rightValue.value;
            }
            else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value >= asciiRight;
            }
            else {
                result = leftValue.value >= rightValue.value;
            }
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENOR) { // <
            let result;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft < asciiRight;
            }
            else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft < rightValue.value;
            }
            else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value < asciiRight;
            }
            else {
                result = leftValue.value < rightValue.value;
            }
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENOR_IGUAL) { //<=
            let result;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft <= asciiRight;
            }
            else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft <= rightValue.value;
            }
            else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value <= asciiRight;
            }
            else {
                result = leftValue.value <= rightValue.value;
            }
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
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

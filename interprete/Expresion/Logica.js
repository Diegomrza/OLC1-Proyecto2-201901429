"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLogica = exports.Logica = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
class Logica extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
    }
    execute(ambito) {
        let leftValue = this.left.execute(ambito); //El izquierdo siempre viene
        let rightValue = null;
        if (this.right != null) { //Se valida que el segundo venga, sino solo se evalua el primero
            rightValue = this.right.execute(ambito);
        }
        if (this.tipo == TipoLogica.NOT) { //NOT
            if (leftValue.type != Retorno_1.Type.BOOLEAN)
                throw new Error_1.Error_(this.line, this.column, "Semántico", `La expresion no es booleana`);
            return {
                value: !(leftValue.value),
                type: Retorno_1.Type.BOOLEAN,
                tipoDato: Retorno_1.TipoDato.BOOLEAN
            };
        }
        else if (this.tipo == TipoLogica.AND) { //AND
            if ((leftValue.type != Retorno_1.Type.BOOLEAN) || (rightValue.type != Retorno_1.Type.BOOLEAN))
                throw new Error_1.Error_(this.line, this.column, "Semántico", `Una o ambas expresiones no son de tipo booleanas`);
            return {
                value: (leftValue.value && rightValue.value),
                type: Retorno_1.Type.BOOLEAN,
                tipoDato: Retorno_1.TipoDato.BOOLEAN
            };
        }
        else if (this.tipo == TipoLogica.OR) { //OR
            if ((leftValue.type != Retorno_1.Type.BOOLEAN) && (rightValue.type != Retorno_1.Type.BOOLEAN))
                throw new Error_1.Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
            if (leftValue.value == true) {
                return {
                    value: true,
                    type: Retorno_1.Type.BOOLEAN,
                    tipoDato: Retorno_1.TipoDato.BOOLEAN
                };
            }
            else if (rightValue.value == true) {
                return {
                    value: true,
                    type: Retorno_1.Type.BOOLEAN,
                    tipoDato: Retorno_1.TipoDato.BOOLEAN
                };
            }
            else {
                return {
                    value: (leftValue.value || rightValue.value),
                    type: Retorno_1.Type.BOOLEAN,
                    tipoDato: Retorno_1.TipoDato.BOOLEAN
                };
            }
        }
    }
}
exports.Logica = Logica;
var TipoLogica;
(function (TipoLogica) {
    TipoLogica[TipoLogica["AND"] = 0] = "AND";
    TipoLogica[TipoLogica["OR"] = 1] = "OR";
    TipoLogica[TipoLogica["NOT"] = 2] = "NOT";
})(TipoLogica = exports.TipoLogica || (exports.TipoLogica = {}));

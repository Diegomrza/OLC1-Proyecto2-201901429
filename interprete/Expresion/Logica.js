"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLogica = exports.Relacional = void 0;
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
        const leftValue = this.left.execute(ambito);
        let rightValue;
        if (this.right != null) {
        }
        if (this.tipo == TipoLogica.NOT) {
            return { value: !(leftValue.value), type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoLogica.AND) {
            if (leftValue.value == Retorno_1.Type.BOOLEAN) {
                const rightValue = this.right.execute(ambito);
                if (rightValue.type === Retorno_1.Type.BOOLEAN) {
                    return { value: (leftValue.value && rightValue.value), type: Retorno_1.Type.BOOLEAN };
                }
                throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos');
            }
            throw new Error_1.Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos');
        }
        else if (this.tipo == TipoLogica.OR) {
            return { value: (leftValue.value || rightValue.value), type: Retorno_1.Type.BOOLEAN };
        }
    }
}
exports.Relacional = Relacional;
var TipoLogica;
(function (TipoLogica) {
    TipoLogica[TipoLogica["AND"] = 0] = "AND";
    TipoLogica[TipoLogica["OR"] = 1] = "OR";
    TipoLogica[TipoLogica["NOT"] = 2] = "NOT";
})(TipoLogica = exports.TipoLogica || (exports.TipoLogica = {}));

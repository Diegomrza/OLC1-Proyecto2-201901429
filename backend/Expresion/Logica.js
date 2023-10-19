"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLogica = exports.Logica = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
class Logica extends Expresion_1.Expresion {
    constructor(left, right, tipoL, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipoL = tipoL;
        this.tipo = Retorno_1.Type.BOOLEAN;
    }
    execute(ambito) {
        switch (this.tipoL) {
            case TipoLogica.OR:
                return this.or(ambito);
            case TipoLogica.AND:
                return this.and(ambito);
            case TipoLogica.NOT:
                return this.not(ambito);
        }
    }
    grafo() {
        return "";
    }
    or(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type != Retorno_1.Type.BOOLEAN && derecha.type != Retorno_1.Type.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
        return {
            value: (izquierda.value || derecha.value),
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
    and(ambito) {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type != Retorno_1.Type.BOOLEAN || derecha.type != Retorno_1.Type.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
        return {
            value: (izquierda.value && derecha.value),
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
    not(ambito) {
        let izquierda = this.left.execute(ambito);
        if (izquierda.type != Retorno_1.Type.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
        return {
            value: !izquierda.value,
            type: Retorno_1.Type.BOOLEAN,
            tipoDato: Retorno_1.TipoDato.BOOLEAN
        };
    }
}
exports.Logica = Logica;
var TipoLogica;
(function (TipoLogica) {
    TipoLogica[TipoLogica["AND"] = 0] = "AND";
    TipoLogica[TipoLogica["OR"] = 1] = "OR";
    TipoLogica[TipoLogica["NOT"] = 2] = "NOT";
})(TipoLogica || (exports.TipoLogica = TipoLogica = {}));

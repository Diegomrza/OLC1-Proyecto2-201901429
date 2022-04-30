"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolos = void 0;
class TablaSimbolos {
    constructor(id, tipo, tipoDato, entorno, valor, line, column) {
        this.id = id;
        this.tipo = tipo;
        this.tipoDato = tipoDato;
        this.entorno = entorno;
        this.valor = valor;
        this.line = line;
        this.column = column;
    }
}
exports.TablaSimbolos = TablaSimbolos;

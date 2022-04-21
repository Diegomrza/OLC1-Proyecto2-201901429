"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Instruccion_1 = require("./Instruccion");
class Funcion extends Instruccion_1.Instruccion {
    constructor(id, statement, parametros, line, column) {
        super(line, column);
        this.id = id;
        this.statement = statement;
        this.parametros = parametros;
    }
    execute(ambito) {
        ambito.guardarFuncion(this.id, this);
    }
}
exports.Funcion = Funcion;

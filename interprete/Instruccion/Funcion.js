"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Funcion = void 0;
const Instruccion_1 = require("./Instruccion");
class Funcion extends Instruccion_1.Instruccion {
    constructor(id, cuerpo, parametros, tipo, line, column) {
        super(line, column);
        this.id = id;
        this.cuerpo = cuerpo;
        this.parametros = parametros;
        this.tipo = tipo;
    }
    execute(ambito) {
        ambito.guardarFuncion(this.id, this, this.line, this.column);
    }
}
exports.Funcion = Funcion;

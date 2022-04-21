"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Instruccion_1 = require("./Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(id, value, line, column, tipoAsignacion) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipoAsignacion = tipoAsignacion;
    }
    execute(ambito) {
        let val = this.value.execute(ambito);
        for (const ids of this.id) {
            ambito.setVal(ids, val.value, val.type, this.line, this.column, this.tipoAsignacion);
        }
    }
}
exports.Declaracion = Declaracion;

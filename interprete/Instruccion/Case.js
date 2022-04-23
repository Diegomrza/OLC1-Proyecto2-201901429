"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruccion_1 = require("./Instruccion");
class Case extends Instruccion_1.Instruccion {
    constructor(opcion, cuerpo, line, column) {
        super(line, column);
        this.opcion = opcion;
        this.cuerpo = cuerpo;
    }
    execute(ambito) {
        let valCuerpo = this.cuerpo.execute(ambito);
        if (valCuerpo != null && valCuerpo != undefined)
            return valCuerpo;
    }
}
exports.Case = Case;

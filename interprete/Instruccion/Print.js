"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../Instruccion/Instruccion");
class Print extends Instruccion_1.Instruccion {
    //public lista = [];
    constructor(value, saltoDeLinea, line, column) {
        super(line, column);
        this.value = value;
        this.saltoDeLinea = saltoDeLinea;
    }
    execute(ambito) {
        let aux = [];
        for (const actual of this.value) {
            const val = actual.execute(ambito);
            aux.push(val.value);
            console.log(val.value);
        }
        if (this.saltoDeLinea == 1) { //No hay salto de linea
            aux.push("\n");
        }
    }
}
exports.Print = Print;

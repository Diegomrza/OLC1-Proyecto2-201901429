"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("./Instruccion");
const Singleton_1 = require("../Patrones/Singleton");
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
            val.value = val.value.toString();
            val.value = val.value.replace("\\n", "\n");
            new Singleton_1.Singleton().push(val.value);
        }
        if (this.saltoDeLinea == 1) {
            new Singleton_1.Singleton().push("\n");
        }
    }
    grafo() {
        return "";
    }
}
exports.Print = Print;

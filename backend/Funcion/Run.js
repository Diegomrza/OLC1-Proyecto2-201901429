"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Run = void 0;
const Instruccion_1 = require("../Instruccion/Instruccion");
class Run extends Instruccion_1.Instruccion {
    constructor(llamada, line, column) {
        super(line, column);
        this.llamada = llamada;
    }
    execute(ambito) {
        let valor = this.llamada.execute(ambito);
        if (valor != undefined && valor != null) {
            return {
                value: valor.value,
                type: valor.type,
                tipoDato: valor.tipoDato
            };
        }
        else {
            return undefined;
        }
    }
    grafo() {
        return "";
    }
}
exports.Run = Run;

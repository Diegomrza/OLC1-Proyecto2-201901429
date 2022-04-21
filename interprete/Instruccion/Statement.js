"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const Ambito_1 = require("../Extra/Ambito");
const Instruccion_1 = require("./Instruccion");
class Statement extends Instruccion_1.Instruccion {
    constructor(code, line, column) {
        super(line, column);
        this.code = code;
    }
    execute(ambito) {
        const newAmb = new Ambito_1.Ambito(ambito);
        let lista = [];
        for (const inst of this.code) {
            try {
                const element = inst.execute(newAmb);
                if (element != null && element != undefined)
                    lista.push(element);
            }
            catch (error) {
                console.log("Error statement: ", error);
            }
        }
        return lista;
    }
}
exports.Statement = Statement;

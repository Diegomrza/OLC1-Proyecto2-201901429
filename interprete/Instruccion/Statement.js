"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const Ambito_1 = require("../Extra/Ambito");
const Singleton_1 = require("../Singleton");
const Instruccion_1 = require("./Instruccion");
class Statement extends Instruccion_1.Instruccion {
    constructor(code, line, column) {
        super(line, column);
        this.code = code;
    }
    execute(ambito) {
        const newAmb = new Ambito_1.Ambito(ambito);
        for (const inst of this.code) {
            try {
                const element = inst.execute(newAmb);
                if (element != null && element != undefined) {
                    if (element.type == "Return" || element.type == "Continue" || element.type == "Break") {
                        return element;
                    }
                }
            }
            catch (error) {
                new Singleton_1.Singleton().pushError(error);
            }
        }
    }
    grafo() {
        return "";
    }
}
exports.Statement = Statement;

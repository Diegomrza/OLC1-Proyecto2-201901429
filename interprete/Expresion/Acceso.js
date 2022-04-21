"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Error_1 = require("../Error/Error");
const Expresion_1 = require("./Expresion");
class Acceso extends Expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    execute(ambito) {
        const value = ambito.getVal(this.id);
        if (value != null) {
            return {
                value: value.valor,
                type: value.type
            };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se encuentra la variable ${this.id}`);
        }
    }
}
exports.Acceso = Acceso;

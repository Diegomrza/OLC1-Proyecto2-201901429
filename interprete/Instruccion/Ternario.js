"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class Ternario extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, ElsE, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.ElsE = ElsE;
    }
    execute(ambito) {
        const valor = this.condicion.execute(ambito);
        if (valor.type != Retorno_1.Type.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, 'Semantico', 'La condicion a evaluar no es de tipo boolean');
        if (valor.value) {
            return this.cuerpo.execute(ambito);
        }
        else if (this.ElsE != null) {
            return this.ElsE.execute(ambito);
        }
    }
}
exports.Ternario = Ternario;

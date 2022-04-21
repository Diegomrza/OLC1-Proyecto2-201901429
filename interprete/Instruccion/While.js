"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class While extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    execute(ambito) {
        let value = this.condicion.execute(ambito);
        if (value.type != Retorno_1.Type.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, 'Semantico', "La condicion a evaluar no es de tipo boolean");
        while (value.value) {
            const retorno = this.cuerpo.execute(ambito);
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break;
                }
                else if (retorno.type == 'Continue') {
                    continue;
                }
            }
            value = this.condicion.execute(ambito);
        }
    }
}
exports.While = While;

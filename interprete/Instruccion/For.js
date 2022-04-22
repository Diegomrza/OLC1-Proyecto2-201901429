"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class For extends Instruccion_1.Instruccion {
    constructor(param1, condicion, actualizacion, cuerpo, line, column) {
        super(line, column);
        this.param1 = param1;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.cuerpo = cuerpo;
    }
    execute(ambito) {
        let val = this.condicion.execute(ambito);
        if (val.type != Retorno_1.Type.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `La condicion a evaluar no es de tipo boolean`);
        while (val.value) {
            const retorno = this.cuerpo.execute(ambito);
            if (retorno.type == 'Break') {
                break;
            }
            else if (retorno.this == 'Continue') {
                continue;
            }
            this.actualizacion.execute(ambito); //Actualizacion tiene que ser de tipo declaracion o de tipo incremento/decremento
            val = this.condicion.execute(ambito); //tipo retorno: {type, value}
        }
    }
}
exports.For = For;

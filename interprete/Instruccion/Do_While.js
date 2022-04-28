"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Do_While = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class Do_While extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    execute(ambito) {
        let condition;
        do {
            const retorno = this.cuerpo.execute(ambito);
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break;
                }
                else if (retorno.type == 'Continue') {
                    continue;
                }
                else if (retorno.type == 'Return') {
                    return retorno.value;
                }
            }
            condition = this.condicion.execute(ambito);
            if (condition.tipoDato != Retorno_1.TipoDato.BOOLEAN)
                throw new Error_1.Error_(this.line, this.column, "Semántico", `La condición no es de tipo booleana`);
        } while (condition.value);
    }
    grafo() {
        return "";
    }
}
exports.Do_While = Do_While;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const Instruccion_1 = require("./Instruccion");
class Switch extends Instruccion_1.Instruccion {
    constructor(opcion, listaCase, defecto, line, column) {
        super(line, column);
        this.opcion = opcion;
        this.listaCase = listaCase;
        this.defecto = defecto;
    }
    execute(ambito) {
        const op = this.opcion.execute(ambito);
        let bandera = false;
        for (const caso of this.listaCase) {
            let valor = caso.opcion.execute(ambito);
            if ((valor.value == op.value) && (valor.type == op.type)) {
                let retorno = caso.cuerpo.execute(ambito);
                if (retorno != null && retorno != undefined) {
                    if (retorno.type == 'Break') {
                        bandera = true;
                        break;
                    }
                    else if (retorno.type == 'Continue') {
                        continue;
                    }
                }
            }
        }
        if (this.defecto != null && bandera == false)
            this.defecto.execute(ambito);
    }
}
exports.Switch = Switch;

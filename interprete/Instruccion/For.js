"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Ambito_1 = require("../Extra/Ambito");
const Instruccion_1 = require("./Instruccion");
class For extends Instruccion_1.Instruccion {
    constructor(decl_asig, condicion, actualizacion, cuerpo, line, column) {
        super(line, column);
        this.decl_asig = decl_asig;
        this.condicion = condicion;
        this.actualizacion = actualizacion;
        this.cuerpo = cuerpo;
    }
    execute(ambito) {
        const nuevoAmbito = new Ambito_1.Ambito(ambito); //Ambito para declaracion o asignacion
        this.decl_asig.execute(nuevoAmbito); //Ejecutamos la declaracion
        let val = this.condicion.execute(nuevoAmbito); //
        if (val.type != Retorno_1.Type.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `La condicion a evaluar no es de tipo boolean`);
        while (val.value) {
            const entorno = new Ambito_1.Ambito(nuevoAmbito); //Ambito del for
            const retorno = this.cuerpo.execute(entorno); //
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break;
                }
                else if (retorno.type == 'Continue') {
                    continue;
                }
            }
            this.actualizacion.execute(nuevoAmbito); //Actualizacion tiene que ser de tipo declaracion o de tipo incremento/decremento
            val = this.condicion.execute(nuevoAmbito); //tipo retorno: {type, value}
        }
    }
}
exports.For = For;

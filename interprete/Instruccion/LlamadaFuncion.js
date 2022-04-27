"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaFuncion = void 0;
const Instruccion_1 = require("../Instruccion/Instruccion");
const Ambito_1 = require("../Extra/Ambito");
const Error_1 = require("../Error/Error");
class LlamadaFuncion extends Instruccion_1.Instruccion {
    constructor(id, expresiones, line, column) {
        super(line, column);
        this.id = id;
        this.expresiones = expresiones;
    }
    execute(ambito) {
        const funcion = ambito.getFuncion(this.id);
        if (funcion == undefined)
            throw new Error_1.Error_(this.line, this.column, 'Semántico', `Funcion ${this.id} no encontrada.`);
        if (this.expresiones.length != funcion.parametros.length)
            throw new Error_1.Error_(this.line, this.column, 'Semántico', "Cantidad de parametros incorrecta");
        const newEnv = new Ambito_1.Ambito(ambito.getGlobal()); //Obteniendo el ambito global
        for (let i = 0; i < this.expresiones.length; i++) {
            const value = this.expresiones[i].execute(ambito);
            //id, valor, tipo, linea, columna, tipoAsignacion, tipoDato
            newEnv.setVal(funcion.parametros[i], value.value, value.type, this.line, this.column, 0, value.tipoDato);
        }
        return funcion.cuerpo.execute(newEnv);
    }
}
exports.LlamadaFuncion = LlamadaFuncion;

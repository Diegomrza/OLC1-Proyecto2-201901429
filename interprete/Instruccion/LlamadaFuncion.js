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
        const func = ambito.getFuncion(this.id);
        if (func == undefined)
            throw new Error_1.Error_(this.line, this.column, 'Semantico', `Funcion ${this.id} no encontrada`);
        if (this.expresiones.length != func.parametros.length)
            throw new Error_1.Error_(this.line, this.column, 'Semantico', "Cantidad de parametros incorrecta");
        const newEnv = new Ambito_1.Ambito(ambito.getGlobal());
        for (let i = 0; i < this.expresiones.length; i++) {
            const value = this.expresiones[i].execute(ambito);
            newEnv.setVal(func.parametros[i], value.value, value.type, this.line, this.column, 1);
        }
        return func.statement.execute(newEnv);
    }
}
exports.LlamadaFuncion = LlamadaFuncion;

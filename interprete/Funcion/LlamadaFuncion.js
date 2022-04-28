"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaFuncion = void 0;
const Instruccion_1 = require("../Instruccion/Instruccion");
const Ambito_1 = require("../Extra/Ambito");
const Error_1 = require("../Error/Error");
class LlamadaFuncion extends Instruccion_1.Instruccion {
    constructor(id, expresiones, run, line, column) {
        super(line, column);
        this.id = id;
        this.expresiones = expresiones;
        this.run = run;
    }
    execute(ambito) {
        const funcion = ambito.getFuncion(this.id);
        if (funcion == undefined) {
            console.log(undefined);
            throw new Error_1.Error_(this.line, this.column, 'Semántico', `Funcion ${this.id} no encontrada.`);
        }
        if (this.expresiones.length != funcion.parametros.length)
            throw new Error_1.Error_(this.line, this.column, 'Semántico', "Cantidad de parametros incorrecta");
        if (this.run) {
            const newEnv = new Ambito_1.Ambito(ambito.getGlobal()); //Obteniendo el ambito global
            for (const i in this.expresiones) {
                const value = this.expresiones[i].execute(ambito);
                if (value.tipoDato != funcion.parametros[i][1])
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', "Tipos incorrectos");
                newEnv.setVal(funcion.parametros[i][0], value.value, value.type, this.line, this.column, 0, value.tipoDato);
            }
            let valor = funcion.cuerpo.execute(newEnv);
            if (funcion.tipo == Instruccion_1.TipoFuncion.VOID) {
                return {
                    value: null,
                    line: this.line,
                    column: this.column,
                    type: null,
                    tipoDato: null
                };
            }
            let objeto = {
                value: valor.value,
                line: valor.line,
                column: valor.column,
                type: valor.tipoDato,
                tipoDato: valor.tipoDato
            };
            if (funcion.tipo == valor.tipoDato) {
                return objeto;
            }
            ;
            throw new Error_1.Error_(this.line, this.column, "Semántico", `El tipo no coincide.`);
        }
    }
    grafo() {
        return "";
    }
}
exports.LlamadaFuncion = LlamadaFuncion;

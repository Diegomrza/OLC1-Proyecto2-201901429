"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Instruccion_1 = require("./Instruccion");
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Literal_1 = require("../Expresion/Literal");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(id, value, line, column, tipoAsignacion, pos1, pos2, tipoDato) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipoAsignacion = tipoAsignacion;
        this.pos1 = pos1;
        this.pos2 = pos2;
        this.tipoDato = tipoDato;
    }
    execute(ambito) {
        if (this.pos1 != null && this.pos2 == null) { //Vectores
            //Valor nuevo
            let val = this.value.execute(ambito);
            for (const ids of this.id) {
                //Obteniendo el vector
                let aux = ambito.getVal(ids);
                //Posicion 1
                let p1 = this.pos1.execute(ambito);
                //Si el valor de acceso no es entero
                if (p1.type != Retorno_1.Type.ENTERO)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor ${p1.value} debe ser tipo int.`);
                //Si el valor de acceso es negativo
                if (p1.value <= -1)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede acceder a una posición negativa.`);
                //Si el valor excede el tamaño establecido del vector
                if (p1.value >= aux.valor.length)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `La posición ${p1.value} no existe en el arreglo.`);
                if (val.type != aux.TipoDato)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede asignar un ${(0, Literal_1.nombreTipos)(val.type)} a un vector de ${(0, Literal_1.nombreTipos)(aux.TipoDato)}`);
                //Cambiando el valor en el vector
                aux.valor[p1.value] = val.value;
            }
        }
        else if (this.pos1 != null && this.pos2 != null) { //Matrices
            //Valor nuevo
            let val = this.value.execute(ambito);
            for (const ids of this.id) {
                //Obteniendo la matriz
                let aux = ambito.getVal(ids);
                //Posicion 1
                let p1 = this.pos1.execute(ambito);
                //Posicion 2
                let p2 = this.pos2.execute(ambito);
                //Si los valores de acceso no son enteros
                if (p1.type != Retorno_1.Type.ENTERO || p2.type != Retorno_1.Type.ENTERO)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `Los valores ${p1.value, p2.value} debe ser tipo int.`);
                //Si los valores de acceso son negativos
                if (p1.value <= -1 || p2.value <= -1)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede acceder a una posición negativa`);
                //Si algún valor excede el tamaño establecido de la matriz
                if (p1.value >= aux.valor.length || p2.value >= aux.valor[0].length)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `La posición ${p1.value + " " + p2.value} no existe.`);
                if (val.type != aux.TipoDato)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede asignar un ${(0, Literal_1.nombreTipos)(val.type)} a una matriz de ${(0, Literal_1.nombreTipos)(aux.TipoDato)}`);
                //Cambiando el valor en la matriz
                aux.valor[p1.value][p2.value] = val.value;
            }
        }
        else { //Variables
            let val = this.value.execute(ambito);
            for (const ids of this.id) {
                ambito.setVal(ids, val.value, val.type, this.line, this.column, this.tipoAsignacion, this.tipoDato);
            }
        }
    }
}
exports.Declaracion = Declaracion;

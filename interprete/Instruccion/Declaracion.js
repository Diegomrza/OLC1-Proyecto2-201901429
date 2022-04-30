"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Instruccion_1 = require("./Instruccion");
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Literal_1 = require("../Expresion/Literal");
const Singleton_1 = require("../Singleton");
class Declaracion extends Instruccion_1.Instruccion {
    //id[], valor, tipoAsignacion(0 = declaracion, 1 = asignacion), pos1, pos2, tipoDato, line, column 
    constructor(id, value, tipoAsignacion, pos1, //Puede ser null
    pos2, //Puede ser null
    tipoDato, line, column) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipoAsignacion = tipoAsignacion;
        this.pos1 = pos1;
        this.pos2 = pos2;
        this.tipoDato = tipoDato;
    }
    execute(ambito) {
        if (this.pos1 != null && this.pos2 == null) { //Vector 1 dimensión
            this.vectores(ambito);
        }
        else if (this.pos1 != null && this.pos2 != null) { //Vector 2 dimensiones
            this.matrices(ambito);
        }
        else if (this.pos1 == null && this.pos2 == null) { //Variable
            this.variables(ambito);
        }
    }
    grafo() {
        return "";
    }
    variables(ambito) {
        let valor = this.value.execute(ambito);
        if (this.tipoDato == undefined)
            this.tipoDato = valor.tipoDato;
        if (valor.tipoDato != this.tipoDato)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede asignar un ${(0, Literal_1.nombreTipos)(valor.tipoDato)} a un ${(0, Literal_1.nombreTipos)(this.tipoDato)}`);
        for (const id_ of this.id) {
            new Singleton_1.Singleton().insertarSimbolo(id_, (0, Literal_1.nombreTipos)(valor.type), (0, Literal_1.nombreTipos)(valor.tipoDato), ambito.nombre, valor.value, this.line.toString(), this.column.toString());
            ambito.setVal(id_, valor.value, valor.type, this.line, this.column, this.tipoAsignacion, this.tipoDato);
        }
    }
    vectores(ambito) {
        //Valor nuevo
        let valor = this.value.execute(ambito);
        if (this.tipoDato == undefined)
            this.tipoDato = valor.tipoDato;
        for (const ids of this.id) {
            //Obteniendo el vector declarado
            let aux = ambito.getVal(ids);
            if (aux != null && aux != undefined) { //Si se encuentra la variable
                //Obtenemor la posicion 1
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
                if (valor.type != aux.type)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede asignar un ${(0, Literal_1.nombreTipos)(valor.type)} a un vector de tipo ${(0, Literal_1.nombreTipos)(aux.TipoDato)}`);
                //Cambiando el valor en el vector
                aux.valor[p1.value] = valor.value;
            }
            else { //Si no se encuentra la variable lanzamos error
                throw new Error_1.Error_(this.line, this.column, "Semántico", `No se encuentra el vector ${(ids)}.`);
            }
        }
    }
    matrices(ambito) {
        //Valor nuevo
        let valor = this.value.execute(ambito);
        if (this.tipoDato == undefined)
            this.tipoDato = valor.tipoDato;
        for (const ids of this.id) {
            //Obteniendo la matriz
            let aux = ambito.getVal(ids);
            if (aux != null && aux != undefined) {
                //Posicion 1
                let p1 = this.pos1.execute(ambito);
                //Posicion 2
                let p2 = this.pos2.execute(ambito);
                //Si los valores de acceso no son enteros
                if (p1.type != Retorno_1.Type.ENTERO || p2.type != Retorno_1.Type.ENTERO)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `Ambos valores ${p1.value, p2.value} debe ser tipo int.`);
                //Si los valores de acceso son negativos
                if (p1.value <= -1 || p2.value <= -1)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `Ambos valores ${p1.value, p2.value} debe ser positivos.`);
                //Si algún valor excede el tamaño establecido de la matriz
                if (p1.value >= aux.valor.length || p2.value >= aux.valor[0].length)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `La posición ${p1.value + " " + p2.value} no existe.`);
                if (valor.type != aux.type)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `No se puede asignar un ${(0, Literal_1.nombreTipos)(valor.type)} a una matriz de ${(0, Literal_1.nombreTipos)(aux.type)}`);
                //Cambiando el valor en la matriz
                aux.valor[p1.value][p2.value] = valor.value;
            }
            else {
                throw new Error_1.Error_(this.line, this.column, "Semántico", `No se encuentra la matriz ${(ids)}.`);
            }
        }
    }
}
exports.Declaracion = Declaracion;

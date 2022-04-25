"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Instruccion_1 = require("./Instruccion");
class Vector extends Instruccion_1.Instruccion {
    constructor(tipo, id, arreglo, tam, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.arreglo = arreglo;
        this.tam = tam;
    }
    execute(ambito) {
        //console.log("\n\nNombre: ",this.id);
        //console.log("Dimension: ", this.arreglo);
        //console.log("Tamaño arreglo: ", this.tam);
        let tamanio = this.tam.execute(ambito);
        if (this.arreglo.length == 0) {
            let lista = [];
            for (let i = 0; i < tamanio.value; i++) {
                lista.push(this.defecto(this.tipo));
            }
            ambito.setVal(this.id, lista, this.tipo, this.line, this.column, 0);
        }
        else {
            let aux = [];
            for (let i of this.arreglo) {
                let valor = i.execute(ambito);
                if (valor.type == this.tipo) {
                    aux.push(valor.value);
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor ${valor.value} no coincide con el tipo ${(0, Literal_1.nombreTipos)(this.tipo)}`);
                }
            }
            ambito.setVal(this.id, aux, this.tipo, this.line, this.column, 0);
        }
    }
    defecto(tipo) {
        switch (tipo) {
            case 0:
                return 0;
            case 1:
                return 0.0;
            case 2:
                return true;
            case 3:
                return "\u0000";
            case 4:
                return "";
        }
    }
}
exports.Vector = Vector;
/**
 * Declaración vectores:
 *
 * TIPO ID [] = new TIPO [n];
 * TIPO ID [][] = new TIPO [n][m];
 *
 * TIPO ID [] = [x1, x2, ...];
 * TIPO ID [][] = [[x1, x2, ...], [x1, x2, ...], [x1, x2, ...], ...];
 *
 *
 * if
 * else
 * while
 * do while
 * switch
 *  case
 *  default
 * for
 *
 *
 */ 

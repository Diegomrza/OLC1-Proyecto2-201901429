"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class Vector extends Instruccion_1.Instruccion {
    constructor(tipo, id, arreglo, tam, tipoEs, line, column) {
        super(line, column);
        this.tipo = tipo;
        this.id = id;
        this.arreglo = arreglo;
        this.tam = tam;
        this.tipoEs = tipoEs;
    }
    execute(ambito) {
        let tamanio = this.tam.execute(ambito);
        if (tamanio.type != Retorno_1.Type.ENTERO) {
            throw new Error_1.Error_(this.line, this.column, 'Semántico', 'El atributo tamaño no es de tipo int');
        }
        if (this.arreglo.length == 0) {
            let lista = [];
            for (let i = 0; i < tamanio.value; i++) {
                lista.push(this.defecto(this.tipo));
            }
            ambito.setVal(this.id, lista, this.tipoEs, this.line, this.column, 0, this.tipo);
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
            ambito.setVal(this.id, aux, this.tipoEs, this.line, this.column, 0, this.tipo);
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

 */ 

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
        if (this.charArray) { //Si charArray tiene algo significa que el arreglo viene de esa clase
            let vl = this.charArray.execute(ambito); //Ejecutamos la clase ToCharArray
            this.arreglo = vl.value; //Asignamos el arreglo traído de ToCharArray al arreglo del vector
            this.tam = new Literal_1.Literal(vl.value.length, Literal_1.TipoLiteral.ENTERO, this.line, this.column); //Asignamos el tamaño del arreglo del charArray
        }
        let tamanio = this.tam.execute(ambito); //El tamaño vector siempre viene, entonces obtenemos su valor
        if (tamanio.type != Retorno_1.Type.ENTERO || tamanio.value == 0) {
            throw new Error_1.Error_(this.line, this.column, 'Semántico', 'El atributo tamaño no es de tipo int ó es 0.');
        }
        if (this.arreglo.length == 0) { //Si el arreglo viene vacío significa que el tamaño tiene que ser tamanio
            let lista = []; //Lista auxiliar
            for (let i = 0; i < tamanio.value; i++) { //Llenamos el arreglo con los datos por defecto usando el tamaño que viene
                lista.push(this.defecto(this.tipo));
            }
            //Guardamos el vector por defecto
            ambito.setVal(this.id, lista, this.tipo, this.line, this.column, 0, this.tipoEs);
        }
        else {
            let aux = []; //Arreglo auxiliar
            for (let i of this.arreglo) { //Recorremos el arreglo
                let valor = i.execute(ambito); //Ejecutamos cada dato del arreglo para obtener su valor
                if (valor.type == this.tipo) { //Comprobamos el tipo de cada dato que viene en el arreglo
                    aux.push(valor.value);
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor ${valor.value} no coincide con el tipo ${(0, Literal_1.nombreTipos)(this.tipo)}`);
                }
            }
            //Guardamos el vector
            ambito.setVal(this.id, aux, this.tipo, this.line, this.column, 0, this.tipoEs);
        }
    }
    grafo() {
        return "";
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

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
const TablaSimbolos_1 = require("./Extra/TablaSimbolos");
class Singleton {
    constructor() {
        this.listaPrint = [];
        this.listaErrores = [];
        this.tabla = new Map();
        if (!!Singleton.instancia) {
            //this.lista.push(print);
            return Singleton.instancia;
        }
        Singleton.instancia = this;
        //this.lista.push(print);
    }
    push(print) {
        this.listaPrint.push(print);
    }
    clear() {
        this.listaPrint = [];
    }
    pushError(error) {
        this.listaErrores.push(error);
    }
    clearErrores() {
        this.listaErrores = [];
    }
    insertarSimbolo(id, tipo, tipoDato, entorno, valor, linea, columna) {
        let simbolo = new TablaSimbolos_1.TablaSimbolos(id, tipo, tipoDato, entorno, valor, linea, columna);
        if (this.tabla.has(id)) {
            let aux = this.tabla.get(id);
            aux.valor = valor;
        }
        else {
            this.tabla.set(id, simbolo);
        }
    }
    clearTabla() {
        this.tabla = new Map();
    }
}
exports.Singleton = Singleton;

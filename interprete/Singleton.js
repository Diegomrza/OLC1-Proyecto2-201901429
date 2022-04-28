"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Singleton = void 0;
class Singleton {
    constructor() {
        this.listaPrint = [];
        this.listaErrores = [];
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
}
exports.Singleton = Singleton;

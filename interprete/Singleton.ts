import { Error_ } from "./Error/Error";

export class Singleton {
    public static instancia;
    listaPrint = [];
    listaErrores: Error_[] = [];

    constructor() {
        if (!!Singleton.instancia) {
            //this.lista.push(print);
            return Singleton.instancia;
        }

        Singleton.instancia = this;
        //this.lista.push(print);
    }

    public push(print) {
        this.listaPrint.push(print);
    }

    public clear() {
        this.listaPrint = [];
    }

    public pushError(error) {
        this.listaErrores.push(error);
    }

    public clearErrores() {
        this.listaErrores = [];
    }
}

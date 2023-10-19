import { Error_ } from "../Error/Error";
import { TablaSimbolos } from "../Extra/TablaSimbolos";

export class Singleton {
    public static instancia;
    listaPrint = [];
    listaErrores: Error_[] = [];
    tabla: Map<string, TablaSimbolos> = new Map();

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

    public insertarSimbolo(id: string, tipo: string, tipoDato: string, entorno: string, valor: any, linea: string, columna: string) {
        let simbolo = new TablaSimbolos(id, tipo, tipoDato, entorno, valor, linea, columna);
        if (this.tabla.has(id)) {
            let aux = this.tabla.get(id);
            aux.valor = valor;
        } else {
            this.tabla.set(id, simbolo);
        }
    }

    public clearTabla() {
        this.tabla = new Map();
    }
}

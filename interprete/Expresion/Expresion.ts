import { Ambito } from "../Extra/Ambito";
import { tipos, Type, Retorno } from "./Retorno"

export abstract class Expresion {
    
    constructor(public line: number, public column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(ambito: Ambito): Retorno

    //public abstract grafo()

    public tipoDominante(tipo1: Type, tipo2: Type): Type {
        return tipos[tipo1][tipo2];
    }

}
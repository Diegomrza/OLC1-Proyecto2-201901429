import { Ambito } from '../Extra/Ambito';
import { Retorno } from '../Expresion/Retorno';

export abstract class Instruccion {
    //public static contadorGraph = 0;

    public line: number;
    public column: number;

    constructor(line: number, column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(ambito: Ambito): any;

    public abstract grafo(): string;

}

export enum TipoFuncion {
    INT,
    DOUBLE,
    BOOLEAN,
    CHAR,
    STRING,
    VOID
}
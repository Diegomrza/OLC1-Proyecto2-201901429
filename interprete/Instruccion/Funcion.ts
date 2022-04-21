import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";
import { Statement } from "./Statement";


export class Funcion extends Instruccion {

    constructor(public id: string, public statement: Statement, public parametros: Array<string>, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        ambito.guardarFuncion(this.id, this);
    }
}
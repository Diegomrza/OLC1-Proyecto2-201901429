import { Ambito } from "../Extra/Ambito";
import { Instruccion, TipoFuncion } from "./Instruccion";
import { Statement } from "./Statement";


export class Funcion extends Instruccion {

    constructor(public id: string, public cuerpo: Statement, public parametros: Array<string>, public tipo: TipoFuncion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        ambito.guardarFuncion(this.id, this, this.line, this.column);
    }
}
import { Ambito } from "../Extra/Ambito";
import { Instruccion, TipoFuncion } from "../Instruccion/Instruccion";
import { Statement } from "../Instruccion/Statement";


export class Funcion extends Instruccion {

    constructor(
        public id: string, 
        public cuerpo: Statement, 
        public parametros: Array<[string, number]>, 
        public tipo: TipoFuncion, 
        line: number, 
        column: number
        ) {
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        ambito.guardarFuncion(this.id, this, this.line, this.column);
    }

    public grafo(): string {
        return "";
    }
}
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Continue extends Instruccion {
    constructor(line:number, column:number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return { type: 'Continue', line: this.line, column: this.column }
    }

}
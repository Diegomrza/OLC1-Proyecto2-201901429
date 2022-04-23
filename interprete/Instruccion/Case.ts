import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";
import { Statement } from "./Statement";

export class Case extends Instruccion {
    constructor(public opcion: Expresion, public cuerpo: Instruccion, line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        let valCuerpo = this.cuerpo.execute(ambito);
        if (valCuerpo != null && valCuerpo != undefined) return valCuerpo;
    }
}
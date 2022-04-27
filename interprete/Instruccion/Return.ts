import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Return extends Instruccion {
    constructor(private expresion: Expresion | Instruccion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        let Valor = this.expresion.execute(ambito);
        return {
            type: "Return",
            line: this.line,
            column: this.column,
            value: Valor.value
        }
    }

}
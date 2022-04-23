import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Do_While extends Instruccion {
    constructor(private condicion: Expresion, private cuerpo: Instruccion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        let condition = null;
        do {
            const retorno = this.cuerpo.execute(ambito);
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break;
                } else if (retorno.type == 'Continue') {
                    continue;
                }
            }
            condition = this.condicion.execute(ambito);
            if (condition.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "", ``);
        } while (condition.value)
    }

}
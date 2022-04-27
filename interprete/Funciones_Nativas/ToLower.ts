import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { nombreTipos } from "../Expresion/Literal";
import { Retorno, TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class ToLower extends Instruccion {
    constructor(private expresion: Expresion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let valor = this.expresion.execute(ambito);
        if (valor.tipoDato != TipoDato.CADENA) throw new Error_(this.line, this.column, "Semántico", `No se aplicar esta función a un tipo: ${nombreTipos(valor.tipoDato)}`);

        let minus = valor.value.toLowerCase();
        return {
            value: minus,
            type: Type.CADENA,
            tipoDato: TipoDato.CADENA
        }
    }
}
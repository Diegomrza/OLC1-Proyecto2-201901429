import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { nombreTipos } from "../Expresion/Literal";
import { Retorno, TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class Round extends Instruccion {
    constructor(private expresion: Expresion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let valor = this.expresion.execute(ambito);

        if (valor.tipoDato != TipoDato.DOBLE) throw new Error_(this.line, this.column, "Semántico", `No se puede redondear un tipo: ${nombreTipos(valor.tipoDato)}`);

        let redondeado = Math.round(valor.value).toFixed(1);

        return {
            value: redondeado,
            type: Type.DOBLE,
            tipoDato: TipoDato.DOBLE
        }
    }
}
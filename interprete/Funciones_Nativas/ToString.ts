import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Retorno, TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class ToString extends Instruccion {
    constructor(private expresion: Expresion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {

        let valor = this.expresion.execute(ambito);

        let val = valor.value;

        val = val.toString();

        if (valor.tipoDato == TipoDato.CADENA) throw new Error_(this.line, this.column, "", `No se puede castear un string a string`);

        return {
            value: val,
            type: Type.CADENA,
            tipoDato: TipoDato.CADENA
        }

    }
}
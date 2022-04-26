import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class ToCharArray extends Instruccion {
    constructor(private expresion: Expresion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        //Tiene que ser una cadena

        let val = this.expresion.execute(ambito);
        if (val.type != Type.CADENA) throw new Error_(this.line, this.column, "Semántico", `El valor recibido no es un string`);

        let arreglo = val.value.split("");
        return {
            value: arreglo,
            type: Type.VECTOR
        }

    }
}
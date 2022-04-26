import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { nombreTipos } from "../Expresion/Literal";
import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class Round extends Instruccion{
    constructor(private expresion: Expresion, line:number, column:number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let valor = this.expresion.execute(ambito);

        if (valor.type != Type.DOBLE) throw new Error_(this.line, this.column, "Semántico", `No se puede redondear un tipo: ${nombreTipos(valor.type)}`); 
        let redondeado = Math.round(valor.value).toFixed(1);
        return {
            value: redondeado,
            type: Type.DOBLE
        }
    }
}
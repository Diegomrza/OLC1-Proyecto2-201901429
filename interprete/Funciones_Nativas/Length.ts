import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class Length extends Instruccion{
    constructor(private expresion: Instruccion , line:number, column:number){
        super(line, column);
    }

    public execute(ambito: Ambito):Retorno {
        //Recibe vector, lista o cadena
        let exp = this.expresion.execute(ambito);
        

        if (exp.type != Type.VECTOR && exp.type != Type.CADENA) throw new Error_(this.line, this.column, "Semántico", `No se puede obtener el tamaño de un tipo: ${exp.type}`);

        let tamanio = exp.value.length;

        return {
            value: tamanio,
            type: Type.ENTERO
        }

    }
}
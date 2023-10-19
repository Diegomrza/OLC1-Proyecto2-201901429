import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Literal, TipoLiteral } from "../Expresion/Literal";
import { Retorno, TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class ToCharArray extends Instruccion {
    
    constructor(private expresion: Expresion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        //Tiene que ser una cadena

        let val = this.expresion.execute(ambito);
        if (val.tipoDato != TipoDato.CADENA) throw new Error_(this.line, this.column, "Semántico", `El valor recibido no es un string`);

        let arreglo = val.value.split("");
        let aux = [];

        for (const i of arreglo) {
            aux.push(new Literal(i, TipoLiteral.CARACTER, this.line, this.column));
        }
       
        return {
            value: aux,                 //Arreglo
            type: Type.CARACTER,        //Tipo primitivo
            tipoDato: TipoDato.VECTOR   //Tipo de estructura
        }
    }

    public grafo(): string {
        return "";
    }
}
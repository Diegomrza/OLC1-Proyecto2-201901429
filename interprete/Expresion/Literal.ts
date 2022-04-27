import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, TipoDato, Type } from './Retorno';

export class Literal extends Expresion {

    constructor(private value: any, private tipo: TipoLiteral, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {

        if (this.tipo == TipoLiteral.ENTERO) {                      //Si es int
            return {
                value: Number(this.value),
                type: Type.ENTERO,
                tipoDato: TipoDato.ENTERO
            };
        } else if (this.tipo == TipoLiteral.CADENA) {               //Si es string
            return {
                value: this.value.toString(),
                type: Type.CADENA,
                tipoDato: TipoDato.CADENA
            };
        } else if (this.tipo == TipoLiteral.BOOLEAN) {              //Si es boolean
            if (this.value.toString().toLowerCase() == "true") {
                return { 
                    value: true, 
                    type: Type.BOOLEAN,
                    tipoDato: TipoDato.BOOLEAN 
                };
            } else {
                return { 
                    value: false, 
                    type: Type.BOOLEAN,
                    tipoDato: TipoDato.BOOLEAN
                };
            }
        } else if (this.tipo == TipoLiteral.DOBLE) {                //Si es double
            return { 
                value: Number(this.value), 
                type: Type.DOBLE,
                tipoDato: TipoDato.DOBLE 
            }
        } else if (this.tipo == TipoLiteral.CARACTER) {             //Si es char
            return { 
                value: this.value, 
                type: Type.CARACTER,
                tipoDato: TipoDato.CARACTER
            }
        }
    }

}

export enum TipoLiteral {
    ENTERO = 0,//ENTERO
    DOBLE = 1,//DOUBLE
    BOOLEAN = 2,//BOOLEAN
    CARACTER = 3,//CARACTER
    CADENA = 4 //CADENA
}

export function nombreTipos(num: number): string {
    switch (num) {
        case 0:
            return "int";
        case 1:
            return "double";
        case 2:
            return "boolean";
        case 3:
            return "char";
        case 4:
            return "string";
        case 5:
            return "vector";
    }
}
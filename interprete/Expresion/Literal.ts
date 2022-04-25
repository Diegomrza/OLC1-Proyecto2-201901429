import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from './Retorno';

export class Literal extends Expresion {

    constructor(private value: any, private tipo: TipoLiteral, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        if (this.tipo == TipoLiteral.ENTERO) {                      //Si es int
            //console.log(this.value, " - " ,"Entero")
            return { value: Number(this.value), type: Type.ENTERO };

        } else if (this.tipo == TipoLiteral.CADENA) {               //Si es string
            //console.log(this.value, " - " ,"Cadena")
            return { value: this.value.toString(), type: Type.CADENA };

        } else if (this.tipo == TipoLiteral.BOOLEAN) {              //Si es boolean
            //console.log(this.value, " - " ,"Booleano")
            if (this.value.toString().toLowerCase() == "true") {
                return { value: true, type: Type.BOOLEAN }
            } else {
                return { value: false, type: Type.BOOLEAN };
            }
        } else if (this.tipo == TipoLiteral.DOBLE) {                //Si es double
            //console.log(this.value, " - " ,"Decimal")
            return { value: Number(this.value), type: Type.DOBLE }

        } else if (this.tipo == TipoLiteral.CARACTER) {             //Si es char
            //console.log(this.value, " - " ,"Caracter")
            return { value: this.value, type: Type.CARACTER }
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
    }
}
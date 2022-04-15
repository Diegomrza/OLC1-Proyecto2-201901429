import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Extra/Ambito";
export class Relacional extends Expresion {

    constructor(private left:Expresion, private right:Expresion, private tipo:TipoRelacional, line:number, column:number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);

        const rightValue = this.right.execute(ambito);

        console.log(leftValue);
        console.log(rightValue);

        if (this.tipo == TipoRelacional.IGUALIGUAL) {// ==
            let result:any;
            if (leftValue.type == Type.ENTERO || leftValue.type == Type.DOBLE || rightValue.type == Type.ENTERO || rightValue.type == Type.DOBLE) {
                result = Number(leftValue.value) == Number(rightValue.value);
            } else {
                result = leftValue.value == rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.DIFERENTE) {// !=
            let result:any;
            if (leftValue.type == Type.ENTERO || leftValue.type == Type.DOBLE || rightValue.type == Type.ENTERO || rightValue.type == Type.DOBLE) {
                result = Number(leftValue.value) != Number(rightValue.value);
            } else {
                result = leftValue.value != rightValue.value;
            } 
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MAYOR) {// >
            let result:any;
            if (leftValue.type == Type.ENTERO || leftValue.type == Type.DOBLE || rightValue.type == Type.ENTERO || rightValue.type == Type.DOBLE) {
                result = Number(leftValue.value) > Number(rightValue.value);
            } else {
                result = leftValue.value > rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {// >=
            let result:any;
            if (leftValue.type == Type.ENTERO || leftValue.type == Type.DOBLE || rightValue.type == Type.ENTERO || rightValue.type == Type.DOBLE) {
                result = Number(leftValue.value) >= Number(rightValue.value);
            } else {
                result = leftValue.value >= rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MENOR) {// <
            let result:any;
            if (leftValue.type == Type.ENTERO || leftValue.type == Type.DOBLE || rightValue.type == Type.ENTERO || rightValue.type == Type.DOBLE) {
                result = Number(leftValue.value) < Number(rightValue.value);
            } else {
                result = leftValue.value < rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MENOR_IGUAL) {//<=
            let result:any;
            if (leftValue.type == Type.ENTERO || leftValue.type == Type.DOBLE || rightValue.type == Type.ENTERO || rightValue.type == Type.DOBLE) {
                result = Number(leftValue.value) <= Number(rightValue.value);
            } else {
                result = leftValue.value <= rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }
        }

    }

    private esChar(): boolean{

        return false;
    }
}

export enum TipoRelacional {
    AND = 0,
    OR = 1,
    IGUALIGUAL = 2,
    DIFERENTE = 3,
    MAYOR = 4,
    MAYOR_IGUAL = 5,
    MENOR = 6,
    MENOR_IGUAL = 7,
    NOT = 8
}
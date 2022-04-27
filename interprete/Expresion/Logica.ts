import { Expresion } from "./Expresion";
import { Retorno, TipoDato, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Extra/Ambito";
export class Logica extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoLogica, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {

        let leftValue = this.left.execute(ambito); //El izquierdo siempre viene

        let rightValue = null;
        if (this.right != null) {   //Se valida que el segundo venga, sino solo se evalua el primero
            rightValue = this.right.execute(ambito);
        }

        if (this.tipo == TipoLogica.NOT) {  //NOT
            if (leftValue.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `La expresion no es booleana`);
            return {
                value: !(leftValue.value),
                type: Type.BOOLEAN,
                tipoDato: TipoDato.BOOLEAN
            };
        } else if (this.tipo == TipoLogica.AND) {   //AND
            if ((leftValue.type != Type.BOOLEAN) || (rightValue.type != Type.BOOLEAN)) throw new Error_(this.line, this.column, "Semántico", `Una o ambas expresiones no son de tipo booleanas`);
            return {
                value: (leftValue.value && rightValue.value),
                type: Type.BOOLEAN,
                tipoDato: TipoDato.BOOLEAN
            };
        } else if (this.tipo == TipoLogica.OR) {    //OR
            if ((leftValue.type != Type.BOOLEAN) && (rightValue.type != Type.BOOLEAN)) throw new Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
            if (leftValue.value == true) {
                return {
                    value: true,
                    type: Type.BOOLEAN,
                    tipoDato: TipoDato.BOOLEAN
                }
            } else if (rightValue.value == true) {
                return {
                    value: true,
                    type: Type.BOOLEAN,
                    tipoDato: TipoDato.BOOLEAN
                }
            }
            else {
                return {
                    value: (leftValue.value || rightValue.value),
                    type: Type.BOOLEAN,
                    tipoDato: TipoDato.BOOLEAN
                };
            }
        }

    }
}

export enum TipoLogica {
    AND = 0,
    OR = 1,
    NOT = 2
}
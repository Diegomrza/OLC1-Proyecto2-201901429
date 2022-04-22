import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Extra/Ambito";
export class Logica extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoLogica, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {
        
        let leftValue = this.left.execute(ambito);
        
        let rightValue = null;
        if (this.right != null) {
            rightValue = this.right.execute(ambito);
            //if (rightValue.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `La expresion no es booleana`);
        }
        
        console.log(leftValue);
        console.log(rightValue);

        if (this.tipo == TipoLogica.NOT) {
            if (leftValue.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `La expresion no es booleana`);
            return { value: !(leftValue.value), type: Type.BOOLEAN };
        } else if (this.tipo == TipoLogica.AND) {
            // if (leftValue.value == Type.BOOLEAN) {
            //     const rightValue = this.right.execute(ambito);
            //     if (rightValue.type === Type.BOOLEAN) {
            if ((leftValue.type != Type.BOOLEAN) || (rightValue.type != Type.BOOLEAN)) throw new Error_(this.line, this.column, "Semántico", `Una o ambas expresiones no son de tipo booleanas`);
            return { value: (leftValue.value && rightValue.value), type: Type.BOOLEAN };
            //     }
            //     throw new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos')
            // }
            // throw new Error_(this.line, this.column, 'Semantico', 'No se pueden operar estos tipos')
        } else if (this.tipo == TipoLogica.OR) {
            if ((leftValue.type != Type.BOOLEAN) && (rightValue.type != Type.BOOLEAN)) throw new Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
            console.log("si")
            if (leftValue.value == true) {
                return {value: true, type:Type.BOOLEAN}
            } else if (rightValue.value == true) {
                return {value: true, type:Type.BOOLEAN}
            }
             else {
                return { value: (leftValue.value || rightValue.value), type: Type.BOOLEAN };
            }
        }

    }
}

export enum TipoLogica {
    AND = 0,
    OR = 1,
    NOT = 2
}
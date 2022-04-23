import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Extra/Ambito";
export class Relacional extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoRelacional, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito); //Ejecucion de la parte izquierda => {type, value}
        const rightValue = this.right.execute(ambito); //Ejecucion de la parte derecha => {type, value}

        if ((leftValue.type == Type.CADENA && rightValue.type == Type.CARACTER) || (leftValue.type == Type.CARACTER && rightValue.type == Type.CADENA)) {
            throw new Error_(this.line, this.column, 'Semántico', `No se pueden operar ${leftValue.type} con  ${rightValue.type}`);
        } else {
            if ((leftValue.type == Type.ENTERO && rightValue.type == Type.ENTERO) ||
                (leftValue.type == Type.ENTERO && rightValue.type == Type.DOBLE) ||
                (leftValue.type == Type.ENTERO && rightValue.type == Type.CARACTER) ||
                (leftValue.type == Type.DOBLE && rightValue.type == Type.ENTERO) ||
                (leftValue.type == Type.DOBLE && rightValue.type == Type.DOBLE) ||
                (leftValue.type == Type.DOBLE && rightValue.type == Type.CARACTER) ||
                (leftValue.type == Type.CARACTER && rightValue.type == Type.ENTERO) ||
                (leftValue.type == Type.CARACTER && rightValue.type == Type.DOBLE) ||
                (leftValue.type == Type.CARACTER && rightValue.type == Type.CARACTER) ||
                (leftValue.type == Type.BOOLEAN && rightValue.type == Type.BOOLEAN) ||
                (leftValue.type == Type.CADENA && rightValue.type == Type.CADENA)) {
                    return this.relaciones(leftValue, rightValue);
            } else {
                throw new Error_(this.line, this.column, 'Semántico', `No se pueden operar ${leftValue.type} con  ${rightValue.type}`);
            }
        }
    }

    private relaciones(leftValue: Retorno, rightValue: Retorno): Retorno {

        let asciiLeft = null;
        let asciiRight = null;
        if (leftValue.type == Type.CARACTER) asciiLeft = leftValue.value.charCodeAt(0);
        if (rightValue.type == Type.CARACTER) asciiRight = rightValue.value.charCodeAt(0);

        if (leftValue.type == Type.ENTERO || leftValue.type == Type.DOBLE) {
            leftValue.value = Number(leftValue.value);
        }
        if (rightValue.type == Type.ENTERO || rightValue.type == Type.DOBLE) {
            rightValue.value = Number(rightValue.value);
        }

        if (this.tipo == TipoRelacional.IGUALIGUAL) {// ==
            let result: boolean;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = (asciiLeft === asciiRight);
            } else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = (asciiLeft === rightValue.value);
            } else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = (leftValue.value === asciiRight);
            } else {
                result = (leftValue.value == rightValue.value);
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.DIFERENTE) {// !=
            let result: boolean;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft != asciiRight;
            } else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft != rightValue.value;
            } else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value != asciiRight;
            } else {
                result = leftValue.value != rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MAYOR) {// >
            let result: boolean;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft > asciiRight;
            } else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft > rightValue.value;
            } else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value > asciiRight;
            } else {
                result = leftValue.value > rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {// >=
            let result: boolean;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft >= asciiRight;
            } else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft >= rightValue.value;
            } else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value >= asciiRight;
            } else {
                result = leftValue.value >= rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MENOR) {// <
            let result: boolean;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft < asciiRight;
            } else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft < rightValue.value;
            } else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value < asciiRight;
            } else {
                result = leftValue.value < rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }

        } else if (this.tipo == TipoRelacional.MENOR_IGUAL) {//<=
            let result: boolean;
            if (asciiLeft != null && asciiRight != null) { //Si asciileft y asciiriht son diferente de nulo usamos su valor
                result = asciiLeft <= asciiRight;
            } else if (asciiLeft != null && asciiRight == null) { //Si asciileft es diferente de nulo usamos su valor
                result = asciiLeft <= rightValue.value;
            } else if (asciiLeft == null && asciiRight != null) { //Si asciiriht es diferente de nulo usamos su valor
                result = leftValue.value <= asciiRight;
            } else {
                result = leftValue.value <= rightValue.value;
            }
            return { value: result, type: Type.BOOLEAN }
        }
    }
}

export enum TipoRelacional {
    IGUALIGUAL = 0,
    DIFERENTE = 2,
    MAYOR = 3,
    MAYOR_IGUAL = 4,
    MENOR = 5,
    MENOR_IGUAL = 6
}

/*


Válidos:

entero - double -caracter:

    entero - entero
    entero - double
    entero - caracter
	
    double - entero
    double - double
    double - caracter
	
    caracter - entero
    caracter - double
    caracter - caracter

    boolean - boolean
    cadena - cadena

No válidos:
    cadena - caracter


 */
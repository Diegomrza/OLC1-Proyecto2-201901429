import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno"
import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";

export class Aritmetica extends Expresion {

    constructor(private left: Expresion, private right: Expresion, private tipo: TipoAritmetica, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {

        const leftValue = this.left.execute(ambito);    //va traer un retorno que contiene: value, type
        const rightValue = this.right.execute(ambito);  //va traer un retorno que contiene: value, type

        let asciiLeft = null;
        if (leftValue.type == Type.CARACTER && rightValue.type != Type.CARACTER) {   //Si left = char y right != char
            asciiLeft = leftValue.value.charCodeAt(0); //Obteniendo el codigo ascii
        }

        let asciiRight = null
        if (rightValue.type == Type.CARACTER && leftValue.type != Type.CARACTER) {  //Si right = char y left  != char
            asciiRight = rightValue.value.charCodeAt(0); //Obteniendo el codigo ascii
        }

        let dominante = this.tipoDominante(leftValue.type, rightValue.type); //Devuelve el tipo dominante de la matriz de tipos
        if (dominante == null) throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
        
        if (this.tipo == TipoAritmetica.SUMA) {//SUMA

            if (dominante == Type.CADENA) { //Si el tipo dominante es string
                return {value: (leftValue.value.toString() + rightValue.value.toString()),type: Type.CADENA}
            } else if (dominante == Type.ENTERO) { //Si el tipo dominante es int
                if (asciiLeft != null) {
                    let resultado = asciiLeft + Number(rightValue.value);
                    return {value: resultado, type: Type.ENTERO}
                } else if (asciiRight != null) {
                    let resultado = Number(leftValue.value) + asciiRight;
                    return {value: resultado, type: Type.ENTERO}
                } else {
                    return {value: (Number(leftValue.value) + Number(rightValue.value)),type: Type.ENTERO}
                }
            } else if (dominante == Type.DOBLE) { //Si el tipo dominante es double
                
                if (asciiLeft != null) {
                    let resultado = asciiLeft + Number(rightValue.value);
                    return {value: resultado, type: Type.DOBLE}
                } else if (asciiRight != null) {
                    let resultado = Number(leftValue.value) + asciiRight;
                    return {value: resultado, type: Type.DOBLE}
                } else {
                    return {value: (Number(leftValue.value) + Number(rightValue.value)),type: Type.DOBLE}
                }
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }

        } else if (this.tipo == TipoAritmetica.RESTA) {//RESTA

            if (dominante == Type.ENTERO) {
                if (asciiLeft != null) {
                    return {value: (asciiLeft - rightValue.value),type: Type.ENTERO}
                } else if (asciiRight != null) {
                    return {value: (leftValue.value - asciiRight),type: Type.ENTERO}
                } else {
                    return {value: (leftValue.value - rightValue.value),type: Type.ENTERO}
                }
            } else if (dominante == Type.DOBLE) {
                if (asciiLeft != null) {
                    return {value: (asciiLeft - rightValue.value),type: Type.DOBLE}
                } else if (asciiRight != null) {
                    return {value: (leftValue.value - asciiRight),type: Type.DOBLE}
                } else {
                    return {value: (leftValue.value - rightValue.value),type: Type.DOBLE}
                }
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }

        } else if (this.tipo == TipoAritmetica.MULTIPLICACION) {//MULTIPLICACION

            if (dominante == Type.ENTERO) {
                if (leftValue.type != Type.BOOLEAN || rightValue.type != Type.BOOLEAN) {
                    if (asciiLeft != null) {
                        return {value: (asciiLeft * rightValue.value),type: Type.ENTERO}
                    } else if (asciiRight != null) {
                        return {value: (leftValue.value * asciiRight),type: Type.ENTERO}
                    } else {
                        return {value: (leftValue.value * rightValue.value),type: Type.ENTERO}
                    }
                } else {
                    throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
                }

            } else if (dominante == Type.DOBLE) {
                if (leftValue.type != Type.BOOLEAN || rightValue.type != Type.BOOLEAN) {
                    if (asciiLeft != null) {
                        return {value: (asciiLeft * rightValue.value),type: Type.DOBLE}
                    } else if (asciiRight != null) {
                        return {value: (leftValue.value * asciiRight),type: Type.DOBLE}
                    } else {
                        return {value: (leftValue.value * rightValue.value),type: Type.DOBLE}
                    }
                } else {
                    throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
                }
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }

        } else if (this.tipo == TipoAritmetica.DIVISION) {//DIVISION

            if (dominante == Type.ENTERO) {
                if (rightValue.value == 0) {
                    throw new Error_(this.line, this.column, "Semantico", "No se puede dividir entre 0");
                } else {
                    if (asciiLeft != null) {
                        return {value: (asciiLeft / rightValue.value),type: Type.ENTERO}
                    } else if (asciiRight != null) {
                        return {value: (leftValue.value / asciiRight),type: Type.ENTERO}
                    } else {
                        return {value: (leftValue.value / rightValue.value),type: Type.ENTERO}
                    }
                }
            } else if (dominante == Type.DOBLE) {
                if (rightValue.value == 0) {
                    throw new Error_(this.line, this.column, "Semantico", "No se puede dividir entre 0");
                } else {
                    if (asciiLeft != null) {
                        return {value: (asciiLeft / rightValue.value),type: Type.DOBLE}
                    } else if (asciiRight != null) {
                        return {value: (leftValue.value / asciiRight),type: Type.DOBLE 
                        }
                    } else {
                        return {value: (leftValue.value / rightValue.value),type: Type.DOBLE 
                        }
                    }
                }
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }

        } else if (this.tipo == TipoAritmetica.POTENCIA) {//POTENCIA

            if (dominante == Type.ENTERO) {
                if (leftValue.type == Type.ENTERO && rightValue.type == Type.ENTERO) {
                    return {value: Math.pow(leftValue.value, rightValue.value),type: Type.ENTERO}
                } else {
                    throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
                }
                //return {value: Math.pow(leftValue.value, rightValue.value),type: Type.ENTERO}
            } else if (dominante == Type.DOBLE) {
                return {value: Math.pow(leftValue.value, rightValue.value),type: Type.DOBLE}
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }

        } else if (this.tipo == TipoAritmetica.MODULO) {//MODULO

            if (dominante == Type.ENTERO) {
                return {value: (leftValue.value % rightValue.value),type: Type.ENTERO}
            } else if (dominante == Type.DOBLE) {
                return {value: (leftValue.value % rightValue.value),type: Type.DOBLE}
            } else {
                throw new Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftValue.type + ' _ ' + rightValue.type);
            }

        }

    }

}

export enum TipoAritmetica {
    SUMA = 0,
    RESTA = 1,
    MULTIPLICACION = 2,
    DIVISION = 3,
    POTENCIA = 4,
    MODULO = 5
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoOperacion = exports.TipoAritmetica = exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
const Literal_1 = require("./Literal");
class Aritmetica extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
    }
    execute(ambito) {
        const leftValue = this.left.execute(ambito); //va a traer un retorno que contiene: value, type
        const rightValue = this.right.execute(ambito); //va a traer un retorno que contiene: value, type   
        let asciiLeft = null;
        if (leftValue.type == Retorno_1.Type.CARACTER && rightValue.type != Retorno_1.Type.CARACTER) { //Si left = char y right != char
            asciiLeft = leftValue.value.charCodeAt(0); //Obteniendo el codigo ascii
        }
        let asciiRight = null;
        if (rightValue.type == Retorno_1.Type.CARACTER && leftValue.type != Retorno_1.Type.CARACTER) { //Si right = char y left  != char
            asciiRight = rightValue.value.charCodeAt(0); //Obteniendo el codigo ascii
        }
        let dominante = this.tipoDominante(leftValue.type, rightValue.type); //Devuelve el tipo dominante de la matriz de tipos
        if (dominante == null)
            throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
        if (this.tipo == TipoAritmetica.SUMA) { //SUMA
            if (dominante == Retorno_1.Type.CADENA) { //Tipo dominante string
                return { value: (leftValue.value.toString() + rightValue.value.toString()), type: Retorno_1.Type.CADENA };
            }
            else if (dominante == Retorno_1.Type.ENTERO) { //Si el tipo dominante es int
                if (asciiLeft != null) { //Si el izquierdo tiene un ascii
                    return { value: (asciiLeft + Number(rightValue.value)), type: Retorno_1.Type.ENTERO };
                }
                else if (asciiRight != null) { //Si el derecho tiene un ascii
                    return { value: (Number(leftValue.value) + asciiRight), type: Retorno_1.Type.ENTERO };
                }
                else { //Caso general
                    return { value: (Number(leftValue.value) + Number(rightValue.value)), type: Retorno_1.Type.ENTERO };
                }
            }
            else if (dominante == Retorno_1.Type.DOBLE) { //Tipo dominante double
                if (asciiLeft != null) { //Si el izquierdo tiene un ascii
                    return { value: (asciiLeft + Number(rightValue.value)), type: Retorno_1.Type.DOBLE };
                }
                else if (asciiRight != null) { //Si el derecho tiene un ascii
                    return { value: (Number(leftValue.value) + asciiRight), type: Retorno_1.Type.DOBLE };
                }
                else { //Caso general
                    return { value: (Number(leftValue.value) + Number(rightValue.value)), type: Retorno_1.Type.DOBLE };
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, 'Semántico', 'No se puede operar: ' + leftValue.type + ' con ' + rightValue.type); //Error
            }
        }
        else if (this.tipo == TipoAritmetica.RESTA) { //RESTA
            if (dominante == Retorno_1.Type.ENTERO) {
                if (asciiLeft != null) {
                    return { value: (asciiLeft - rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else if (asciiRight != null) {
                    return { value: (leftValue.value - asciiRight), type: Retorno_1.Type.ENTERO };
                }
                else {
                    return { value: (leftValue.value - rightValue.value), type: Retorno_1.Type.ENTERO };
                }
            }
            else if (dominante == Retorno_1.Type.DOBLE) {
                if (asciiLeft != null) {
                    return { value: (asciiLeft - rightValue.value), type: Retorno_1.Type.DOBLE };
                }
                else if (asciiRight != null) {
                    return { value: (leftValue.value - asciiRight), type: Retorno_1.Type.DOBLE };
                }
                else {
                    return { value: (leftValue.value - rightValue.value), type: Retorno_1.Type.DOBLE };
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
            }
        }
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) { //MULTIPLICACION
            if (dominante == Retorno_1.Type.ENTERO) {
                if (leftValue.type != Retorno_1.Type.BOOLEAN && rightValue.type != Retorno_1.Type.BOOLEAN) {
                    if (asciiLeft != null) {
                        return { value: (asciiLeft * rightValue.value), type: Retorno_1.Type.ENTERO };
                    }
                    else if (asciiRight != null) {
                        return { value: (leftValue.value * asciiRight), type: Retorno_1.Type.ENTERO };
                    }
                    else {
                        return { value: (leftValue.value * rightValue.value), type: Retorno_1.Type.ENTERO };
                    }
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
            }
            else if (dominante == Retorno_1.Type.DOBLE) {
                if (leftValue.type != Retorno_1.Type.BOOLEAN && rightValue.type != Retorno_1.Type.BOOLEAN) {
                    if (asciiLeft != null) {
                        return { value: (asciiLeft * rightValue.value), type: Retorno_1.Type.DOBLE };
                    }
                    else if (asciiRight != null) {
                        return { value: (leftValue.value * asciiRight), type: Retorno_1.Type.DOBLE };
                    }
                    else {
                        return { value: (leftValue.value * rightValue.value), type: Retorno_1.Type.DOBLE };
                    }
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
            }
        }
        else if (this.tipo == TipoAritmetica.DIVISION) { //DIVISION
            if (dominante == Retorno_1.Type.ENTERO) {
                if (leftValue.type != Retorno_1.Type.BOOLEAN && rightValue.type != Retorno_1.Type.BOOLEAN) {
                    if (rightValue.value == 0) {
                        throw new Error_1.Error_(this.line, this.column, "Semántico", "No se puede dividir entre 0");
                    }
                    else {
                        if (asciiLeft != null) {
                            return { value: (asciiLeft / rightValue.value), type: Retorno_1.Type.DOBLE };
                        }
                        else if (asciiRight != null) {
                            return { value: (leftValue.value / asciiRight), type: Retorno_1.Type.DOBLE };
                        }
                        else {
                            return { value: (leftValue.value / rightValue.value), type: Retorno_1.Type.DOBLE };
                        }
                    }
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
            }
            else if (dominante == Retorno_1.Type.DOBLE) {
                if (leftValue.type != Retorno_1.Type.BOOLEAN && rightValue.type != Retorno_1.Type.BOOLEAN) {
                    if (rightValue.value == 0) {
                        throw new Error_1.Error_(this.line, this.column, "Semántico", "No se puede dividir entre 0");
                    }
                    else {
                        if (asciiLeft != null) {
                            return { value: (asciiLeft / rightValue.value), type: Retorno_1.Type.DOBLE };
                        }
                        else if (asciiRight != null) {
                            return {
                                value: (leftValue.value / asciiRight), type: Retorno_1.Type.DOBLE
                            };
                        }
                        else {
                            return {
                                value: (leftValue.value / rightValue.value), type: Retorno_1.Type.DOBLE
                            };
                        }
                    }
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
            }
        }
        else if (this.tipo == TipoAritmetica.POTENCIA) { //POTENCIA
            if (dominante == Retorno_1.Type.ENTERO) {
                if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Math.pow(leftValue.value, rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
                //return {value: Math.pow(leftValue.value, rightValue.value),type: Type.ENTERO}
            }
            else if (dominante == Retorno_1.Type.DOBLE) {
                if (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.ENTERO) {
                    return { value: Math.pow(leftValue.value, rightValue.value), type: Retorno_1.Type.DOBLE };
                }
                else if (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.DOBLE) {
                    return { value: Math.pow(leftValue.value, rightValue.value), type: Retorno_1.Type.DOBLE };
                }
                else if (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOBLE) {
                    return { value: Math.pow(leftValue.value, rightValue.value), type: Retorno_1.Type.DOBLE };
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
                //return { value: Math.pow(leftValue.value, rightValue.value), type: Type.DOBLE }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
            }
        }
        else if (this.tipo == TipoAritmetica.MODULO) { //MODULO
            if (dominante == Retorno_1.Type.ENTERO) {
                if ((leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO) ||
                    (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.DOBLE) ||
                    (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOBLE) ||
                    (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.ENTERO)) {
                    return { value: (leftValue.value % rightValue.value), type: Retorno_1.Type.ENTERO };
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
            }
            else if (dominante == Retorno_1.Type.DOBLE) {
                if ((leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.ENTERO) ||
                    (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.DOBLE) ||
                    (leftValue.type == Retorno_1.Type.ENTERO && rightValue.type == Retorno_1.Type.DOBLE) ||
                    (leftValue.type == Retorno_1.Type.DOBLE && rightValue.type == Retorno_1.Type.ENTERO)) {
                    return { value: (leftValue.value % rightValue.value), type: Retorno_1.Type.DOBLE };
                }
                else {
                    throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
                }
            }
            else {
                throw new Error_1.Error_(this.line, this.column, 'Semántico', this.mensaje(leftValue, rightValue));
            }
        }
        // else if () {
        // }
    }
    mensaje(leftValue, rightValue) {
        return `No se puede realizar esta operación => ${tipoOperacion(this.tipo)} con: ` + (0, Literal_1.nombreTipos)(leftValue.type) + ' y ' + (0, Literal_1.nombreTipos)(rightValue.type);
    }
}
exports.Aritmetica = Aritmetica;
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["POTENCIA"] = 4] = "POTENCIA";
    TipoAritmetica[TipoAritmetica["MODULO"] = 5] = "MODULO";
})(TipoAritmetica = exports.TipoAritmetica || (exports.TipoAritmetica = {}));
function tipoOperacion(num) {
    switch (num) {
        case 0:
            return "suma";
        case 1:
            return "resta";
        case 2:
            return "multiplicacion";
        case 3:
            return "division";
        case 4:
            return "potencia";
        case 5:
            return "modulo";
    }
}
exports.tipoOperacion = tipoOperacion;

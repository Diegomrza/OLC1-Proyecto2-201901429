"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Error_1 = require("../Error/Error");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Acceso extends Expresion_1.Expresion {
    constructor(id, //identificador de la variable
    tipoAcceso, //Variable = 0, vector = 1, matriz = 2
    valor1, //Para vector se usa valor1
    valor2, //Para matriz se usa valor1 y valor2
    line, //Linea
    column //Columna
    ) {
        super(line, column);
        this.id = id;
        this.tipoAcceso = tipoAcceso;
        this.valor1 = valor1;
        this.valor2 = valor2;
        this.line = line;
        this.column = column;
    }
    execute(ambito) {
        const value = ambito.getVal(this.id);
        if (value != null) {
            if (this.tipoAcceso == 0) { //Variables
                //if (value.valor instanceof Array) throw new Error_(this.line, this.column, "Semántico", `No se puede obtener este tipo de dato`)
                return {
                    value: value.valor,
                    type: value.type,
                    tipoDato: value.TipoDato
                };
            }
            else if (this.tipoAcceso == 1) { //Vector
                let v1 = this.valor1.execute(ambito);
                if (v1.type != Retorno_1.Type.ENTERO)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `El valor de acceso debe ser de tipo int.`);
                if (v1.value >= value.valor.length)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `La posición no existe.`);
                let vector = value.valor;
                if (value.valor instanceof Array) {
                    return {
                        value: value.valor[v1.value],
                        type: value.type,
                        tipoDato: value.TipoDato
                    };
                }
                return {
                    value: vector[v1.value],
                    type: value.type,
                    tipoDato: value.type
                };
            }
            else if (this.tipoAcceso == 2) { //Matriz
                let v1 = this.valor1.execute(ambito);
                let v2 = this.valor2.execute(ambito);
                if (v1.type != Retorno_1.Type.ENTERO || v2.type != Retorno_1.Type.ENTERO)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `Ambos valores de acceso deben ser de tipo int.`);
                if (v1.value >= value.valor.length || v2.value >= value.valor[0].length)
                    throw new Error_1.Error_(this.line, this.column, "Semántico", `La posición no existe.`);
                let vector = value.valor;
                return {
                    value: vector[v1.value][v2.value],
                    type: value.type,
                    tipoDato: value.type
                };
            }
        }
        else {
            throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se encuentra la variable ${this.id}`);
        }
    }
    grafo() {
        return "";
    }
}
exports.Acceso = Acceso;

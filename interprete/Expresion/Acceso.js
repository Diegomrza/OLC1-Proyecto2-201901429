"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Error_1 = require("../Error/Error");
const Expresion_1 = require("./Expresion");
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
                return {
                    value: value.valor,
                    type: value.type,
                    tipoDato: value.TipoDato
                };
            }
            else if (this.tipoAcceso == 1) { //Vector
                let v1 = this.valor1.execute(ambito);
                let vector = value.valor;
                return {
                    value: vector[v1.value],
                    type: value.type,
                    tipoDato: value.TipoDato
                };
            }
            else if (this.tipoAcceso == 2) { //Matriz
                let v1 = this.valor1.execute(ambito);
                let v2 = this.valor2.execute(ambito);
                let vector = value.valor;
                return {
                    value: vector[v1.value][v2.value],
                    type: value.type,
                    tipoDato: value.TipoDato
                };
            }
        }
        else {
            throw new Error_1.Error_(this.line, this.column, 'Semántico', `No se encuentra la variable ${this.id}`);
        }
    }
}
exports.Acceso = Acceso;

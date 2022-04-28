"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Increment_Decrement = void 0;
const Error_1 = require("../Error/Error");
const Literal_1 = require("../Expresion/Literal");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class Increment_Decrement extends Instruccion_1.Instruccion {
    constructor(id, value, incremento, line, column) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.incremento = incremento;
        this.tipo = 0;
    }
    execute(ambito) {
        let val = this.value.execute(ambito);
        let variable = ambito.getVal(this.id);
        if (!variable)
            throw new Error_1.Error_(this.line, this.column, "Semántico", `La variable ${this.id} no existe`);
        if (val.type == Retorno_1.Type.DOBLE) {
            if (this.incremento) {
                ++variable.valor;
                //val.value++;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            }
            else {
                --variable.valor;
                //val.value--;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            }
            return {
                value: variable.valor,
                type: val.type,
                tipoDato: val.tipoDato
            };
        }
        else if (val.type == Retorno_1.Type.ENTERO) {
            if (this.incremento) {
                ++variable.valor;
                //val.value++;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            }
            else {
                --variable.valor;
                //val.value--;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            }
            return {
                value: variable.valor,
                type: val.type,
                tipoDato: val.tipoDato
            };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", `Este operador no aplica con ${(0, Literal_1.nombreTipos)(val.tipoDato)}`);
        }
    }
    grafo() {
        return "";
    }
}
exports.Increment_Decrement = Increment_Decrement;

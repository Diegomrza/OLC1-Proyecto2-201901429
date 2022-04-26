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
    }
    execute(ambito) {
        let val = this.value.execute(ambito);
        if (val.type == Retorno_1.Type.DOBLE) {
            if (this.incremento) {
                val.value++;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.type);
            }
            else {
                val.value--;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.type);
            }
            return { value: val.value, type: Retorno_1.Type.DOBLE };
        }
        else if (val.type == Retorno_1.Type.ENTERO) {
            if (this.incremento) {
                val.value++;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.type);
            }
            else {
                val.value--;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.type);
            }
            return { value: val.value, type: Retorno_1.Type.ENTERO };
        }
        else {
            throw new Error_1.Error_(this.line, this.column, "Semántico", `Este operador no aplica con ${(0, Literal_1.nombreTipos)(val.type)}`);
        }
    }
}
exports.Increment_Decrement = Increment_Decrement;

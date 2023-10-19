"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Instruccion_1 = require("./Instruccion");
class If extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, elsE, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.elsE = elsE;
    }
    execute(ambito) {
        const value = this.condicion.execute(ambito);
        if (value.tipoDato != Retorno_1.TipoDato.BOOLEAN)
            throw new Error_1.Error_(this.line, this.column, 'Semántico', 'La condicion a evaluar en el if no es de tipo booleano');
        if (value.value) {
            return this.cuerpo.execute(ambito);
        }
        else if (this.elsE != null) {
            return this.elsE.execute(ambito);
        }
    }
    grafo() {
        return "";
    }
}
exports.If = If;
//1. ejecutar la condicion
//2. verificar que la condicion sea de tipo booleana
//3. validar que la condicion se verdadera o falsa
//4. ejecutar las instrucciones si en caso fuese verdadera
//5. si en caso fuese falsa ejectura else si es diferente de nulo

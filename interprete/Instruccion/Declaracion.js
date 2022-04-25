"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Instruccion_1 = require("./Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(id, value, line, column, tipoAsignacion, tipo) {
        super(line, column);
        this.id = id;
        this.value = value;
        this.tipoAsignacion = tipoAsignacion;
        this.tipo = tipo;
    }
    execute(ambito) {
        //console.log("Value: ",this.value);
        let val = this.value.execute(ambito);
        // console.log("This.tipo: ",this.tipo);
        // console.log("Valor: ",val);
        // if (val.type == this.tipo) {
        for (const ids of this.id) {
            ambito.setVal(ids, val.value, val.type, this.line, this.column, this.tipoAsignacion);
        }
        // } else {
        //     throw new Error_(this.line, this.column, 'Semántico', `no se puede asignar un tipo ${val.type} a un ${this.tipo}`);
        // }
    }
}
exports.Declaracion = Declaracion;

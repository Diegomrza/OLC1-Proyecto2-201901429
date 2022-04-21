import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";
import { Ambito } from '../Extra/Ambito';
import { Error_ } from "../Error/Error";

export class Declaracion extends Instruccion {

    constructor(private id:[], private value: Expresion, line: number, column: number, private tipoAsignacion: number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {

        let val = this.value.execute(ambito);
        
        for (const ids of this.id) {
            ambito.setVal(ids, val.value, val.type, this.line, this.column, this.tipoAsignacion);
        }

    }
}
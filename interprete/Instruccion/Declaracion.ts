import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";
import { Ambito } from '../Extra/Ambito';

export class Declaracion extends Instruccion {

    constructor(private id:string, private value:Expresion, line:number, column:number, private tipoAsignacion:number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        console.log(this.value)
        let val = this.value.execute(ambito);
        ambito.setVal(this.id, val.value, val.type, this.line, this.column, this.tipoAsignacion);
    }
}
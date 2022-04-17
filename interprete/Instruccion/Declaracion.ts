import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";
import { Ambito } from '../Extra/Ambito';
import { Error_ } from "../Error/Error";

export class Declaracion extends Instruccion {

    constructor(private id:string, private value:Expresion, line:number, column:number, private tipoAsignacion:number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        if (this.value != null) {
            let val = this.value.execute(ambito);
            ambito.setVal(this.id, val.value, val.type, this.line, this.column, this.tipoAsignacion);
        } else {
            throw new Error_(this.line, this.column, "SEMANTICO", "variable no inicializada");
        }
        
    }
}
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { nombreTipos } from "../Expresion/Literal";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Increment_Decrement extends Instruccion {
    constructor (private id:string, private value:Expresion, public incremento:boolean, line:number, column:number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        let val = this.value.execute(ambito);

        if (val.type == Type.DOBLE) {
            if (this.incremento) {
                val.value++;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1);
            } else {
                val.value--;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1);
            }
            return {value:val.value, type:Type.DOBLE}
        } else if (val.type == Type.ENTERO) {
            if (this.incremento) {
                val.value++;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1);
            } else {
                val.value--;
                ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1);
            }
            return {value:val.value, type:Type.ENTERO}
        } else {
            throw new Error_(this.line, this.column, "Semántico", `Este operador no aplica con ${nombreTipos(val.type)}`);
        }
        
    }
}
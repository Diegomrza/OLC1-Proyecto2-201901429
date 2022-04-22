import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";
import { Ambito } from '../Extra/Ambito';
import { Error_ } from "../Error/Error";
import { TipoLiteral } from "../Expresion/Literal";
import { Type } from "../Expresion/Retorno";

export class Declaracion extends Instruccion {

    constructor(private id:[], private value: Expresion, line: number, column: number, private tipoAsignacion: number, private tipo:Type) {
        super(line, column);
    }

    public execute(ambito: Ambito) {

        let val = this.value.execute(ambito);
        //console.log(this.tipo);
        //console.log(val);

        if (val.type == this.tipo) {
            for (const ids of this.id) {
                ambito.setVal(ids, val.value, val.type, this.line, this.column, this.tipoAsignacion);
            }
        } else {
            throw new Error_(this.line, this.column, 'Semantico', `no se puede asignar un tipo ${val.type} a un ${this.tipo}`);
        }
        
        

    }
}
import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

export class Acceso extends Expresion{
    constructor(private id:string, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito): Retorno {
        const value = ambito.getVal(this.id);
        if(value != null) return {value:value.valor, type:value.type};
        throw new Error_(this.line, this.column, 'Semantico', `No se encuentra la variable ${this.id}`);
    }
}
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class For extends Instruccion {
    
    constructor(private param1:Instruccion, private condicion:Expresion, private actualizacion: Instruccion, private cuerpo:Instruccion, line:number, column:number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {

        let val = this.condicion.execute(ambito);
        
        if (val.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `La condicion a evaluar no es de tipo boolean`)
        
        while (val.value) {
            const retorno = this.cuerpo.execute(ambito);
            if (retorno.type == 'Break') {
                break;
            } else if (retorno.this == 'Continue') {
                continue;
            }
            this.actualizacion.execute(ambito); //Actualizacion tiene que ser de tipo declaracion o de tipo incremento/decremento
            val = this.condicion.execute(ambito); //tipo retorno: {type, value}
        }

    }

}
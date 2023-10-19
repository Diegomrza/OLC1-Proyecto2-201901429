import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class For extends Instruccion {

    constructor(private decl_asig: Instruccion, private condicion: Expresion, private actualizacion: Instruccion, private cuerpo: Instruccion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {

        const nuevoAmbito = new Ambito(ambito, ambito.nombre); //Ambito para declaracion o asignacion
        this.decl_asig.execute(nuevoAmbito);    //Ejecutamos la declaracion

        let val = this.condicion.execute(nuevoAmbito);  //
        
        
        if (val.tipoDato != TipoDato.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `La condicion a evaluar no es de tipo boolean`)

        while (val.value) {
            const entorno = new Ambito(nuevoAmbito, nuevoAmbito.nombre);    //Ambito del for

            const retorno = this.cuerpo.execute(entorno);   //
            if (retorno != null && retorno != undefined) {
                if (retorno.type == 'Break') {
                    break;
                } else if (retorno.type == 'Continue') {
                    continue;
                } else if (retorno.type == 'Return') {
                    return retorno.value;
                }
            }
            
            this.actualizacion.execute(nuevoAmbito); //Actualizacion tiene que ser de tipo declaracion o de tipo incremento/decremento
            val = this.condicion.execute(nuevoAmbito); //tipo retorno: {type, value, tipoDato}
        }

    }

    public grafo(): string {
        return "";
    }

}
import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { nombreTipos } from "../Expresion/Literal";
import { Retorno, TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Increment_Decrement extends Instruccion {
    public tipo: number = 0;
    constructor(private id: string, private value: Expresion, public incremento: boolean, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        let val = this.value.execute(ambito);
        let variable = ambito.getVal(this.id);
        if (!variable) throw new Error_(this.line, this.column, "Semántico", `La variable ${this.id} no existe`);

        if (val.type == Type.DOBLE) {
            if (this.incremento) {
                ++variable.valor;
                //val.value++;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            } else {
                --variable.valor;
                //val.value--;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            }
            return {
                value: variable.valor,
                type: val.type,
                tipoDato: val.tipoDato
            }
        } else if (val.type == Type.ENTERO) {
            if (this.incremento) {
                ++variable.valor;
                //val.value++;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            } else {
                --variable.valor;
                //val.value--;
                //ambito.setVal(this.id, val.value, val.type, this.line, this.column, 1, val.tipoDato);
            }
            return { 
                value: variable.valor, 
                type: val.type,
                tipoDato: val.tipoDato
            }
        } else {
            throw new Error_(this.line, this.column, "Semántico", `Este operador no aplica con ${nombreTipos(val.tipoDato)}`);
        }

    }

    public grafo(): string {
        return "";
    }
}
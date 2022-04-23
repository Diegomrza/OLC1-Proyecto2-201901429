import { Error_ } from "../Error/Error";
import { TipoLiteral } from "../Expresion/Literal";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Ternario extends Instruccion {
    constructor (private condicion, private cuerpo:Instruccion, private ElsE:Instruccion, line:number, column:number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        const valor = this.condicion.execute(ambito);

        if (valor.type != Type.BOOLEAN) throw new Error_(this.line, this.column, 'Semántico', 'La condicion a evaluar no es de tipo boolean')

        if (valor.value) {
            return this.cuerpo.execute(ambito);
        } else if (this.ElsE != null) {
            return this.ElsE.execute(ambito);
        }

    }


}
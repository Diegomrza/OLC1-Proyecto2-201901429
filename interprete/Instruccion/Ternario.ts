import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Retorno, TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Ternario extends Instruccion {
    constructor(private condicion: Expresion, private cuerpo: Instruccion, private ElsE: Instruccion, private tipo: TipoDato, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        const valor = this.condicion.execute(ambito);

        if (valor.type != Type.BOOLEAN) throw new Error_(this.line, this.column, 'Semántico', 'La condicion a evaluar no es de tipo boolean.')

        if (valor.value) {
            return this.cuerpo.execute(ambito);
        } else if (this.ElsE != null) {
            return this.ElsE.execute(ambito);
        }
    }

    public grafo(): string {
        return "";
    }
}
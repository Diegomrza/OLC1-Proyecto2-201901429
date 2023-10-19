import { Expresion } from "./Expresion";
import { Retorno, TipoDato, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Extra/Ambito";
export class Logica extends Expresion {
    public tipo = Type.BOOLEAN;
    constructor(private left: Expresion, private right: Expresion, private tipoL: TipoLogica, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        switch (this.tipoL) {
            case TipoLogica.OR:
                return this.or(ambito);
            case TipoLogica.AND:
                return this.and(ambito);
            case TipoLogica.NOT:
                return this.not(ambito);
        }
    }

    public grafo(): string {
        return "";
    }

    private or(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type != Type.BOOLEAN && derecha.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
        return {
            value: (izquierda.value || derecha.value),
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

    private and(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);
        if (izquierda.type != Type.BOOLEAN || derecha.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
        return {
            value: (izquierda.value && derecha.value),
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

    private not(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        if (izquierda.type != Type.BOOLEAN) throw new Error_(this.line, this.column, "Semántico", `Ninguna de las expresiones son de tipo booleanas`);
        return {
            value: !izquierda.value,
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

}

export enum TipoLogica {
    AND = 0,
    OR = 1,
    NOT = 2
}
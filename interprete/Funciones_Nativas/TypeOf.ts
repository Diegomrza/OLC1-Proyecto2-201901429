import { Expresion } from "../Expresion/Expresion";
import { Retorno, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";

export class TypeOf extends Instruccion {
    constructor(private expresion: Expresion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {

        let valor = this.expresion.execute(ambito);

        return {
            value: this.tipo(valor.type),
            type: Type.CADENA
        };

    }

    private tipo(num: number) {
        switch (num) {
            case 0:
                return "int";
            case 1:
                return "double";
            case 2:
                return "boolean"
            case 3:
                return "char";
            case 4:
                return "string";
            case 5:
                return "vector";
        }
    }

}
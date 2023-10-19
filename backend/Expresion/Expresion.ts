import { Ambito } from "../Extra/Ambito";
import { tipos, Type, Retorno, matrizResta, matrizMultiplicacion, matrizDivision, matrizPotencia, matrizModulo } from "./Retorno"

export abstract class Expresion {

    constructor(public line: number, public column: number) {
        this.line = line;
        this.column = column;
    }

    public abstract execute(ambito: Ambito): Retorno

    public abstract grafo(): string;

    public tipoDominante(tipo1: Type, tipo2: Type): Type {
        return tipos[tipo1][tipo2];
    }

    public tipoDominanteSuma(tipo1: Type, tipo2: Type): Type {
        return tipos[tipo1][tipo2];
    }

    public tipoDominanteResta(tipo1: Type, tipo2: Type): Type {
        return matrizResta[tipo1][tipo2];
    }

    public tipoDominanteMultiplicacion(tipo1: Type, tipo2: Type): Type {
        return matrizMultiplicacion[tipo1][tipo2];
    }

    public tipoDominanteDivision(tipo1: Type, tipo2: Type): Type {
        return matrizDivision[tipo1][tipo2];
    }

    public tipoDominantePotencia(tipo1: Type, tipo2: Type): Type {
        return matrizPotencia[tipo1][tipo2];
    }

    public tipoDominanteModulo(tipo1: Type, tipo2: Type): Type {
        return matrizModulo[tipo1][tipo2];
    }

}
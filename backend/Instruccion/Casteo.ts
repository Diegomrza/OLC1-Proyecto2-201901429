import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { nombreTipos } from "../Expresion/Literal";
import { Retorno, TipoDato, Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Casteo extends Instruccion {
    constructor(public tipo: TipoCasteo, private expresion: Instruccion, line: number, column: number) {
        super(line, column);

    }

    public execute(ambito: Ambito): Retorno {
        const valor = this.expresion.execute(ambito);

        switch (this.tipo) {
            case 0:
                if (valor.type == Type.CARACTER) {
                    return {
                        value: valor.value.charCodeAt(0),
                        type: Type.ENTERO,
                        tipoDato: TipoDato.ENTERO
                    }
                } else if (valor.type == Type.DOBLE) {
                    return {
                        value: parseInt(valor.value),
                        type: Type.ENTERO,
                        tipoDato: TipoDato.ENTERO
                    }
                } else {
                    throw new Error_(this.line, this.column, "Semántico", `No se puede castear un ${nombreTipos(valor.type)} a ${nombreTipos(this.tipo)}.`);
                }
            case 1:
                if (valor.type == Type.CARACTER) {
                    return {
                        value: valor.value.charCodeAt(0),
                        type: Type.DOBLE,
                        tipoDato: TipoDato.DOBLE
                    }
                } else if (valor.type == Type.ENTERO) {
                    return {
                        value: parseFloat(valor.value).toFixed(2),
                        type: Type.DOBLE,
                        tipoDato: TipoDato.DOBLE
                    }
                } else {
                    throw new Error_(this.line, this.column, "Semántico", `No se puede castear un ${nombreTipos(valor.type)} a ${nombreTipos(this.tipo)}.`);
                }
            case 2:
                if (valor.type == Type.ENTERO) {
                    return {
                        value: String.fromCharCode(valor.value),
                        type: Type.CARACTER,
                        tipoDato: TipoDato.CARACTER
                    }
                } else {
                    throw new Error_(this.line, this.column, "Semántico", `No se puede castear un ${nombreTipos(valor.type)} a ${nombreTipos(this.tipo)}.`);
                }
            case 3:
                throw new Error_(this.line, this.column, "Semántico", `No se puede castear un ${nombreTipos(valor.type)} a ${nombreTipos(this.tipo)}.`);
            case 4:
                return {
                    value: valor.value.toString(),
                    type: Type.CADENA,
                    tipoDato: TipoDato.CADENA
                }
        }

    }

    public grafo(): string {
        return "";
    }
}

export enum TipoCasteo {
    ENTERO, //Castear a entero
    DOBLE,  //Castear a double
    CARACTER,   //Castear a char
    BOOLEAN,    //Castear a boolean
    CADENA  //Castear a string
}

/*
Casteos permitidos:

int - double
int - string        //toString
int - char
double - int
double - string     //toString
char - int
char - double


*/
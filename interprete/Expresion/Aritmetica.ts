import { Expresion } from "./Expresion";
import { matrizResta, Retorno, TipoDato, Type } from "./Retorno"
import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { nombreTipos } from "./Literal";

export class Aritmetica extends Expresion {

    constructor(public left: Expresion, public right: Expresion, public tipo: TipoAritmetica, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {
        switch (this.tipo) {
            case TipoAritmetica.SUMA:
                return this.suma(ambito);
            case TipoAritmetica.RESTA:
                return this.resta(ambito);
            case TipoAritmetica.MULTIPLICACION:
                return this.multiplicacion(ambito);
            case TipoAritmetica.DIVISION:
                return this.division(ambito);
            case TipoAritmetica.POTENCIA:
                return this.potencia(ambito);
            case TipoAritmetica.MODULO:
                return this.modulo(ambito);
        }
    }

    public grafo(): string {
        return "";
    }

    private suma(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        let asciiIzq: number;
        let asciiDer: number;
        if (izquierda.type == Type.CARACTER) asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) asciiDer = derecha.value.charCodeAt(0);

        let tipoDominante = this.tipoDominante(izquierda.type, derecha.type);
        
        switch (tipoDominante) {
            case Type.ENTERO:
                if (izquierda.type == Type.CARACTER) izquierda.value = asciiIzq;
                if (derecha.type == Type.CARACTER) derecha.value = asciiDer;
                
                return {
                    value: (Number(izquierda.value) + Number(derecha.value)),
                    type: Type.ENTERO,
                    tipoDato: TipoDato.ENTERO
                }
            case Type.DOBLE:
                if (izquierda.type == Type.CARACTER) izquierda.value = asciiIzq;
                if (derecha.type == Type.CARACTER) derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) + Number(derecha.value)),
                    type: Type.DOBLE,
                    tipoDato: TipoDato.DOBLE
                }
            case Type.CADENA:
                return {
                    value: (izquierda.value + derecha.value),
                    type: Type.CADENA,
                    tipoDato: TipoDato.CADENA
                }
            default:
                throw new Error_(this.line, this.column, 'Semántico', `No se puede sumar: ${nombreTipos(izquierda.type)} con ${nombreTipos(derecha.type)}.`);
        }
    }

    private resta(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        let asciiIzq: number;
        let asciiDer: number;
        if (izquierda.type == Type.CARACTER) asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) asciiDer = derecha.value.charCodeAt(0);

        let tipoDominante = this.tipoDominanteResta(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Type.ENTERO:
                if (izquierda.type == Type.CARACTER) izquierda.value = asciiIzq;
                if (derecha.type == Type.CARACTER) derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) - Number(derecha.value)),
                    type: Type.ENTERO,
                    tipoDato: TipoDato.ENTERO
                }
            case Type.DOBLE:
                if (izquierda.type == Type.CARACTER) izquierda.value = asciiIzq;
                if (derecha.type == Type.CARACTER) derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) - Number(derecha.value)),
                    type: Type.DOBLE,
                    tipoDato: TipoDato.DOBLE
                }
            default:
                throw new Error_(this.line, this.column, 'Semántico', `No se puede restar: ${nombreTipos(izquierda.type)} con ${nombreTipos(derecha.type)}.`); //Error
        }
    }

    private multiplicacion(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        let asciiIzq: number;
        let asciiDer: number;
        if (izquierda.type == Type.CARACTER) asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) asciiDer = derecha.value.charCodeAt(0);

        let tipoDominante = this.tipoDominanteMultiplicacion(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Type.ENTERO:
                if (izquierda.type == Type.CARACTER) izquierda.value = asciiIzq;
                if (derecha.type == Type.CARACTER) derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) * Number(derecha.value)),
                    type: Type.ENTERO,
                    tipoDato: TipoDato.ENTERO
                }
            case Type.DOBLE:
                if (izquierda.type == Type.CARACTER) izquierda.value = asciiIzq;
                if (derecha.type == Type.CARACTER) derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) * Number(derecha.value)),
                    type: Type.DOBLE,
                    tipoDato: TipoDato.DOBLE
                }
            default:
                throw new Error_(this.line, this.column, 'Semántico', `No se puede multiplicar: ${nombreTipos(izquierda.type)} con ${nombreTipos(derecha.type)}.`);
        }
    }

    private division(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        let asciiIzq: number;
        let asciiDer: number;
        if (izquierda.type == Type.CARACTER) asciiIzq = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) asciiDer = derecha.value.charCodeAt(0);

        if (derecha.value == 0) throw new Error_(this.line, this.column, 'Semántico', `La división entre cero no está definida.`);

        let tipoDominante = this.tipoDominanteDivision(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Type.DOBLE:
                if (izquierda.type == Type.CARACTER) izquierda.value = asciiIzq;
                if (derecha.type == Type.CARACTER) derecha.value = asciiDer;
                return {
                    value: (Number(izquierda.value) / Number(derecha.value)),
                    type: Type.DOBLE,
                    tipoDato: TipoDato.DOBLE
                }
            default:
                throw new Error_(this.line, this.column, 'Semántico', `No se puede dividir: ${nombreTipos(izquierda.type)} con ${nombreTipos(derecha.type)}.`); //Error
        }
    }

    private potencia(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        let tipoDominante = this.tipoDominantePotencia(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Type.ENTERO:
                return {
                    value: Math.pow(Number(izquierda.value), Number(derecha.value)),
                    type: Type.ENTERO,
                    tipoDato: TipoDato.ENTERO
                }
            case Type.DOBLE:
                return {
                    value: Math.pow(Number(izquierda.value), Number(derecha.value)),
                    type: Type.DOBLE,
                    tipoDato: TipoDato.DOBLE
                }
            default:
                throw new Error_(this.line, this.column, 'Semántico', `No se puede hacer la potencia: ${nombreTipos(izquierda.type)} con ${nombreTipos(derecha.type)}.`); //Error
        }
    }

    private modulo(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        let tipoDominante = this.tipoDominanteModulo(izquierda.type, derecha.type);
        switch (tipoDominante) {
            case Type.DOBLE:
                return {
                    value: (Number(izquierda.value) % Number(derecha.value)),
                    type: Type.DOBLE,
                    tipoDato: TipoDato.DOBLE
                }
            default:
                throw new Error_(this.line, this.column, 'Semántico', `No se puede sacar el módulo: ${nombreTipos(izquierda.type)} con ${nombreTipos(derecha.type)}.`); //Error
        }
    }
}

export enum TipoAritmetica {
    SUMA = 0,
    RESTA = 1,
    MULTIPLICACION = 2,
    DIVISION = 3,
    POTENCIA = 4,
    MODULO = 5
}
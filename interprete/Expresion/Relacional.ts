import { Expresion } from "./Expresion";
import { Retorno, TipoDato, Type } from "./Retorno";
import { Error_ } from '../Error/Error';
import { Ambito } from "../Extra/Ambito";
import { nombreTipos } from "./Literal";
export class Relacional extends Expresion {
    public tipo =Type.BOOLEAN;
    constructor(private left: Expresion, private right: Expresion, private tipoR: TipoRelacional, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito): Retorno {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);

        if ((leftValue.type == Type.ENTERO && rightValue.type == Type.ENTERO)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.ENTERO && rightValue.type == Type.DOBLE)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.ENTERO && rightValue.type == Type.CARACTER)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.DOBLE && rightValue.type == Type.ENTERO)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.DOBLE && rightValue.type == Type.DOBLE)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.DOBLE && rightValue.type == Type.CARACTER)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.CARACTER && rightValue.type == Type.ENTERO)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.CARACTER && rightValue.type == Type.DOBLE)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.CARACTER && rightValue.type == Type.CARACTER)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.BOOLEAN && rightValue.type == Type.BOOLEAN)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else if ((leftValue.type == Type.CADENA && rightValue.type == Type.CADENA)) {
            let objeto = this.relaciones(ambito)
            return objeto;
        } else {
            throw new Error_(this.line, this.column, 'Semántico', `No se puede operar ${nombreTipos(leftValue.type)} con  ${nombreTipos(rightValue.type)}`);
        }
    }

    public grafo(): string {
        return "";
    }

    private relaciones(ambito: Ambito): Retorno {

        switch (this.tipoR) {
            case TipoRelacional.IGUALIGUAL:
                return this.igual_igual(ambito);
            case TipoRelacional.DIFERENTE:
                return this.diferente(ambito);
            case TipoRelacional.MAYOR:
                return this.mayor(ambito);
            case TipoRelacional.MAYOR_IGUAL:
                return this.mayor_igual(ambito);
            case TipoRelacional.MENOR:
                return this.menor(ambito);
            case TipoRelacional.MENOR_IGUAL:
                return this.menor_igual(ambito);
        }
    }

    private igual_igual(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        if (izquierda.type == Type.CARACTER) izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) derecha.value = derecha.value.charCodeAt(0);

        return {
            value: izquierda.value == derecha.value,
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

    private diferente(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        if (izquierda.type == Type.CARACTER) izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) derecha.value = derecha.value.charCodeAt(0);

        return {
            value: izquierda.value != derecha.value,
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

    private mayor(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        if (izquierda.type == Type.CARACTER) izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) derecha.value = derecha.value.charCodeAt(0);

        return {
            value: izquierda.value > derecha.value,
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

    private mayor_igual(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        if (izquierda.type == Type.CARACTER) izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) derecha.value = derecha.value.charCodeAt(0);

        return {
            value: izquierda.value >= derecha.value,
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

    private menor(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        if (izquierda.type == Type.CARACTER) izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) derecha.value = derecha.value.charCodeAt(0);

        return {
            value: izquierda.value < derecha.value,
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }

    private menor_igual(ambito: Ambito): Retorno {
        let izquierda = this.left.execute(ambito);
        let derecha = this.right.execute(ambito);

        if (izquierda.type == Type.CARACTER) izquierda.value = izquierda.value.charCodeAt(0);
        if (derecha.type == Type.CARACTER) derecha.value = derecha.value.charCodeAt(0);

        return {
            value: izquierda.value <= derecha.value,
            type: Type.BOOLEAN,
            tipoDato: TipoDato.BOOLEAN
        }
    }
}

export enum TipoRelacional {
    IGUALIGUAL = 0,
    DIFERENTE = 2,
    MAYOR = 3,
    MAYOR_IGUAL = 4,
    MENOR = 5,
    MENOR_IGUAL = 6
}

/*


Válidos:

entero - double -caracter:

    entero - entero
    entero - double
    entero - caracter
	
    double - entero
    double - double
    double - caracter
	
    caracter - entero
    caracter - double
    caracter - caracter

    boolean - boolean
    cadena - cadena

No válidos:
    cadena - caracter


 */
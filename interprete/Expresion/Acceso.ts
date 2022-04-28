import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";

export class Acceso extends Expresion {

    constructor(
        public id: string,          //identificador de la variable
        public tipoAcceso: number,  //Variable = 0, vector = 1, matriz = 2
        public valor1: Expresion,   //Para vector se usa valor1
        public valor2: Expresion,   //Para matriz se usa valor1 y valor2
        public line: number,        //Linea
        public column: number       //Columna
    ) {
        super(line, column)
    }

    public execute(ambito: Ambito): Retorno {

        const value = ambito.getVal(this.id);

        if (value != null) {
            if (this.tipoAcceso == 0) { //Variables
                //if (value.valor instanceof Array) throw new Error_(this.line, this.column, "Semántico", `No se puede obtener este tipo de dato`)
                return {
                    value: value.valor,
                    type: value.type,
                    tipoDato: value.TipoDato
                };
            } else if (this.tipoAcceso == 1) { //Vector
                let v1 = this.valor1.execute(ambito);
                if (v1.type != Type.ENTERO) throw new Error_(this.line, this.column, "Semántico", `El valor de acceso debe ser de tipo int.`);
                if (v1.value >= value.valor.length) throw new Error_(this.line, this.column, "Semántico",`La posición no existe.`);
                let vector: [] = value.valor;
                return {
                    value: vector[v1.value],
                    type: value.type,
                    tipoDato: value.type
                }
            } else if (this.tipoAcceso == 2) { //Matriz
                let v1 = this.valor1.execute(ambito);
                let v2 = this.valor2.execute(ambito);
                if (v1.type != Type.ENTERO || v2.type != Type.ENTERO) throw new Error_(this.line, this.column, "Semántico", `Ambos valores de acceso deben ser de tipo int.`)
                if (v1.value >= value.valor.length || v2.value >= value.valor[0].length) throw new Error_(this.line, this.column, "Semántico", `La posición no existe.`)
                let vector: [] = value.valor
                return {
                    value: vector[v1.value][v2.value],
                    type: value.type,
                    tipoDato: value.type
                }
            }
        } else {
            throw new Error_(this.line, this.column, 'Semántico', `No se encuentra la variable ${this.id}`);
        }

    }

    public grafo(): string {
        return "";
    }

}
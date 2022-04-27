import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

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
                return {
                    value: value.valor,
                    type: value.type,
                    tipoDato: value.TipoDato
                };
            } else if (this.tipoAcceso == 1) { //Vector
                let v1 = this.valor1.execute(ambito);
                let vector: [] = value.valor;
                return {
                    value: vector[v1.value],
                    type: value.type,
                    tipoDato: value.TipoDato
                }
            } else if (this.tipoAcceso == 2) { //Matriz
                let v1 = this.valor1.execute(ambito);
                let v2 = this.valor2.execute(ambito);
                let vector: [] = value.valor
                return {
                    value: vector[v1.value][v2.value],
                    type: value.type,
                    tipoDato: value.TipoDato
                }
            }
        } else {
            throw new Error_(this.line, this.column, 'Semántico', `No se encuentra la variable ${this.id}`);
        }

    }

}
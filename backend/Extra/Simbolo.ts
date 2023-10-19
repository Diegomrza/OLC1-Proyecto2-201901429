import { Retorno, Type } from '../Expresion/Retorno';

export class Simbolo {

    constructor(
        public valor: any,          //valor
        public id: string,          //identificador
        public type: any,           //tipo
        public TipoDato: any        //tipo estructura
        ) {

    }

}
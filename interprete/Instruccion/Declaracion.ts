import { Expresion } from "../Expresion/Expresion";
import { Instruccion } from "./Instruccion";
import { Ambito } from '../Extra/Ambito';
import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { nombreTipos } from "../Expresion/Literal";

export class Declaracion extends Instruccion {

    constructor(private id: [], private value: Expresion, line: number, column: number, private tipoAsignacion: number, private pos1: Expresion, private pos2: Expresion, private tipoDato) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        if (this.pos1 != null && this.pos2 == null) {   //Vectores

            //Valor nuevo
            let val = this.value.execute(ambito);

            for (const ids of this.id) {
                //Obteniendo el vector
                let aux = ambito.getVal(ids);

                //Posicion 1
                let p1 = this.pos1.execute(ambito);

                //Si el valor de acceso no es entero
                if (p1.type != Type.ENTERO) throw new Error_(this.line, this.column, "Semántico", `El valor ${p1.value} debe ser tipo int.`);

                //Si el valor de acceso es negativo
                if (p1.value <= -1) throw new Error_(this.line, this.column, "Semántico", `No se puede acceder a una posición negativa.`);

                //Si el valor excede el tamaño establecido del vector
                if (p1.value >= aux.valor.length) throw new Error_(this.line, this.column, "Semántico", `La posición ${p1.value} no existe en el arreglo.`);

                if (val.type != aux.TipoDato) throw new Error_(this.line, this.column, "Semántico", `No se puede asignar un ${nombreTipos(val.type)} a un vector de ${nombreTipos(aux.TipoDato)}`);

                //Cambiando el valor en el vector
                aux.valor[p1.value] = val.value;
            }
        } else if (this.pos1 != null && this.pos2 != null) {    //Matrices

            //Valor nuevo
            let val = this.value.execute(ambito);

            for (const ids of this.id) {
                //Obteniendo la matriz
                let aux = ambito.getVal(ids);

                //Posicion 1
                let p1 = this.pos1.execute(ambito);

                //Posicion 2
                let p2 = this.pos2.execute(ambito);

                //Si los valores de acceso no son enteros
                if (p1.type != Type.ENTERO || p2.type != Type.ENTERO) throw new Error_(this.line, this.column, "Semántico", `Los valores ${p1.value, p2.value} debe ser tipo int.`);

                //Si los valores de acceso son negativos
                if (p1.value <= -1 || p2.value <= -1) throw new Error_(this.line, this.column, "Semántico", `No se puede acceder a una posición negativa`);

                //Si algún valor excede el tamaño establecido de la matriz
                if (p1.value >= aux.valor.length || p2.value >= aux.valor[0].length) throw new Error_(this.line, this.column, "Semántico", `La posición ${p1.value + " " + p2.value} no existe.`);

                if (val.type != aux.TipoDato) throw new Error_(this.line, this.column, "Semántico", `No se puede asignar un ${nombreTipos(val.type)} a una matriz de ${nombreTipos(aux.TipoDato)}`);
                //Cambiando el valor en la matriz
                aux.valor[p1.value][p2.value] = val.value;
            }
        } else {    //Variables
            let val = this.value.execute(ambito);
            
            for (const ids of this.id) {
                ambito.setVal(ids, val.value, val.type, this.line, this.column, this.tipoAsignacion, this.tipoDato);
            }
        }
    }

}
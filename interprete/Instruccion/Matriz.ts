import { Error_ } from "../Error/Error";
import { nombreTipos } from "../Expresion/Literal";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Matriz extends Instruccion {
    constructor(private tipo: number, private id: string, private arreglo: [], public tam1: Expresion, public tam2: Expresion, private tipoEs:number, line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {

        let tamFilas = this.tam1.execute(ambito);
        let tamColumnas = this.tam2.execute(ambito);

        if (this.arreglo.length == 0) {
            let filas = [];
            for (let i = 0; i < tamFilas.value; i++) {
                let columnas = [];
                for (let j = 0; j < tamColumnas.value; j++) {
                    columnas.push(this.defecto(this.tipo));
                }
                filas.push(columnas);
            }
            ambito.setVal(this.id, filas, this.tipoEs, this.line, this.column, 0, this.tipo);
        } else {
            let auxFilas = [];
            for (let i = 0; i < tamFilas.value; i++) {

                let auxColumnas = [];
                let fila = this.arreglo[i];

                for (let j = 0; j < tamColumnas.value; j++) {
                    let columna: Expresion = fila[j];
                    let valor;
                    if (columna != undefined) {
                        valor = columna.execute(ambito);
                    } else {
                        valor = undefined;
                    }
                    
                    if (valor != undefined) {
                        if (valor.type == this.tipo) {
                            auxColumnas.push(valor.value);
                        } else {
                            throw new Error_(this.line, this.column, "Semántico", `El valor ${valor.value} no coincide con el tipo ${nombreTipos(this.tipo)}`);
                        }
                    } else {
                        auxColumnas.push(this.defecto(this.tipo));
                    }
                }
                auxFilas.push(auxColumnas);
            }
            ambito.setVal(this.id, auxFilas, this.tipoEs, this.line, this.column, 0, this.tipo);
        }

    }

    private defecto(tipo: number) {
        switch (tipo) {
            case 0:
                return 0;
            case 1:
                return Number(0).toFixed(1);
            case 2:
                return true;
            case 3:
                return "\u0000"
            case 4:
                return "";
        }
    }

}
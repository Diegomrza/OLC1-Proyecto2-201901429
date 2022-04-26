import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { nombreTipos } from "../Expresion/Literal";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Vector extends Instruccion {
    constructor(private tipo: number, private id:string, private arreglo: Expresion[], private tam: Expresion, private tipoEs:number, line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {

        
        let tamanio = this.tam.execute(ambito);
        if (tamanio.type != Type.ENTERO) {
            throw new Error_(this.line, this.column, 'Semántico', 'El atributo tamaño no es de tipo int');
        }
        if (this.arreglo.length == 0) {
            let lista = [];
            for (let i = 0; i < tamanio.value; i++) {
                lista.push(this.defecto(this.tipo));
            }
            ambito.setVal(this.id, lista, this.tipoEs, this.line, this.column, 0, this.tipo);
        } else {
            let aux = [];
            for (let i of this.arreglo) {
                let valor = i.execute(ambito);
                if (valor.type == this.tipo) {
                    aux.push(valor.value);
                } else {
                    throw new Error_(this.line, this.column, "Semántico", `El valor ${valor.value} no coincide con el tipo ${nombreTipos(this.tipo)}`);
                }
            }
            ambito.setVal(this.id, aux, this.tipoEs, this.line, this.column, 0, this.tipo);
        }
    }

    private defecto(tipo:number) {
        switch (tipo) {
            case 0:
                return 0;
            case 1:
                return 0.0;
            case 2:
                return true;
            case 3:
                return "\u0000"
            case 4:
                return "";
        }

    }


}


/**
 * Declaración vectores:
 * 
 * TIPO ID [] = new TIPO [n];
 * TIPO ID [][] = new TIPO [n][m];
 * 
 * TIPO ID [] = [x1, x2, ...];
 * TIPO ID [][] = [[x1, x2, ...], [x1, x2, ...], [x1, x2, ...], ...];

 */
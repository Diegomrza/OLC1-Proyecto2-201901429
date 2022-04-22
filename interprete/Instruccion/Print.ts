import { Instruccion } from '../Instruccion/Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Extra/Ambito';

export class Print extends Instruccion {

    //public lista = [];

    constructor(private value: Expresion[], private saltoDeLinea:number, line: number, column: number) {
        
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        let aux = [];

        for (const actual of this.value) {
            const val = actual.execute(ambito);
            aux.push(val.value);
            console.log(val.value);
        }
        if (this.saltoDeLinea == 1) {   //No hay salto de linea
            aux.push("\n");
        }
    }
}
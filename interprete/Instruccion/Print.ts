import { Instruccion } from '../Instruccion/Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Extra/Ambito';

export class Print extends Instruccion {

    constructor(private value: Expresion[], line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        let aux = [];
        for (const actual of this.value) {
            const val = actual.execute(ambito);
            aux.push(val.value);
        }
        return aux;
    }
}
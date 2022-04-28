import { Instruccion } from '../Instruccion/Instruccion';
import { Expresion } from '../Expresion/Expresion';
import { Ambito } from '../Extra/Ambito';
import { Singleton } from '../Singleton';

export class Print extends Instruccion {

    //public lista = [];

    constructor(private value: Expresion[], private saltoDeLinea:number, line: number, column: number) {
        
        super(line, column);
    }

    public execute(ambito: Ambito): any {
        let aux = [];

        for (const actual of this.value) {
            const val = actual.execute(ambito);
            val.value = val.value.toString();
            val.value = val.value.replace("\\n", "\n")
            new Singleton().push(val.value);
        }
        if (this.saltoDeLinea == 1) {
            new Singleton().push("\n");
        }
    }

    public grafo(): string {
        return "";
    }
}
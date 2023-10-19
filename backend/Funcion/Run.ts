import { Retorno } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";
import { LlamadaFuncion } from "./LlamadaFuncion";

export class Run extends Instruccion {
    constructor(private llamada: LlamadaFuncion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito): Retorno {

        let valor = this.llamada.execute(ambito);
        
        if (valor != undefined && valor != null) {
            return {
                value: valor.value,
                type: valor.type,
                tipoDato: valor.tipoDato
            }
        } else {
            return undefined;
        }
        
    }

    public grafo(): string {
        return "";
    }
}
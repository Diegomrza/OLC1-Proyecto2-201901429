import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Case } from "./Case";
import { Instruccion } from "./Instruccion";

export class Switch extends Instruccion {
    constructor(private opcion: Expresion, private listaCase: Case[], private defecto: Instruccion, line: number, column: number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {

        const op = this.opcion.execute(ambito);
        let bandera = false;

        for (const caso of this.listaCase) {
            let valor = caso.opcion.execute(ambito);
            if ((valor.value == op.value) && (valor.type == op.type)) {
                let retorno = caso.cuerpo.execute(ambito);
                if (retorno != null && retorno != undefined) {
                    if (retorno.type == 'Break') {
                        bandera = true;
                        break;
                    } else if (retorno.type == 'Continue') {
                        continue;
                    }
                }
            }
        }
        if (this.defecto != null && bandera == false) this.defecto.execute(ambito);

    }

}
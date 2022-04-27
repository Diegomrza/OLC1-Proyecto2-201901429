import { Error_ } from "../Error/Error";
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
        let banderaBreak = false;   //Comprueba si se encuentra un break en los cases
        let banderaValor = false;   //Comprueba si se encuentra el valor a evaluar dentro de los cases

        if (this.defecto == null && this.listaCase == null) throw new Error_(this.line, this.column, "Semántico", `La sentencia no tiene ningún caso a evaluar`)

        let i = 0;                  //Variable que sirve para llevar el iterador del case actual
        if (this.listaCase != null) {

            for (const caso of this.listaCase) {
                let valor = caso.opcion.execute(ambito);
                if ((valor.value == op.value) && (valor.type == op.type)) {
                    banderaValor = true;    //Valor encontrado
                    let retorno = caso.cuerpo.execute(ambito);
                    if (retorno != null && retorno != undefined) {
                        if (retorno.type == 'Break') {
                            banderaBreak = true;    //Break encontrado
                            break;
                        } else if (retorno.type == 'Return') {
                            return;
                        }
                    }
                }

                if (banderaValor == true) { i++; break; } //Si se encontró el valor nos salimos del for
                i++;
            }

            //Si se encontró el valor pero no se encontró ningún break en ese case se ejecutan los siguientes casos hasta encontrar un break
            if (banderaValor == true && banderaBreak == false) {
                for (i; i < this.listaCase.length; i++) {
                    let retorno = this.listaCase[i].cuerpo.execute(ambito);
                    if (retorno != null && retorno != undefined) {
                        if (retorno.type == 'Break') {
                            banderaBreak = true;
                            break;
                        } else if (retorno.type == 'Return') {
                            return;
                        }
                    }
                }
            }
        }
        if (this.defecto != null && banderaBreak == false) this.defecto.execute(ambito);
    }


}
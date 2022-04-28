import { Instruccion, TipoFuncion } from '../Instruccion/Instruccion';
import { Ambito } from '../Extra/Ambito';
import { Expresion } from '../Expresion/Expresion';
import { Error_ } from '../Error/Error';

export class LlamadaFuncion extends Instruccion {

    constructor(
        private id: string,
        private expresiones: Array<Expresion>,
        public run: boolean,
        line: number,
        column: number
    ) {
        super(line, column);
    }
    public execute(ambito: Ambito) {
        const funcion = ambito.getFuncion(this.id);
        if (funcion == undefined) {
            console.log(undefined);
            throw new Error_(this.line, this.column, 'Semántico', `Funcion ${this.id} no encontrada.`);
        } 

        if (this.expresiones.length != funcion.parametros.length) throw new Error_(this.line, this.column, 'Semántico', "Cantidad de parametros incorrecta")

        if (this.run) {
            const newEnv = new Ambito(ambito.getGlobal());  //Obteniendo el ambito global

            for (const i in this.expresiones) {
                const value = this.expresiones[i].execute(ambito);
                
                if (value.tipoDato != funcion.parametros[i][1]) throw new Error_(this.line, this.column, 'Semántico', "Tipos incorrectos");

                newEnv.setVal(funcion.parametros[i][0], value.value, value.type, this.line, this.column, 0, value.tipoDato);
            }

            let valor = funcion.cuerpo.execute(newEnv);

            if (funcion.tipo == TipoFuncion.VOID) {
                return {
                    value: null,
                    line: this.line,
                    column: this.column,
                    type: null,
                    tipoDato: null
                }
            }

            let objeto = {
                value: valor.value,
                line: valor.line,
                column: valor.column,
                type: valor.tipoDato,
                tipoDato: valor.tipoDato
            }
            
            if (funcion.tipo == valor.tipoDato) {
                return objeto;
            };
            throw new Error_(this.line, this.column, "Semántico", `El tipo no coincide.`);
        }
    }

    public grafo(): string {
        return "";
    }
}
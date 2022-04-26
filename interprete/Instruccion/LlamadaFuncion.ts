import { Instruccion } from '../Instruccion/Instruccion';
import { Ambito } from '../Extra/Ambito';
import { Expresion } from '../Expresion/Expresion';
import { Error_ } from '../Error/Error';

export class LlamadaFuncion extends Instruccion {

    constructor(private id: string, private expresiones: Array<Expresion>, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito: Ambito) {
        const funcion = ambito.getFuncion(this.id);

        if (funcion == undefined) throw new Error_(this.line, this.column, 'Semántico', `Funcion ${this.id} no encontrada.`);

        if (this.expresiones.length != funcion.parametros.length) throw new Error_(this.line, this.column, 'Semántico', "Cantidad de parametros incorrecta")

        const newEnv = new Ambito(ambito.getGlobal());  //Obteniendo el ambito global

        for (let i = 0; i < this.expresiones.length; i++) {

            const value = this.expresiones[i].execute(ambito);
            //id, valor, tipo, linea, columna, tipoAsignacion, tipoDato
            newEnv.setVal(funcion.parametros[i], value.value, value.type, this.line, this.column, 0, value.type);

        }

        return funcion.cuerpo.execute(newEnv);

    }
}
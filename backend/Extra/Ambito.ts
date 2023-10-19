import { Error_ } from "../Error/Error";
import { nombreTipos } from "../Expresion/Literal";
import { TipoDato, Type } from "../Expresion/Retorno";
import { Funcion } from "../Funcion/Funcion";
import { nombreFuncion, TipoFuncion } from "../Instruccion/Instruccion";
import { Singleton } from "../Patrones/Singleton";
import { Simbolo } from "./Simbolo"

export class Ambito {
    private variables: Map<string, Simbolo> //Guarda las variables, vectores y matrices
    public funciones: Map<string, Funcion>; //Guarda las funciones

    constructor(public anterior: Ambito | null, public nombre: string) {
        this.variables = new Map();
        this.funciones = new Map();
    }

    //____________________________________Crear variables____________________________________//
    public crearVar(id: string, value: any, type: Type, line: number, column: number, tipoDato) {
        if (!this.variables.has(id)) {
            this.variables.set(id, new Simbolo(value, id, type, tipoDato));
        } else {
            throw new Error_(line, column, 'Semántico', 'Ya existe una variable con ese nombre: ' + id);
        }
    }

    //id, valor, tipo, linea, columna, tipoAsignacion, tipoDato
    public setVal(id: string, value: any, type: Type, line: number, column: number, tipoAsignacion: number, tipoDato: TipoDato) {
        if (tipoAsignacion == TipoAsignacion.DECLARACION) {
            this.crearVar(id, value, type, line, column, tipoDato);
        } else if (tipoAsignacion == TipoAsignacion.ASIGNACION) {
            let env: Ambito | null = this;
            while (env != null) {
                if (env.variables.has(id)) {
                    const val = env.variables.get(id);
                    if (val.type == type) {
                        env.variables.set(id, new Simbolo(value, id, type, tipoDato));
                    } else {
                        throw new Error_(line, column, 'Semántico', 'No se puede asignar: ' + value + ' a ' + id);
                    }
                }
                env = env.anterior;
            }
            //throw new Error_(line, column, 'Semántico', `La variable ${id} no existe.`);
        }
    }

    public getVal(id: string): Simbolo {
        let env: Ambito | null = this;

        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }

    //____________________________________Funciones____________________________________//
    public guardarFuncion(id: string, funcion: Funcion, line: number, column: number) {
        //Ver si la funcion ya existe, reportar error

        if (!this.funciones.has(id)) {
            let metodo = "Metodo";
            if (funcion.tipo != TipoFuncion.VOID) {
                metodo = 'Funcion';
            }
            new Singleton().insertarSimbolo(id, nombreFuncion(funcion.tipo), metodo, '-', funcion, line.toString(), column.toString());
            this.funciones.set(id, funcion);
        } else {
            throw new Error_(line, column, "Semántico", `Ya existe una función con ese nombre: ${id}.`);
        }

    }

    public getFuncion(id: string): Funcion | undefined {
        let env: Ambito | null = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }


    public getGlobal(): Ambito {
        let env: Ambito | null = this;
        while (env?.anterior != null) {
            env = env.anterior;
        }
        return env;
    }

}

export enum TipoAsignacion {
    DECLARACION,
    ASIGNACION
}
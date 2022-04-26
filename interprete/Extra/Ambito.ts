import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Funcion } from "../Instruccion/Funcion";
import { TipoFuncion } from "../Instruccion/Instruccion";
import { Matriz } from "../Instruccion/Matriz";
import { Vector } from "../Instruccion/Vector";
import { Simbolo } from "./Simbolo"

export class Ambito {
    private variables: Map<string, Simbolo> //Guarda las variables
    public funciones: Map<string, Funcion>; //Guarda las funciones

    constructor(public anterior: Ambito | null) {
        this.variables = new Map();
        this.funciones = new Map();
    }

    //____________________________________Variables____________________________________//
    public crearVar(id: string, value: any, type: Type, line: number, column: number, tipoDato) {
        if (!this.variables.has(id)) {
            this.variables.set(id, new Simbolo(value, id, type, tipoDato));
        } else {
            throw new Error_(line, column, 'Semántico', 'Ya existe una variable con ese nombre: ' + id);
        }
    }

    public setVal(id: string, value: any, type: Type, line: number, column: number, tipoAsignacion: number, tipoDato) { //Busca una variable y si no existe la crea

        if (tipoAsignacion == 0) {//Para crear la variable
            this.crearVar(id, value, type, line, column, tipoDato);
        } else {
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
        }

        //this.variables.set(id, new Simbolo(value, id, type));

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
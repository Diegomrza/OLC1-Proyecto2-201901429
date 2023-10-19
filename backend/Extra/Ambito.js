"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAsignacion = exports.Ambito = void 0;
const Error_1 = require("../Error/Error");
const Instruccion_1 = require("../Instruccion/Instruccion");
const Singleton_1 = require("../Patrones/Singleton");
const Simbolo_1 = require("./Simbolo");
class Ambito {
    constructor(anterior, nombre) {
        this.anterior = anterior;
        this.nombre = nombre;
        this.variables = new Map();
        this.funciones = new Map();
    }
    //____________________________________Crear variables____________________________________//
    crearVar(id, value, type, line, column, tipoDato) {
        if (!this.variables.has(id)) {
            this.variables.set(id, new Simbolo_1.Simbolo(value, id, type, tipoDato));
        }
        else {
            throw new Error_1.Error_(line, column, 'Semántico', 'Ya existe una variable con ese nombre: ' + id);
        }
    }
    //id, valor, tipo, linea, columna, tipoAsignacion, tipoDato
    setVal(id, value, type, line, column, tipoAsignacion, tipoDato) {
        if (tipoAsignacion == TipoAsignacion.DECLARACION) {
            this.crearVar(id, value, type, line, column, tipoDato);
        }
        else if (tipoAsignacion == TipoAsignacion.ASIGNACION) {
            let env = this;
            while (env != null) {
                if (env.variables.has(id)) {
                    const val = env.variables.get(id);
                    if (val.type == type) {
                        env.variables.set(id, new Simbolo_1.Simbolo(value, id, type, tipoDato));
                    }
                    else {
                        throw new Error_1.Error_(line, column, 'Semántico', 'No se puede asignar: ' + value + ' a ' + id);
                    }
                }
                env = env.anterior;
            }
            //throw new Error_(line, column, 'Semántico', `La variable ${id} no existe.`);
        }
    }
    getVal(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    }
    //____________________________________Funciones____________________________________//
    guardarFuncion(id, funcion, line, column) {
        //Ver si la funcion ya existe, reportar error
        if (!this.funciones.has(id)) {
            let metodo = "Metodo";
            if (funcion.tipo != Instruccion_1.TipoFuncion.VOID) {
                metodo = 'Funcion';
            }
            new Singleton_1.Singleton().insertarSimbolo(id, (0, Instruccion_1.nombreFuncion)(funcion.tipo), metodo, '-', funcion, line.toString(), column.toString());
            this.funciones.set(id, funcion);
        }
        else {
            throw new Error_1.Error_(line, column, "Semántico", `Ya existe una función con ese nombre: ${id}.`);
        }
    }
    getFuncion(id) {
        let env = this;
        while (env != null) {
            if (env.funciones.has(id)) {
                return env.funciones.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    getGlobal() {
        let env = this;
        while ((env === null || env === void 0 ? void 0 : env.anterior) != null) {
            env = env.anterior;
        }
        return env;
    }
}
exports.Ambito = Ambito;
var TipoAsignacion;
(function (TipoAsignacion) {
    TipoAsignacion[TipoAsignacion["DECLARACION"] = 0] = "DECLARACION";
    TipoAsignacion[TipoAsignacion["ASIGNACION"] = 1] = "ASIGNACION";
})(TipoAsignacion || (exports.TipoAsignacion = TipoAsignacion = {}));

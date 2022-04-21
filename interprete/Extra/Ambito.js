"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambito = void 0;
const Error_1 = require("../Error/Error");
const Simbolo_1 = require("./Simbolo");
class Ambito {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
    }
    crearVar(id, value, type, line, column) {
        if (!this.variables.has(id)) {
            this.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
        }
        else {
            throw new Error_1.Error_(line, column, 'Semantico', 'Ya existe una variable con ese nombre: ' + id);
        }
    }
    setVal(id, value, type, line, column, tipoAsignacion) {
        if (tipoAsignacion == 0) { //Para crear la variable
            this.crearVar(id, value, type, line, column);
        }
        else {
            let env = this;
            while (env != null) {
                if (env.variables.has(id)) {
                    const val = env.variables.get(id);
                    if (val.type == type) {
                        env.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
                    }
                    else {
                        throw new Error_1.Error_(line, column, 'Semantico', 'No se puede asignar: ' + value + ' a ' + id);
                    }
                }
                env = env.anterior;
            }
        }
        //this.variables.set(id, new Simbolo(value, id, type));
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
    guardarFuncion(id, funcion) {
        //TODO ver si la funcion ya existe, reportar error
        this.funciones.set(id, funcion);
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

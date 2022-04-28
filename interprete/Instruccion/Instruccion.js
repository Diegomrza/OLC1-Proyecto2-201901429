"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoFuncion = exports.Instruccion = void 0;
class Instruccion {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
}
exports.Instruccion = Instruccion;
var TipoFuncion;
(function (TipoFuncion) {
    TipoFuncion[TipoFuncion["INT"] = 0] = "INT";
    TipoFuncion[TipoFuncion["DOUBLE"] = 1] = "DOUBLE";
    TipoFuncion[TipoFuncion["BOOLEAN"] = 2] = "BOOLEAN";
    TipoFuncion[TipoFuncion["CHAR"] = 3] = "CHAR";
    TipoFuncion[TipoFuncion["STRING"] = 4] = "STRING";
    TipoFuncion[TipoFuncion["VOID"] = 5] = "VOID";
})(TipoFuncion = exports.TipoFuncion || (exports.TipoFuncion = {}));

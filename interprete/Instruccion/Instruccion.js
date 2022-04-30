"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nombreFuncion = exports.TipoFuncion = exports.Instruccion = void 0;
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
function nombreFuncion(num) {
    switch (num) {
        case 0:
            return "int";
        case 1:
            return "double";
        case 2:
            return "boolean";
        case 3:
            return "char";
        case 4:
            return "string";
        case 5:
            return "void";
    }
}
exports.nombreFuncion = nombreFuncion;

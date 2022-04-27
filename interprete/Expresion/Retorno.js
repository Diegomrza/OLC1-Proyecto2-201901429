"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos = exports.TipoDato = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["ENTERO"] = 0] = "ENTERO";
    Type[Type["DOBLE"] = 1] = "DOBLE";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["CARACTER"] = 3] = "CARACTER";
    Type[Type["CADENA"] = 4] = "CADENA";
})(Type = exports.Type || (exports.Type = {}));
var TipoDato;
(function (TipoDato) {
    TipoDato[TipoDato["ENTERO"] = 0] = "ENTERO";
    TipoDato[TipoDato["DOBLE"] = 1] = "DOBLE";
    TipoDato[TipoDato["BOOLEAN"] = 2] = "BOOLEAN";
    TipoDato[TipoDato["CARACTER"] = 3] = "CARACTER";
    TipoDato[TipoDato["CADENA"] = 4] = "CADENA";
    TipoDato[TipoDato["VECTOR"] = 5] = "VECTOR";
})(TipoDato = exports.TipoDato || (exports.TipoDato = {}));
//Matriz tipo dominante
exports.tipos = [
    [
        Type.ENTERO, Type.DOBLE, Type.ENTERO, Type.ENTERO, Type.CADENA
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.CADENA
    ],
    [
        Type.ENTERO, Type.DOBLE, null, null, Type.CADENA
    ],
    [
        Type.ENTERO, Type.DOBLE, null, Type.CADENA, Type.CADENA
    ],
    [
        Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA
    ]
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["ENTERO"] = 0] = "ENTERO";
    Type[Type["DOBLE"] = 1] = "DOBLE";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["CARACTER"] = 3] = "CARACTER";
    Type[Type["CADENA"] = 4] = "CADENA";
    Type[Type["VECTOR"] = 5] = "VECTOR";
})(Type = exports.Type || (exports.Type = {}));
//Matriz tipo dominante suma
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

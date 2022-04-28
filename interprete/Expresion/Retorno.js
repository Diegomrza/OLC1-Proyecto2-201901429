"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matrizNegacionUnaria = exports.matrizModulo = exports.matrizPotencia = exports.matrizDivision = exports.matrizMultiplicacion = exports.matrizResta = exports.tipos = exports.TipoDato = exports.Type = void 0;
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
exports.matrizResta = [
    [
        Type.ENTERO, Type.DOBLE, Type.ENTERO, Type.ENTERO, null
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.DOBLE, null
    ],
    [
        Type.ENTERO, Type.DOBLE, null, null, null
    ],
    [
        Type.ENTERO, Type.DOBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.matrizMultiplicacion = [
    [
        Type.ENTERO, Type.DOBLE, null, Type.ENTERO, null
    ],
    [
        Type.DOBLE, Type.DOBLE, null, Type.DOBLE, null
    ],
    [
        null, null, null, null, null
    ],
    [
        Type.ENTERO, Type.DOBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.matrizDivision = [
    [
        Type.DOBLE, Type.DOBLE, null, Type.DOBLE, null
    ],
    [
        Type.DOBLE, Type.DOBLE, null, Type.DOBLE, null
    ],
    [
        null, null, null, null, null
    ],
    [
        Type.DOBLE, Type.DOBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.matrizPotencia = [
    [
        Type.ENTERO, Type.DOBLE, null, null, null
    ],
    [
        Type.DOBLE, Type.DOBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.matrizModulo = [
    [
        Type.DOBLE, Type.DOBLE, null, null, null
    ],
    [
        Type.DOBLE, Type.DOBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.matrizNegacionUnaria = [
    Type.ENTERO,
    Type.DOBLE,
    null,
    null,
    null
];

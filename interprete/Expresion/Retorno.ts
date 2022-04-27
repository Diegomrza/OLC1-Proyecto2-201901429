export enum Type {
    ENTERO = 0,//ENTERO
    DOBLE = 1,//DOUBLE
    BOOLEAN = 2,//BOOLEAN
    CARACTER = 3,//CARACTER
    CADENA = 4,//CADENA
}

export enum TipoDato {
    ENTERO = 0,
    DOBLE = 1,
    BOOLEAN = 2,
    CARACTER = 3,
    CADENA = 4,
    VECTOR = 5
}

export type Retorno = {
    value: any, //Valor
    type: Type, //Tipo del valor
    tipoDato: TipoDato //Tipo de estructura
}

//Matriz tipo dominante
export const tipos = [
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
]


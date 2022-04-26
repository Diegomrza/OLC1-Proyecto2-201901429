export enum Type{
    ENTERO = 0,//ENTERO
    DOBLE = 1,//DOUBLE
    BOOLEAN = 2,//BOOLEAN
    CARACTER = 3,//CARACTER
    CADENA = 4,//CADENA
    VECTOR = 5
}

export type Retorno = {
    value: any,
    type: Type
}

//Matriz tipo dominante suma
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
        Type.ENTERO, Type.DOBLE, null, Type.CADENA , Type.CADENA
    ],
    [
        Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA,Type.CADENA
    ]
]


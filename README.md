# OLC1 - Proyecto 2 - 201901429
###### Proyecto número 2 del curso de organización de lenguajes y compiladores 1, 2022 (Corregido -> 19-10-2023)

## Documentacion
- [Requisitos](#requisitos)
- [Dependencias](#dependencias-necesarias)
- [Desplegar Backend](#desplegar-backend)
- [Desplegar Frontend](#desplegar-frontend)
- [Funciones nativas](#funciones-nativas)
- [Sentencias de control](#sentencias-de-control)
- [Ejemplos](#ejemplos)

## Requisitos
- Asegurarse de tener instalado nodejs y npm
```bash
node --version 
npm --version
```

## Dependencias necesarias:
- Jison (backend)
```bash
cd .\backend\
npm install jison -g
```

- TypeScript (backend)
```bash
cd .\backend\
npm install -g typescript
```

- Monaco Editor (frontend)
```bash
cd .\frontend\
npm i @monaco-editor/react
```

## Desplegar Backend
Para ejecutar el analizador creado con typescript ejecutar estos comandos en una consola:
```bash
cd .\backend\
npm install
npm start
```
Esto inicializará un servidor con la librería express en el puerto: http://localhost:4000/

## Desplegar Frontend
Para ejecutar el editor de texto creado con react y la librería Monaco Editor, ejecutar estos comandos en una consola:
```bash
cd .\frontend\
npm install
npm run dev
```
Esto inicializará un servidor creado con Vite + React en el puerto: http://localhost:5173/

## Uso

1. Funciones nativas:
- `Length`
    - [ejemplo](#length)

- `Round`
    - [ejemplo](#round)

- `ToCharArray`
    - [ejemplo](#tochararray)

- `ToString`
    - [ejemplo](#tostring)

- `ToLower`
    - [ejemplo](#tolower)

- `ToUpper`
    - [ejemplo](#toupper)

- `TypeOf`
    - [ejemplo](#typeof)

- `Incremento`
    - [ejemplo](#incremento)

- `Decremento`
    - [ejemplo](#decremento)

2. Sentencias de control
- `if`
    - [ejemplo](#if)

- `else`
    - [ejemplo](#else)

- `for`
    - [ejemplo](#for)

- `while`
    - [ejemplo](#while)

- `do while`
    - [ejemplo](#do-while)

- `switch`
    - [ejemplo](#switch)

- `case`
    - [ejemplo](#case)

- `default`
    - [ejemplo](#default)

- `break`
    - [ejemplo](#break)

- `continue`
    - [ejemplo](#continue)

- `return`
    - [ejemplo](#return)

# Ejemplos:

#### Funciones Nativas:

###### Length
```java
int tamanio = Length("Cadena");
print(tamanio); // 6
```

###### Round
```java
int numero = Round(10.5); 
print(numero); // 10
```

###### ToCharArray
```java
char[] arreglo = ToCharArray("Esta Es Una Cadena");
for (int i=0; i< length(arreglo); i++) {
    print(arreglo[i] + ", "); //E, s, t, a,  , E, s, U, n, a, C, a, d, e, n, a, 
}
```

###### ToString
```java
String cadena = ToString(10);
print(cadena); // "10"
```

###### ToLower
```java
String cadena = ToLower("ESTA ES UNA CADENA");
print(cadena); // esta es una cadena
```

###### ToUpper

```java
String cadena = ToUpper("esta es una cadena");
print(cadena); // ESTA ES UNA CADENA
```

###### TypeOf
```java
String cadena = TypeOf("esta es una cadena");
print(cadena); // String
```

###### Incremento
```java
int numero = 10;
numero++;
print(numero); // 11
```

###### Decremento
```java
int numero = 10;
numero--;
print(numero); // 9
```

#### Sentencias de control

###### if
```java
int numero = 10;
if (numero == 10) {
    print("El numero es 10");
}
```

###### else
```java
int numero = 10;
if (numero == 10) {
    print("El numero es 10");
} else {
    print("El numero no es 10");
}
```

###### for
```java
for (int i=0; i < 5; i++) {
    print(i + 1 + " "); // 1 2 3 4 5
}
```

###### while
```java
int contador = 0;
while (contador < 5) {
    print(contador + " "); // 0 1 2 3 4
    contador++;
}
```

###### do while
```java
int numero = 10;
do {
    print("El numero es: " + numero); // 10
} while (numero > 10);
```

###### switch
```java
int opcion = 3;
switch (opcion) {
    // Sentencias
}
```

###### case
```java
int opcion = 3;
switch (opcion) {
    case 1:
        print("1");
    case 2:
        print("2");
    case 3:
        print("3"); // 3
}
```

###### default
```java
int opcion = 3;
switch (opcion) {
    case 1:
        print("1");
    case 2:
        print("2");
    case 3:
        print("3"); // 3
    default:
        print("Incorrecto");
}
```

###### break
```java
int opcion = 3;
switch (opcion) {
    case 1:
        print("1");
        break;
    case 2:
        print("2");
        break;
    case 3:
        print("3"); // 3
        break;
    default:
        print("Incorrecto");
        break;
}
```

###### continue
```java
 for (int i=0; i<5;i++) {
    if (i==3) {
        continue;
    } 
    print(i + " "); // 0 1 2 4
 }
```

###### return
```java
suma(): String {
    // Instrucciones
    return "La suma es 10";
}
```

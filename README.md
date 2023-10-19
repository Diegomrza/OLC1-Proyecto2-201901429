# OLC1 - Proyecto 2 - 201901429
###### Proyecto número 2 del curso de organización de lenguajes y compiladores 1, 2022 (Corregido -> 19-10-2023)

## Documentacion
- [Requisitos](#Requisitos)
- [Dependencias](#dependencias-necesarias)
- [Desplegar Backend](#desplegar-backend)
- [Desplegar Frontend](#desplegar-frontend)
- [Funciones nativas](#funciones-nativas)
- [Ejemplos:](#ejemplos)

## Requisitos
- Asegurarse de tener instalado nodejs y npm
```bash
node --version 
npm --version
```

## Dependencias necesarias:
- TypeScript
```bash
npm install -g typescript
```

- Monaco Editor
```bash
npm i @monaco-editor/react
```

## Desplegar Backend
Para ejecutar el analizador  ejecutar estos comandos en una consola
```bash
cd .\backend\
npm install
npm start
```

## Desplegar Frontend
Para ejecutar el editor de texto ejecutar estos comandos en una consola aparte
```bash
cd .\frontend\
npm install
npm run dev
```

## Funciones nativas:
- `Length`
    - [ejemplo](#ejemplo-length)

- `Round`
    - [ejemplo](#ejemplo-round)

- `ToCharArray`
    - [ejemplo](#ejemplo-tochararray)

- `ToString`
    - [ejemplo](#ejemplo-tostring)

- `ToLower`
    - [ejemplo](#ejemplo-tolower)

- `ToUpper`
    - [ejemplo](#ejemplo-toupper)

- `TypeOf`
    - [ejemplo](#ejemplo-typeof)

- `Incremento`
    - [ejemplo](#ejemplo-incremento)

- `Decremento`
    - [ejemplo](#ejemplo-decremento)

## Sentencias de control
- `if`
- `for`
- `while`
- `do while`
- `switch`
- `case`
- `default`
- `break`
- `continue`
- `return`

## Ejemplos:

### Ejemplo Length
```java
int tamanio = Length("Cadena");
print(tamanio); // 6
```

### Ejemplo Round
```java
int numero = Round(10.5); 
print(numero); // 10
```

### Ejemplo ToCharArray
```java
char[] arreglo = ToCharArray("Esta Es Una Cadena");
for (int i=0; i< length(arreglo); i++) {
    print(arreglo[i] + ", "); //E, s, t, a,  , E, s, U, n, a, C, a, d, e, n, a, 
}
```

### Ejemplo ToString
```java
String cadena = ToString(10);
print(cadena); // "10"
```

### Ejemplo ToLower
```java
String cadena = ToLower("ESTA ES UNA CADENA");
print(cadena); // esta es una cadena
```

### Ejemplo ToUpper

```java
String cadena = ToUpper("esta es una cadena");
print(cadena); // ESTA ES UNA CADENA
```

### Ejemplo TypeOf
```java
String cadena = TypeOf("esta es una cadena");
print(cadena); // String
```

### Ejemplo Incremento
```java
int numero = 10;
numero++;
print(numero); // 11
```

### Ejemplo Decremento
```java
int numero = 10;
numero--;
print(numero); // 9
```
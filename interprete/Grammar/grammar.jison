%{
    //Import expresiones
    const { Aritmetica, TipoAritmetica } = require('../Expresion/Aritmetica')
    const { Relacional, TipoRelacional } = require('../Expresion/Relacional')
    const { Logica, TipoLogica } = require('../Expresion/Logica')
    const { Type } = require('../Expresion/Retorno')
    const { Literal, TipoLiteral } = require('../Expresion/Literal')
    const { Acceso } = require('../Expresion/Acceso')

    //Import instrucciones
    const { Declaracion } = require('../Instruccion/Declaracion')
    const { Print } = require('../Instruccion/Print')
    const { Statement } = require('../Instruccion/Statement')
    const { If } = require('../Instruccion/If')
    const { While } = require('../Instruccion/While')
    const { Do_While } = require('../Instruccion/Do_While')
    const { Switch } = require('../Instruccion/Switch')
    const { Case } = require('../Instruccion/Case')
    const { Break } = require('../Instruccion/Break')
    const { Continue } = require('../Instruccion/Continue')
    const { Funcion } = require('../Instruccion/Funcion')
    //const { LlamadaFuncion } = require('../Instruccion/LlamadaFuncion')
    const { Return } = require('../Instruccion/Return')
    const { Ternario } = require('../Instruccion/Ternario')
    const { Increment_Decrement } = require('../Instruccion/Increment_Decrement')
    const { Casteo, TipoCasteo } = require('../Instruccion/Casteo')
    const { For } = require('../Instruccion/For')
    const { Vector } = require('../Instruccion/Vector')
    const { Matriz } = require('../Instruccion/Matriz')
    const { TipoFuncion } = require('../Instruccion/Instruccion')

    //Import Funciones nativas
    const { TypeOf } = require('../Funciones_Nativas/TypeOf')
    const { ToString } = require('../Funciones_Nativas/ToString')
    const { ToCharArray } = require('../Funciones_Nativas/ToCharArray')

    const { Length } = require('../Funciones_Nativas/Length')
    const { Round } = require('../Funciones_Nativas/Round')
    const { ToLower } = require('../Funciones_Nativas/ToLower')
    const { ToUpper } = require('../Funciones_Nativas/ToUpper')

    //Import error
    const { Error_ } = require('../Error/Error')
%}

%lex

%options case-insensitive

%%

\s+                                 {}
//[ \r\f]+                          {}      //Se ignoran estos espacios
"//".*                              {}      //Comentarios de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}      //Comentarios multilinea


//Palabras reservadas
"true"                  return 'TRUE';
"false"                 return 'FALSE';
"print"                 return 'PRINT';
"println"               return 'PRINTLN';

"typeof"                return 'TYPEOF';
"toString"              return 'TOSTRING';
"toCharArray"           return 'TOCHARARRAY';
"length"                return 'LENGTH';

"toLower"               return 'TOLOWER';
"toUpper"               return 'TOUPPER';
"round"                 return 'ROUND';

//Sentencias de control
"if"                    return 'IF';
"else"                  return 'ELSE';
"do"                    return 'DO';
"while"                 return 'WHILE';
"switch"                return 'SWITCH';
"case"                  return 'CASE';
"default"               return 'DEFAULT';
"for"                   return 'FOR';
"break"                 return 'BREAK';
"continue"              return 'CONTINUE';
"return"                return 'RETURN';
"function"              return 'FUNCTION'; //No aplica
"new"                   return 'NEW';
"void"                  return 'VOID';
"run"                   return 'RUN';


//Palabras reservadas tipos
"int"                   return 'INT';
"double"                return 'DOUBLE';
"char"                  return 'CHAR';
"boolean"               return 'BOOLEAN';
"string"                return 'STRING';


//Tipos
\d+\.\d+\b              return 'DECIMAL';
\d+\b                   return 'ENTERO';

//
\'.\'                   { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
(\"[^\"]*\")            { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';

//Especiales
// "\n"                    return 'SALTO_DE_LINEA';
// "\\"                    return 'BARRA_INVERTIDA';
// "\""                    return 'COMILLA_DOBLE';
// "\t"                    return 'TABULACION';
// "\'"                    return 'COMILLA_SIMPLE';

//Paréntesis
"("                     return 'PAR_ABRE';
")"                     return 'PAR_CIERRA';

//Llaves
"{"                     return 'LL_ABRE';
"}"                     return 'LL_CIERRA';

//Corchetes
"["                     return 'COR_ABRE';
"]"                     return 'COR_CIERRA';

//Relacionales
"=="                    return 'IGUAL_IGUAL';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFERENTE';
"="                     return 'IGUAL';
"?"                     return 'QUESTION';

//Lógicos
"||"                    return 'OR';
"&&"                    return 'AND';
"!"                     return 'NOT';

//Aritméticos
","                     return 'COMA';
":"                     return 'DOSPUNTOS';
";"                     return 'PUNTO_Y_COMA';
"++"                    return 'MAS_MAS';
"+"					    return 'MAS';
"--"                    return 'MENOS_MENOS';
"-"					    return 'MENOS';
"*"					    return 'POR';
"/"					    return 'DIVIDIR';
"^"                     return 'POTENCIA';
"%"                     return 'MODULO';
//"."                     return 'PUNTO';

<<EOF>>     return 'EOF';
.                       {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}
/lex

%left 'QUESTION' 'DOSPUNTOS'
%left 'OR'                                                                      //7
%left 'AND'                                                                     //6
%right 'NOT'                                                                    //5
%left 'IGUAL_IGUAL' 'DIFERENTE'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'                               //4
%left 'MAS' 'MENOS'                                                             //3
%left 'DIVIDIR' 'POR'                                                           //2
%left 'POTENCIA' 'MODULO'                                                       //1
%right UMENOS                                                                   //0
%left 'MAS_MAS' 'MENOS_MENOS'

%start ini

%%

ini
    : instrucciones EOF     { return $1; }
;

instrucciones
    : instrucciones inicio      { $1.push($2); $$ = $1; }
    | inicio    { $$ = [$1]}
;

inicio
    : asignacion PUNTO_Y_COMA
    | declaracion PUNTO_Y_COMA
    | print
    | if
    | while
    | do_while
    | for
    | switch
    | funcion
    | llamadaFuncion PUNTO_Y_COMA
    | incremento
    | decremento
    | BREAK PUNTO_Y_COMA    { $$ = new Break(@1.first_line, @1.first_column) }
    | CONTINUE PUNTO_Y_COMA     { $$ = new Continue(@1.first_line, @1.first_column) }
    | declaracion_vectores PUNTO_Y_COMA
    | modificacion_vectores PUNTO_Y_COMA
;


//_____________________________________________DECLARACIÓN Y ASIGNACIÓN DE VARIABLES_____________________________________________//
declaracion
    //Varias variables/una sin inicializar
    : INT declaracion_multiple                      { $$ = new Declaracion($2, new Literal(0, TipoLiteral.ENTERO ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0, null, null, TipoLiteral.ENTERO) }
    | DOUBLE declaracion_multiple                   { $$ = new Declaracion($2, new Literal(0.0, TipoLiteral.DOBLE ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0, null, null, TipoLiteral.DOBLE) }
    | CHAR declaracion_multiple                     { $$ = new Declaracion($2, new Literal("\u0000", TipoLiteral.CARACTER ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0, null, null, TipoLiteral.CARACTER) }
    | BOOLEAN declaracion_multiple                  { $$ = new Declaracion($2, new Literal(true, TipoLiteral.BOOLEAN ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0, null, null, TipoLiteral.BOOLEAN) }
    | STRING declaracion_multiple                   { $$ = new Declaracion($2, new Literal("", TipoLiteral.CADENA ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0, null, null, TipoLiteral.CADENA) }
    //Varias variables/una con un valor
    | INT declaracion_multiple IGUAL expresion      { $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0, null, null, TipoLiteral.ENTERO) }
    | DOUBLE declaracion_multiple IGUAL expresion   { $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0, null, null, TipoLiteral.DOBLE) }
    | CHAR declaracion_multiple IGUAL expresion     { $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0, null, null, TipoLiteral.CARACTER) }
    | BOOLEAN declaracion_multiple IGUAL expresion  { $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0, null, null, TipoLiteral.BOOLEAN) }
    | STRING declaracion_multiple IGUAL expresion   { $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0, null, null, TipoLiteral.CADENA) }
;

declaracion_multiple
    : declaracion_multiple COMA IDENTIFICADOR   { $1.push($3); $$ = $1; }
    | IDENTIFICADOR     { $$ = [$1.toLowerCase()] }
;

asignacion 
    : IDENTIFICADOR IGUAL expresion     { $$ = new Declaracion([$1.toLowerCase()], $3, @1.first_line, @1.first_column, 1, null, null, $3.tipo) }
    | IDENTIFICADOR IGUAL casteos       { $$ = new Declaracion([$1.toLowerCase()], $3, @1.first_line, @1.first_column, 1, null, null, $3.tipo) }
;

//_____________________________________________FUNCIÓN PRINT Y PRINTLN_____________________________________________//
print
    : PRINT PAR_ABRE ListaExpr PAR_CIERRA PUNTO_Y_COMA      { $$ = new Print($3, 0, @1.first_line, @1.first_column) }
    | PRINTLN PAR_ABRE ListaExpr PAR_CIERRA PUNTO_Y_COMA    { $$ = new Print($3, 1, @1.first_line, @1.first_column) }
;

ListaExpr
    : ListaExpr COMA expresion      { $1.push($3); $$ = $1; }
    | expresion         { $$ = [$1] }
;

//_____________________________________________SENTENCIAS DE CONTROL_____________________________________________//
if
    : IF PAR_ABRE expresion PAR_CIERRA statement elsE   { $$ = new If($3, $5, $6, @1.first_line, @1.first_column) }
;

elsE
    : ELSE statement    { $$ = $2 }
    | ELSE if   { $$ = $2 }
    |   { $$ = null }
;

switch
    : SWITCH PAR_ABRE expresion PAR_CIERRA LL_ABRE lista_case default LL_CIERRA     { $$ = new Switch($3, $6, $7, @1.first_line, @1.first_column) }
    | SWITCH PAR_ABRE expresion PAR_CIERRA LL_ABRE default LL_CIERRA     { $$ = new Switch($3, null, $6, @1.first_line, @1.first_column) }
;

lista_case
    : lista_case case   { $1.push($2); $$ = $1; }
    | case      { $$ = [$1] }
;

case
    : CASE expresion DOSPUNTOS statement_case   { $$ = new Case($2, $4, @1.first_line, @1.first_column) }
;

statement_case
    : instrucciones     { $$ = new Statement($1, @1.first_line, @1.first_column) }
    |                   { $$ = new Statement([], @1.first_line, @1.first_column) }
;

default
    : DEFAULT DOSPUNTOS statement_case  { $$ = $3 }
    |   { $$ = null }
;

//_____________________________________________SENTENCIAS CÍCLICAS_____________________________________________//
while
    : WHILE PAR_ABRE expresion PAR_CIERRA statement     { $$ = new While($3, $5,  @1.first_line, @1.first_column) }
;

for
    : FOR PAR_ABRE declaracion PUNTO_Y_COMA expresion PUNTO_Y_COMA incremento_sin_punto_y_coma PAR_CIERRA statement  { $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column) }
    | FOR PAR_ABRE declaracion PUNTO_Y_COMA expresion PUNTO_Y_COMA decremento_sin_punto_y_coma PAR_CIERRA statement  { $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column) }
    | FOR PAR_ABRE declaracion PUNTO_Y_COMA expresion PUNTO_Y_COMA asignacion PAR_CIERRA statement  { $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column) }
    | FOR PAR_ABRE asignacion PUNTO_Y_COMA expresion PUNTO_Y_COMA incremento_sin_punto_y_coma PAR_CIERRA statement   { $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column) }
    | FOR PAR_ABRE asignacion PUNTO_Y_COMA expresion PUNTO_Y_COMA decremento_sin_punto_y_coma PAR_CIERRA statement   { $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column) }
    | FOR PAR_ABRE asignacion PUNTO_Y_COMA expresion PUNTO_Y_COMA asignacion PAR_CIERRA statement   { $$ = new For($3, $5, $7, $9, @1.first_line, @1.first_column) }
;

do_while
    : DO statement WHILE PAR_ABRE expresion PAR_CIERRA    { $$ = new Do_While($5, $2, @1.first_line, @1.first_column) }
;

//_____________________________________________CUERPO DE LAS SENTENCIAS_____________________________________________//
statement
    : LL_ABRE instrucciones LL_CIERRA   { $$ = new Statement($2, @1.first_line, @1.first_column) }
    | LL_ABRE LL_CIERRA     { $$ = new Statement([], @1.first_line, @1.first_column) }
;

//_____________________________________________FUNCIONES Y MÉTODOS_____________________________________________//
funcion
    //id (): tipo {  } 
    : IDENTIFICADOR PAR_ABRE PAR_CIERRA DOSPUNTOS tipo_dato statement               { $$ = new Funcion($1, $6, [], $5, @1.first_line, @1.first_column); }
    | IDENTIFICADOR PAR_ABRE parametros PAR_CIERRA DOSPUNTOS tipo_dato statement    { $$ = new Funcion($1, $7, $3, $6, @1.first_line, @1.first_column); }
;

parametros
    : parametros COMA IDENTIFICADOR     { $1.push($3); $$ =$1 }
    | IDENTIFICADOR     { $$ = [$1] }
;

llamadaFuncion
    : IDENTIFICADOR PAR_ABRE PAR_CIERRA     { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column); }
    | IDENTIFICADOR PAR_ABRE ListaExpr PAR_CIERRA   { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column); }
    | RUN 
;

tipo_dato
    : INT       { $$ = TipoFuncion.INT }
    | DOUBLE    { $$ = TipoFuncion.DOUBLE }
    | CHAR      { $$ = TipoFuncion.CHAR }
    | BOOLEAN   { $$ = TipoFuncion.BOOLEAN }
    | STRING    { $$ = TipoFuncion.STRING }
    | VOID      { $$ = TipoFuncion.VOID }
;

//_____________________________________________INCREMENTO Y DECREMENTO_____________________________________________//
incremento
    : IDENTIFICADOR MAS_MAS PUNTO_Y_COMA    { $$ = new Increment_Decrement($1, new Acceso($1.toLowerCase(), 0, null, null, @1.first_line, @1.first_column), true, @1.first_line, @1.first_column) }
;

decremento
    : IDENTIFICADOR MENOS_MENOS PUNTO_Y_COMA    {$$ = new Increment_Decrement($1, new Acceso($1.toLowerCase(), 0, null, null, @1.first_line, @1.first_column), false, @1.first_line, @1.first_column) }
;

incremento_sin_punto_y_coma
    : IDENTIFICADOR MAS_MAS     { $$ = new Increment_Decrement($1, new Acceso($1.toLowerCase(), 0, null, null, @1.first_line, @1.first_column), true, @1.first_line, @1.first_column) }
;

decremento_sin_punto_y_coma
    : IDENTIFICADOR MENOS_MENOS     {$$ = new Increment_Decrement($1, new Acceso($1.toLowerCase(), 0, null, null, @1.first_line, @1.first_column), false, @1.first_line, @1.first_column) }
;

//_____________________________________________OPERADOR TERNARIO_____________________________________________//
ternario 
    : expresion QUESTION expresion DOSPUNTOS expresion { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column); }
;

//_____________________________________________CASTEOS_____________________________________________//
casteos
    : PAR_ABRE DOUBLE PAR_CIERRA expresion  { $$ = new Casteo(TipoCasteo.DOBLE, $4, @1.first_line, @1.first_column) }
    | PAR_ABRE CHAR PAR_CIERRA expresion    { $$ = new Casteo(TipoCasteo.CARACTER, $4, @1.first_line, @1.first_column) }
    | PAR_ABRE INT PAR_CIERRA expresion     { $$ = new Casteo(TipoCasteo.ENTERO, $4, @1.first_line, @1.first_column) }
;

//_____________________________________________VECTORES_____________________________________________//
declaracion_vectores
    : vector_una_dimension
    | vector_dos_dimensiones
;

vector_una_dimension
    : INT IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL NEW INT COR_ABRE expresion COR_CIERRA
        { $$ = new Vector(Type.ENTERO, $2, [], $9, Type.VECTOR, @1.first_line, @1.first_column) }
    | INT IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { $$ = new Vector(Type.ENTERO, $2, $7, new Literal($7.length, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) }

    | DOUBLE IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL NEW DOUBLE COR_ABRE expresion COR_CIERRA
        { $$ = new Vector(Type.DOBLE, $2, [], $9, Type.VECTOR, @1.first_line, @1.first_column) }
    | DOUBLE IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { $$ = new Vector(Type.DOBLE, $2, $7, new Literal($7.length, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) }

    | CHAR IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL NEW CHAR COR_ABRE expresion COR_CIERRA
        { $$ = new Vector(Type.CARACTER, $2, [], $9, Type.VECTOR, @1.first_line, @1.first_column) }
    | CHAR IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { $$ = new Vector(Type.CARACTER, $2, $7, new Literal($7.length, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) }

    | BOOLEAN IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL NEW BOOLEAN COR_ABRE expresion COR_CIERRA
        { $$ = new Vector(Type.BOOLEAN, $2, [], $9, Type.VECTOR, @1.first_line, @1.first_column) }
    | BOOLEAN IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { $$ = new Vector(Type.BOOLEAN, $2, $7, new Literal($7.length, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) }

    | STRING IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL NEW STRING COR_ABRE expresion COR_CIERRA
        { $$ = new Vector(Type.CADENA, $2, [], $9, Type.VECTOR, @1.first_line, @1.first_column) }
    | STRING IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { $$ = new Vector(Type.CADENA, $2, $7, new Literal($7.length, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) }
;

vector_dos_dimensiones
    : INT IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL NEW INT COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
        { $$ = new Matriz(Type.ENTERO, $2, [], $11, $14, Type.VECTOR, @1.first_line, @1.first_column) }
    | INT IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { 
            let mi = 0;
            let auxi = 0;
            for (const i of $9) {
                mi++;
                let ni = 0;
                for (const j of i) {
                    ni++;
                }
                if (auxi < ni) { auxi = ni; }
            }
            $$ = new Matriz(Type.ENTERO, $2, $9, new Literal(mi, TipoLiteral.ENTERO, @1.first_line, @1.first_column), new Literal(auxi, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) 
        }

    | DOUBLE IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL NEW DOUBLE COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
        { $$ = new Matriz(Type.DOBLE, $2, [], $11, $14, Type.VECTOR, @1.first_line, @1.first_column) }
    | DOUBLE IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { 
            let md = 0;
            let auxd = 0;
            for (const i of $9) {
                md++;
                let nd = 0;
                for (const j of i) { nd++; }
                if (auxd < nd) { auxd = nd; }
            }
            $$ = new Matriz(Type.DOBLE, $2, $9, new Literal(md, TipoLiteral.ENTERO, @1.first_line, @1.first_column), new Literal(auxd, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) 
        }

    | CHAR IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL NEW CHAR COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
        { $$ = new Matriz(Type.CARACTER, $2, [], $11, $14, Type.VECTOR, @1.first_line, @1.first_column) }
    | CHAR IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { 
            let mc = 0;
            let auxc = 0;
            for (const i of $9) {
                mc++;
                let nc = 0;
                for (const j of i) { nc++; }
                if (auxc < nc) { auxc = nc; }
            }
            $$ = new Matriz(Type.CARACTER, $2, $9, new Literal(mc, TipoLiteral.ENTERO, @1.first_line, @1.first_column), new Literal(auxc, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column)
        }

    | BOOLEAN IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL NEW BOOLEAN COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
        { $$ = new Matriz(Type.BOOLEAN, $2, [], $11, $14, Type.VECTOR, @1.first_line, @1.first_column) }
    | BOOLEAN IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { 
            let mb = 0;
            let auxb = 0;
            for (const i of $9) {
                mb++;
                let nb = 0;
                for (const j of i) { nb++; }
                if (auxb < nb) { auxb = nb; }
            }
            $$ = new Matriz(Type.BOOLEAN, $2, $9, new Literal(mb, TipoLiteral.ENTERO, @1.first_line, @1.first_column), new Literal(auxb, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) 
        }

    | STRING IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL NEW STRING COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
        { $$ = new Matriz(Type.CADENA, $2, [], $11, $14, Type.VECTOR, @1.first_line, @1.first_column) }
    | STRING IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL COR_ABRE ListaExpr COR_CIERRA
        { 
            let ms = 0; 
            let auxs = 0;
            for (const i of $9) {
                ms++;
                let ns = 0;
                for (const j of i) { ns++; }
                if (auxs < ns) { auxs = ns; }
            }
            $$ = new Matriz(Type.CADENA, $2, $9, new Literal(ms, TipoLiteral.ENTERO, @1.first_line, @1.first_column), new Literal(auxs, TipoLiteral.ENTERO, @1.first_line, @1.first_column), Type.VECTOR, @1.first_line, @1.first_column) 
        }
;

acceso_vectores
    : IDENTIFICADOR COR_ABRE expresion COR_CIERRA
        { $$ = new Acceso($1.toLowerCase(), 1, $3, null, @1.first_line, @1.first_column) }
    | IDENTIFICADOR COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
        { $$ = new Acceso($1.toLowerCase(), 2, $3, $6, @1.first_line, @1.first_column) }
;

modificacion_vectores
    : IDENTIFICADOR COR_ABRE expresion COR_CIERRA IGUAL expresion
        { $$ = new Declaracion([$1], $6, @1.first_line, @1.first_column, 2, $3, null, $6.tipo) }
    | IDENTIFICADOR COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA IGUAL expresion
        { $$ = new Declaracion([$1], $9, @1.first_line, @1.first_column, 3, $3, $6, $9.tipo) }
;

//_____________________________________________FUNCIONES NATIVAS_____________________________________________//
type_of
    : TYPEOF PAR_ABRE expresion PAR_CIERRA
        { $$ = new TypeOf($3, @1.first_line, @1.first_column) }
;

to_string
    : TOSTRING PAR_ABRE expresion PAR_CIERRA
        { $$ = new ToString($3, @1.first_line, @1.first_column) }
;

to_char_array
    : TOCHARARRAY PAR_ABRE expresion PAR_CIERRA
        { $$ = new ToCharArray($3, @1.first_line, @1.first_column) }
;

length_
    : LENGTH PAR_ABRE expresion PAR_CIERRA
        { $$ = new Length($3, @1.first_line, @1.first_column) }
;

to_lower
    : TOLOWER PAR_ABRE expresion PAR_CIERRA
        { $$ = new ToLower($3, @1.first_line, @1.first_column) }
;

to_upper
    : TOUPPER PAR_ABRE expresion PAR_CIERRA
        { $$ = new ToUpper($3, @1.first_line, @1.first_column) }
;

round
    : ROUND PAR_ABRE expresion PAR_CIERRA
        { $$ = new Round($3, @1.first_line, @1.first_column) }
;

//_____________________________________________EXPRESION_____________________________________________//
expresion 
    //Aritméticas
    : MENOS expresion %prec UMENOS      { $$ = new Aritmetica($2, new Literal("-1", TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) }
    | expresion MAS expresion           { $$ = new Aritmetica($1, $3, TipoAritmetica.SUMA, @1.first_line, @1.first_column) }
    | expresion MENOS expresion         { $$ = new Aritmetica($1, $3, TipoAritmetica.RESTA, @1.first_line, @1.first_column) }
    | expresion POR expresion           { $$ = new Aritmetica($1, $3, TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) }
    | expresion DIVIDIR expresion       { $$ = new Aritmetica($1, $3, TipoAritmetica.DIVISION, @1.first_line, @1.first_column) }
    | expresion POTENCIA expresion      { $$ = new Aritmetica($1, $3, TipoAritmetica.POTENCIA, @1.first_line, @1.first_column) }
    | expresion MODULO expresion        { $$ = new Aritmetica($1, $3, TipoAritmetica.MODULO, @1.first_line, @1.first_column) }
    //Relacionales
    | expresion IGUAL_IGUAL expresion   { $$ = new Relacional($1, $3, TipoRelacional.IGUALIGUAL, @1.first_line, @1.first_column) }
    | expresion DIFERENTE expresion     { $$ = new Relacional($1, $3, TipoRelacional.DIFERENTE, @1.first_line, @1.first_column) }
    | expresion MAYOR_IGUAL expresion   { $$ = new Relacional($1, $3, TipoRelacional.MAYOR_IGUAL, @1.first_line, @1.first_column) }
    | expresion MENOR_IGUAL expresion   { $$ = new Relacional($1, $3, TipoRelacional.MENOR_IGUAL, @1.first_line, @1.first_column) }
    | expresion MAYOR expresion         { $$ = new Relacional($1, $3, TipoRelacional.MAYOR, @1.first_line, @1.first_column) }
    | expresion MENOR expresion         { $$ = new Relacional($1, $3, TipoRelacional.MENOR, @1.first_line, @1.first_column) }
    //Paréntesis
    | PAR_ABRE expresion PAR_CIERRA     { $$ = $2 }
    //Lógicas
    | expresion AND expresion           { $$ = new Logica($1, $3, TipoLogica.AND, @1.first_line, @1.first_column) }
    | expresion OR expresion            { $$ = new Logica($1, $3, TipoLogica.OR, @1.first_line, @1.first_column) }
    | NOT expresion                     { $$ = new Logica($2, null, TipoLogica.NOT, @1.first_line, @1.first_column) }
    //Literales
    | CADENA                            { $$ = new Literal($1, TipoLiteral.CADENA, @1.first_line, @1.first_column) }
    | ENTERO                            { $$ = new Literal($1, TipoLiteral.ENTERO, @1.first_line, @1.first_column) }
    | DECIMAL                           { $$ = new Literal($1, TipoLiteral.DOBLE, @1.first_line, @1.first_column) }
    | TRUE                              { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | FALSE                             { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | CARACTER                          { $$ = new Literal($1, TipoLiteral.CARACTER, @1.first_line, @1.first_column) }
    //Acceso a variables declaradas
    | IDENTIFICADOR                     { $$ = new Acceso($1.toLowerCase(), 0, null, null, @1.first_line, @1.first_column) }
    //Ternario
    | ternario                          { $$ = $1 }
    //Incremento y decremento asignado a variables
    | incremento_sin_punto_y_coma       { $$ = $1 }
    | decremento_sin_punto_y_coma       { $$ = $1 }
    //Vectores
    | COR_ABRE ListaExpr COR_CIERRA     { $$ = $2 }
    | acceso_vectores                   { $$ = $1 }
    //Funciones nativas
    | type_of                           { $$ = $1 }
    | to_string                         { $$ = $1 }
    | to_char_array                     { $$ = $1 }
    | length_                           { $$ = $1 }
    | to_lower                          { $$ = $1 }
    | to_upper                          { $$ = $1 }
    | round                             { $$ = $1 }
;
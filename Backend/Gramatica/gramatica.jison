%{
    //Importaciones
%}

%lex

%options case-insensitive

%%

\s+ {} //Ignorar todos los espacios
"//".* {}  //Comentarios de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}  //Comentarios multilinea

/* Palabras reservadas */
"true"  return 'TRUE';
"false" return 'FALSE';
"new" return 'NEW';

//Tipos
"int" return 'INT';
"double" return 'DOUBLE';
"boolean" return 'BOOLEAN';
"char" return 'CHAR';
"string" return 'STRING';

//Terminales primitivos
[0-9]+("."[0-9]+)\b return 'DECIMAL';
[0-9]+\b return 'ENTERO';
\'.\' { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
(\"[^\"]*\") { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
([a-zA-Z])[a-zA-Z0-9_]* return 'IDENTIFICADOR';
 
//Funciones nativas
"print" return 'PRINT';
"println" return 'PRINTLN';
"typeof" return 'TYPE_OF';
"toString" return 'TO_STRING';
"toCharrArray" return 'TO_CHAR_ARRAY';
"length" return 'LENGTH';
"toLower" return 'TO_LOWER';
"toUpper" return 'TO_UPPER';
"round" return 'ROUND';

//Sentencias de control
"if" return 'IF';
"else" return 'ELSE';
"switch" return 'SWITCH';
"case" return 'CASE';
"default" return 'DEFAULT';

//Sentencias cíclicas
"while" return 'WHILE';
"do" return 'DO';
"for" return 'FOR';

//Sentencias de transferencia
"break" return 'BREAK';
"continue" return 'CONTINUE';
"return" return 'RETURN';

//Paréntesis
"(" return 'PAR_ABRE';
")" return 'PAR_CIERRA';

//Corchetes
"[" return 'COR_ABRE';
"]" return 'COR_CIERRA';

//Llaves
"{" return 'LL_ABRE';
"}" return 'LL_CIERRA';

//Relacionales
"==" return 'IGUAL_IGUAL';
"<=" return 'MENOR_IGUAL';
"<" return 'MENOR';
">=" return 'MAYOR_IGUAL';                     
">" return 'MAYOR';
"!=" return 'DIFERENTE';
"=" return 'IGUAL';
"?" return 'PREGUNTA';

//Lógicos
"||" return 'OR';
"&&" return 'AND';
"!" return 'NOT';

//Signos de puntuacion
":" return 'DOS_PUNTOS';
";" return 'PUNTO_Y_COMA';
"," return 'COMA';

//Incremento y decremento
"++" return 'MAS_MAS';
"--" return 'MENOS_MENOS';

//Operadores aritmeticos
"-" return 'RESTA';
"+" return 'SUMA';
"*" return 'MULTIPLICACION';
"/" return 'DIVISION';
"^" return 'POTENCIA';
"%" return 'MODULO';

<<EOF>>     return 'EOF';   //Fin de archivo

.                       {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}

/lex

//Precedencia
%left 'PREGUNTA' 'DOS_PUNTOS'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'IGUAL_IGUAL' 'DIFERENTE'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'MAS' 'MENOS'
%left 'DIVIDIR' 'MULTIPLICACION'
%left 'POTENCIA' 'MODULO'
%right UMENOS
%left 'MAS_MAS' 'MENOS_MENOS'

%start ini

%%

ini
    : instrucciones EOF { 
        return $1; 
    }
;

instrucciones
    : instrucciones inicio 
        { $1.push($2); $$ = $1; }
    | inicio    
        { $$ = [$1] }
;

inicio
    //Asignacion - Declaracion
    : asignacion PUNTO_Y_COMA
    | declaracion PUNTO_Y_COMA

    | declaracion_vectores PUNTO_Y_COMA
    | asignacion_vectores PUNTO_Y_COMA

    | if
    | while
    | for
    | switch
    | incremento_decremento
    | BREAK
    | CONTINUE
    | RETURN
    | print PUNTO_Y_COMA
;

tipos
    : INT       {$$=TipoLiteral.ENTERO}
    | DOUBLE    {$$=TipoLiteral.DOBLE}
    | BOOLEAN   {$$=TipoLiteral.BOOLEAN}
    | CHAR      {$$=TipoLiteral.CARACTER}
    | STRING    {$$=TipoLiteral.CADENA}
;

//____________________Variables____________________//
declaracion
    /*TIPO ID = VALOR*/
    : tipos IDENTIFICADOR IGUAL expresion
;

asignacion
    /*ID = VALOR*/
    : IDENTIFICADOR IGUAL expresion
;

//____________________Vectores____________________//
declaracion_vectores
    : vector
    | matriz
;

vector
    /*TIPO ID [] = VALOR*/
    : tipos IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL expresion
    /*TIPO ID [] = NEW [#]*/
    | tipos IDENTIFICADOR COR_ABRE COR_CIERRA IGUAL NEW COR_ABRE expresion COR_CIERRA
;

matriz
    /*TIPO ID [][] = VALOR*/
    : tipos IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL expresion
    /*TIPO ID [][] = NEW [#][#]*/
    | tipos IDENTIFICADOR COR_ABRE COR_CIERRA COR_ABRE COR_CIERRA IGUAL NEW COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
;

asignacion_vectores
    /*ID [#] = VALOR*/
    : IDENTIFICADOR COR_ABRE expresion COR_CIERRA
    /*ID [#][#] = VALOR*/
    | IDENTIFICADOR COR_ABRE expresion COR_CIERRA COR_ABRE expresion COR_CIERRA
;

//____________________Print____________________//
print
    //PRINT()
    : PRINT COR_ABRE ListaExpr COR_CIERRA
    //PRINTLN()
    | PRINTLN COR_ABRE ListaExpr COR_CIERRA
;

ListaExpr
    : ListaExpr COMA expresion
    | expresion
;

//____________________IF____________________//
if
    : IF PAR_ABRE expresion PAR_CIERRA cuerpo else
;

else
    : ELSE cuerpo
    | ELSE if
    | 
;

//____________________WHILE____________________//
while
    //WHILE (CONDICION) { }
    : WHILE PAR_ABRE expresion PAR_CIERRA cuerpo
    //DO { } WHILE (CONDICION)
    | DO cuerpo WHILE PAR_ABRE PAR_CIERRA
;

//____________________FOR____________________//
for
    //FOR (decl/asign; condicion; actualizar) { }
    : FOR PAR_ABRE declaracion PUNTO_Y_COMA expresion PUNTO_Y_COMA asignacion PAR_CIERRA cuerpo
    | FOR PAR_ABRE asignacion PUNTO_Y_COMA expresion PUNTO_Y_COMA asignacion PAR_CIERRA cuerpo
    | FOR PAR_ABRE declaracion PUNTO_Y_COMA expresion PUNTO_Y_COMA incremento_decremento PAR_CIERRA cuerpo
    | FOR PAR_ABRE asignacion PUNTO_Y_COMA expresion PUNTO_Y_COMA incremento_decremento PAR_CIERRA cuerpo
;

//____________________SWITCH____________________//
switch
    : SWITCH PAR_ABRE expresion PAR_CIERRA LL_ABRE lista_case default LL_CIERRA
    | SWITCH PAR_ABRE expresion PAR_CIERRA LL_ABRE default LL_CIERRA
;

lista_case
    : lista_case case
    | case
;

case
    : CASE expresion DOS_PUNTOS cuerpo_case
;

cuerpo_case
    : instrucciones 
    | 
;

default
    : DEFAULT DOS_PUNTOS cuerpo_case
    | 
;

//____________________CUERPO____________________//
cuerpo
    : LL_ABRE instrucciones LL_CIERRA
    | LL_ABRE LL_CIERRA
;

//____________________INCREMENTO Y DECREMENTO____________________//
incremento_decremento
    : IDENTIFICADOR MAS_MAS
    | IDENTIFICADOR MENOS_MENOS
;

expresion
    : MENOS expresion %prec UMENOS      { $$ = new Aritmetica($2, new Literal("-1", TipoLiteral.ENTERO, @1.first_line, @1.first_column), TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) }
    | expresion MAS expresion           { $$ = new Aritmetica($1, $3, TipoAritmetica.SUMA, @1.first_line, @1.first_column) }
    | expresion MENOS expresion         { $$ = new Aritmetica($1, $3, TipoAritmetica.RESTA, @1.first_line, @1.first_column) }
    | expresion MULTIPLICACION expresion           { $$ = new Aritmetica($1, $3, TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column) }
    | expresion DIVISION expresion       { $$ = new Aritmetica($1, $3, TipoAritmetica.DIVISION, @1.first_line, @1.first_column) }
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
    | incremento_decremento       { $$ = $1 }
    //Vectores
    | COR_ABRE ListaExpr COR_CIERRA     { $$ = $2 }
    //| acceso_vectores                   { $$ = $1 }
    //Funciones nativas
    // | type_of                           { $$ = $1 }
    // | to_string                         { $$ = $1 }
    // | to_char_array                     { $$ = $1 }
    // | length_                           { $$ = $1 }
    // | to_lower                          { $$ = $1 }
    // | to_upper                          { $$ = $1 }
    // | round                             { $$ = $1 }
;
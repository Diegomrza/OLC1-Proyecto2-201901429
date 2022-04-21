%{
    const { Aritmetica, TipoAritmetica } = require('../Expresion/Aritmetica')
    const { Relacional, TipoRelacional } = require('../Expresion/Relacional')
    const { Literal, TipoLiteral } = require('../Expresion/Literal')
    const { Declaracion } = require('../Instruccion/Declaracion')
    const { Print } = require('../Instruccion/Print')
    const { Acceso } = require('../Expresion/Acceso')
    const { Error_ } = require('../Error/Error')
    const { Statement } = require('../Instruccion/Statement')
    const { If } = require('../Instruccion/If')
    const {While} = require('../Instruccion/While')
    const {Break} = require('../Instruccion/Break')
    const {Funcion} = require('../Instruccion/Funcion')
    const {LlamadaFuncion} = require('../Instruccion/LlamadaFuncion')
    const {Return} = require('../Instruccion/Return')
%}

%lex

%options case-insensitive

%%

\s+                       {}
//[ \r\f]+                          {}      //Se ignoran estos espacios
"//".*                              {}      //Comentarios de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}      //Comentarios multilinea


//Palabras reservadas
"true"                  return 'TRUE';
"false"                 return 'FALSE';
"print"                 return 'PRINT';
"println"               return 'PRINTLN';

//Sentencias de control
"if"                    return 'IF';
"else"                  return 'ELSE';
"while"                 return 'WHILE';
"switch"                return 'SWITCH';
"break"                 return 'BREAK';
"return"                return 'RETURN';
"function"              return 'FUNCTION';

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
"+"					    return 'MAS';
"-"					    return 'MENOS';
"*"					    return 'POR';
"/"					    return 'DIVIDIR';
"^"                     return 'POTENCIA';
"%"                     return 'MODULO';
//"."                     return 'PUNTO';

<<EOF>>     return 'EOF';
.                       {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}
/lex

// %left 'INTERROGACION' 'DOS_PUNTOS'
%left 'OR'                                                                      //7
%left 'AND'                                                                     //6
%right 'NOT'                                                                    //5
%left 'IGUAL_IGUAL' 'DIFERENTE'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'                               //4
%left 'MAS' 'MENOS'                                                             //3
%left 'DIVIDIR' 'POR'                                                           //2
%left 'POTENCIA', 'MODULO', NUMERO                                              //1
%right UMENOS                                                                   //0
                             

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
        { $$ = [$1]}
;

inicio
    : asignacion
    | declaracion
    | print
    | if
    | while
    // | switch
    | funcion
    | llamadaFuncion PUNTO_Y_COMA
    // | BREAK PUNTO_Y_COMA
;


declaracion
    //Varias variables/una sin inicializar
    : INT declaracion_multiple PUNTO_Y_COMA
        {   
            $$ = new Declaracion($2, new Literal(0, TipoLiteral.ENTERO ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0); 
        }
    | DOUBLE declaracion_multiple PUNTO_Y_COMA     
        { 
            $$ = new Declaracion($2, new Literal(0.0, TipoLiteral.DOBLE ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0);
        }
    | CHAR declaracion_multiple PUNTO_Y_COMA       
        { 
            $$ = new Declaracion($2, new Literal("\u0000", TipoLiteral.CARACTER ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0); 
        }
    | BOOLEAN declaracion_multiple PUNTO_Y_COMA   
        { 
            $$ = new Declaracion($2, new Literal(true, TipoLiteral.BOOLEAN ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0); 
        }
    | STRING declaracion_multiple PUNTO_Y_COMA     
        { 
            $$ = new Declaracion($2, new Literal("", TipoLiteral.CADENA ,@1.first_line, @1.first_column), @1.first_line, @1.first_column, 0);
        }
    //Varias variables/una con un valor
    | INT declaracion_multiple IGUAL expresion PUNTO_Y_COMA
        {
            if ($4.tipo == TipoLiteral.ENTERO) {
                $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0);
            } else {
                throw new Error_(@1.first_line, @1.first_column, 'Semantico', `no se puede asignar un tipo ${$4.tipo} a un int`);
            }
        }
    | DOUBLE declaracion_multiple IGUAL expresion PUNTO_Y_COMA
        {
            if ($4.tipo == TipoLiteral.DOBLE) {
                $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0);
            } else {
                throw new Error_(@1.first_line, @1.first_column, 'Semantico', `no se puede asignar un tipo ${$4.tipo} a un double`);
            }
        }
    | CHAR declaracion_multiple IGUAL expresion PUNTO_Y_COMA
        {
            if ($4.tipo == TipoLiteral.CARACTER) {
                $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0);
            } else {
                throw new Error_(@1.first_line, @1.first_column, 'Semantico', `no se puede asignar un tipo ${$4.tipo} a un char`);
            }
        }
    | BOOLEAN declaracion_multiple IGUAL expresion PUNTO_Y_COMA
        {
            if ($4.tipo == TipoLiteral.BOOLEAN) {
                $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0);
            } else {
                throw new Error_(@1.first_line, @1.first_column, 'Semantico', `no se puede asignar un tipo ${$4.tipo} a un boolean`);
            }
        }
    | STRING declaracion_multiple IGUAL expresion PUNTO_Y_COMA 
        {
            if ($4.tipo == TipoLiteral.CADENA) {
                $$ = new Declaracion($2, $4, @1.first_line, @1.first_column, 0);
            } else {
                throw new Error_(@1.first_line, @1.first_column, 'Semantico', `no se puede asignar un tipo ${$4.tipo} a un string`);
            }
        }
;

//Declaración de variables
declaracion_multiple
    : declaracion_multiple COMA IDENTIFICADOR
        {$1.push($3); $$ = $1;}
    | IDENTIFICADOR
        {$$ = [$1]}
;

//Asignación de valores a variables
asignacion 
    : IDENTIFICADOR IGUAL expresion PUNTO_Y_COMA
        { $$ = new Declaracion($1, $3, @1.first_line, @1.first_column, 1) }
;

//Print
print
    : PRINT PAR_ABRE ListaExpr PAR_CIERRA PUNTO_Y_COMA
        { $$ = new Print($3, 0, @1.first_line, @1.first_column) }
    | PRINTLN PAR_ABRE ListaExpr PAR_CIERRA PUNTO_Y_COMA
        { $$ = new Print($3, 1, @1.first_line, @1.first_column) }
;

ListaExpr
    : ListaExpr COMA expresion
        { $1.push($3); $$ = $1; }
    | expresion
        { $$ = [$1] }
;

if
    : IF PAR_ABRE expresion PAR_CIERRA statement elsE
        { $$ = new If($3, $5, $6, @1.first_line, @1.first_column) }
;

elsE
    : ELSE statement
        { $$ = $2 }
    | ELSE if
        { $$ = $2 }
    | 
        { $$ = null }
;

while
    : WHILE PAR_ABRE expresion PAR_CIERRA statement
        { $$ = new While($3, $5,  @1.first_line, @1.first_column) }
;

statement
    : LL_ABRE instrucciones LL_CIERRA
        { $$ = new Statement($2, @1.first_line, @1.first_column) }
    | LL_ABRE LL_CIERRA
        { $$ = new Statement([], @1.first_line, @1.first_column) }
;

funcion
    : FUNCTION IDENTIFICADOR PAR_ABRE PAR_CIERRA statement
        { $$ = new Funcion($2, $5, [], @1.first_line, @1.first_column); }
    | FUNCTION IDENTIFICADOR PAR_ABRE parametros PAR_CIERRA statement
        { $$ = new Funcion($2, $6, $4, @1.first_line, @1.first_column); }
;

parametros
    : parametros COMA IDENTIFICADOR
        { $1.push($3); $$ =$1 }
    | IDENTIFICADOR
        { $$ = [$1] }
;

llamadaFuncion
    : IDENTIFICADOR PAR_ABRE PAR_CIERRA
        { $$ = new LlamadaFuncion($1, [], @1.first_line, @1.first_column); }
    | IDENTIFICADOR PAR_ABRE ListaExpr PAR_CIERRA
        { $$ = new LlamadaFuncion($1, $3, @1.first_line, @1.first_column); }
;

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
    | expresion AND expresion           {  }
    | expresion OR expresion            {  }
    | expresion NOT expresion           {  }
    //Literales
    | CADENA                            { $$ = new Literal($1, TipoLiteral.CADENA, @1.first_line, @1.first_column) }
    | ENTERO                            { $$ = new Literal($1, TipoLiteral.ENTERO, @1.first_line, @1.first_column) }
    | DECIMAL                           { $$ = new Literal($1, TipoLiteral.DOBLE, @1.first_line, @1.first_column) }
    | TRUE                              { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | FALSE                             { $$ = new Literal($1, TipoLiteral.BOOLEAN, @1.first_line, @1.first_column) }
    | CARACTER                          { $$ = new Literal($1, TipoLiteral.CARACTER, @1.first_line, @1.first_column) }
    //Acceso a variables declaradas
    | IDENTIFICADOR                     { $$ = new Acceso($1.toLowerCase(), @1.first_line, @1.first_column) }
    | expresion QUESTION expresion DOS_PUNTOS expresion PUNTO_Y_COMA { $$ = new IF($1, $3, $5, @1.first_line, @1.first_column) }
;

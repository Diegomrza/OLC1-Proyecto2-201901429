"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammar_1 = __importDefault(require("./Grammar/grammar")); //Importe del parser
const express_1 = __importDefault(require("express")); //Importe de express
const cors_1 = __importDefault(require("cors"));
const Ambito_1 = require("./Extra/Ambito");
const Singleton_1 = require("./Patrones/Singleton");
const Error_1 = require("./Error/Error");
const LlamadaFuncion_1 = require("./Funcion/LlamadaFuncion");
const Funcion_1 = require("./Funcion/Funcion");
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
const PORT = 4000;
app.post('/', (req, res) => {
    const exp = req.body.value;
    const ambito = new Ambito_1.Ambito(null, '-'); //Ambito global
    const consola = new Singleton_1.Singleton();
    let result; //Aquí se almacena el resultado del parser
    try {
        result = grammar_1.default.parse(exp);
    }
    catch (e) {
        Object.keys(e).forEach((key) => {
            consola.pushError(new Error_1.Error_(e[key].loc.first_line, e[key].loc.first_column, "Sintáctico", `Se esperaba: ${e[key].expected}; se tiene: ${e[key].token}`));
        });
    }
    //Primera pasada para registrar funciones
    try {
        for (const resp of result) {
            if (resp instanceof Funcion_1.Funcion) {
                resp.execute(ambito);
            }
        }
    }
    catch (e) {
        consola.pushError(e);
    }
    //Segunda pasada para ejecutar el resto de instrucciones
    try {
        for (const res1 of result) {
            if (!(res1 instanceof Funcion_1.Funcion) && !(res1 instanceof LlamadaFuncion_1.LlamadaFuncion)) {
                res1.execute(ambito);
            }
        }
    }
    catch (e) {
        consola.pushError(e);
    }
    let objeto = {
        "message": "Success",
        "result": result,
        "lista": consola.listaPrint,
        "errores": consola.listaErrores
    };
    /*
    function grafoJS(cadena, carpeta) {
        console.log(cadena);
        let nombreGrafo = carpeta + "grafo";
        let path = carpeta + "grafo" + ".png";

        let fs = require('fs');
        fs.mkdirSync('./grafo/', { recursive: true });
        fs.mkdirSync('./reportes/', { recursive: true });
        try {
            fs.writeFileSync(nombreGrafo + ".dot", cadena);
            console.log('Archivo dot creado con exito');
        } catch (e) {
            console.log("Cannot write file ", e);
        }
        try {
            exec("dot -Tpng -o " + path + " " + nombreGrafo + ".dot");
            console.log('Archivo svg creado con exito');
        } catch (e) {
            console.log("Error", e);
        }

    }

    //Creacion del reporte de errores
    if (consola.listaErrores.length != 0) {
        let contadorErrores = 1;
        let cadenaErrores = `digraph G {
            label="Tabla de errores"
            node[shape=box]
           a0 [label=<
           <TABLE border="1" >
            <TR>
            <TD border="3" >#</TD>
            <TD border="3">Tipo</TD>
            <TD border="3">Descripcion</TD>
            <TD border="3">Linea</TD>
            <TD border="3">Columna</TD>
            </TR>`;
        for (const i of consola.listaErrores) {
            cadenaErrores += `<TR>
            <TD>
                
                ${contadorErrores}
               
            </TD>
            <TD>
                
                ${i.tipo}
               
            </TD>
            <TD>
               
                ${i.mensaje}
                
            </TD>
            <TD>
                
                ${i.line}
                
            </TD>
            <TD>
                ${i.column}
            </TD>
        </TR>`
            contadorErrores++;
        }
        cadenaErrores += `</TABLE>>];
    }`
        console.log(cadenaErrores)
        grafoJS(cadenaErrores, "../olc1-proyecto2-201901429/src/errores/");
    }

    //Creacion tabla de simbolos
    let cadenaTabla = `digraph G {
        label="Tabla de simbolos"
        node[shape=box]
       a0 [label=<
       <TABLE border="1" >
        <TR>
        <TD border="3" >#</TD>
        <TD border="3">id</TD>
        <TD border="3">Tipo</TD>
        <TD border="3">Tipo Estructura</TD>
        <TD border="3">entorno</TD>
        </TR>`;
    let contadorTabla = 1;
    for (let i of consola.tabla.values()) {
        cadenaTabla += `<TR>
        <TD>
            ${contadorTabla}
        </TD>
        <TD>
            ${i.id}
        </TD>
        <TD>
            ${i.tipo}
        </TD>
        <TD>
            ${i.tipoDato}
        </TD>
        <TD>
            ${i.entorno}
        </TD>
    </TR>`;
        contadorTabla++;
    }
    cadenaTabla += '</TABLE>>]; }';
    grafoJS(cadenaTabla, '../olc1-proyecto2-201901429/src/reportes/');
    
    */
    console.log(result);
    consola.clearTabla();
    consola.clear();
    consola.clearErrores();
    return res.send(objeto);
});
app.listen(PORT, () => console.log('server running on port: ' + PORT));

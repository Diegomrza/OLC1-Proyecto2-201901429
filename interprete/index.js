const parser = require('./Grammar/grammar')         //Importe del parser
const express = require('express')                  //Importe de express
const cors = require('cors');                       //Importe de politicas cors
const { Ambito } = require('./Extra/Ambito');       //Importe para el ambito global
const { Singleton } = require('./Singleton');
const { Error_ } = require('./Error/Error');
const { LlamadaFuncion } = require('./Funcion/LlamadaFuncion');
const { Funcion } = require('./Funcion/Funcion');
const { Run } = require('./Funcion/Run');
const fs = require('fs');

const app = express();

app.use(express.json(), cors());
const PORT = 4000;

app.post('/', (req, res) => {
    const exp = req.body.value;

    console.log("\n----------------------------------------------------------------------------------------------------------------------");

    console.log("Entrada: ", exp);

    console.log("----------------------------------------------------------------------------------------------------------------------\n");

    const ambito = new Ambito(null);    //Ambito global
    const consola = new Singleton();
    let result;                    //Aquí se almacena el resultado del parser

    try {
        result = parser.parse(exp);
    } catch (e) {
        consola.pushError(new Error_(Object.values(e)[0].loc.first_line, Object.values(e)[0].loc.first_column, "Sintáctico", `Se esperaba: ${Object.values(e)[0].expected}, se tiene: ${Object.values(e)[0].token}`));
    }

    //Primera pasada
    try {
        for (const resp of result) {
            if (resp instanceof Funcion) {
                resp.execute(ambito);
            }
        }
    } catch (e) {
        consola.pushError(e);
    }

    //Segunda pasada
    try {
        for (const res1 of result) {
            if (!(res1 instanceof Funcion) && !(res1 instanceof LlamadaFuncion)) {
                res1.execute(ambito);
            }
        }
    } catch (e) {
        consola.pushError(e);
    }

    let objeto = {
        "message": "Success",
        "result": result,
        "lista": consola.listaPrint,
        "errores": consola.listaErrores
    };

    //Errores


    if (consola.listaErrores.length != 0) {
        let contadorErrores = 1;
        let cadenaErrores = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Errores</title>
        <style>
            td {
                width: 150px;
            }
    
            .Titulos {
                text-align: center;
                font-size: x-large;
                font-family: fantasy;
            }
    
            .noTitulos {
                text-align: center;
            }
        </style>
    </head>
    
    <body>
        <div>
        <table style="margin: 0 auto;" border="1">
            <tr>
                <td>
                    <p class="Titulos">#</p>
                </td>
                <td>
                    <p class="Titulos">Tipo de error</p>
                </td>
                <td>
                    <p class="Titulos">Descripción</p>
                </td>
                <td>
                    <p class="Titulos">Línea</p>

                </td>
                <td>
                    <p class="Titulos">Columna</p>

                </td>
            </tr>
        `;
        for (const i of consola.listaErrores) {
            cadenaErrores += `<tr>
            <td>
                <p class="noTitulos">
                    ${contadorErrores}
                </p>
            </td>
            <td>
                <p class="noTitulos">
                    ${i.tipo}
                </p>
            </td>
            <td>
                <p class="noTitulos">
                    ${i.mensaje}
                </p>
            </td>
            <td>
                <p class="noTitulos">
                    ${i.line}
                </p>
            </td>
            <td>
                <p class="noTitulos">
                    ${i.column}
                </p>
            </td>
        </tr>`
            contadorErrores++;
        }
        cadenaErrores += `</table>
        </div>
    
    
    </body>
    
    </html>`
        try {
            fs.writeFileSync('Errores.html', cadenaErrores);
        } catch (e) {
            console.log(e)
        }
    }

    consola.clear();
    consola.clearErrores();
    return res.send(objeto);
});
app.listen(PORT, () => console.log('server running on port: ' + PORT));

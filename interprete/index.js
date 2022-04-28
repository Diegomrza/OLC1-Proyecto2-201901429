const parser = require('./Grammar/grammar')         //Importe del parser
const express = require('express')                  //Importe de express
const cors = require('cors');                       //Importe de politicas cors
const { Ambito } = require('./Extra/Ambito');       //Importe para el ambito global
const { Singleton } = require('./Singleton');
const { Error_ } = require('./Error/Error');
const { LlamadaFuncion } = require('./Funcion/LlamadaFuncion');
const { Funcion } = require('./Funcion/Funcion');
const { Run } = require('./Funcion/Run');

const app = express();

app.use(express.json(), cors());
const PORT = 4000;

app.post('/', (req, res) => {
    const exp = req.body.value;

    console.log("\n-----------------------------------");

    console.log("Entrada: ", exp);

    console.log("-----------------------------------\n");

    const ambito = new Ambito(null);    //Ambito global
    const consola = new Singleton();
    let result;                    //Aquí se almacena el resultado del parser

    try {
        result = parser.parse(exp);
        console.log("Resultado:\n", result, "\nFin resultado.");
    } catch (e) {
        console.log(e)
        consola.pushError(new Error_(Object.values(e)[0].loc.first_line, Object.values(e)[0].loc.first_column, "Sintáctico", `Se esperaba: ${Object.values(e)[0].expected}, se tiene: ${Object.values(e)[0].token}`));
    }

    //Primera pasada
    try {
        for (const res of result) {
            if (res instanceof Funcion) {
                res.execute(ambito);
            } 
        }
    } catch (e) {
        consola.pushError(e);
    }

    //Segunda pasada
    try {
        for (const res1 of result) {
            if (!(res1 instanceof Funcion)) {
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

    console.log(consola.listaPrint);
    console.log(consola.listaErrores);
    consola.clear();
    consola.clearErrores();
    return res.send(objeto);
});
app.listen(PORT, () => console.log('server running on port: ' + PORT));

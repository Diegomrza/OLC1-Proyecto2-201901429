const parser = require('./Grammar/grammar')         //Importe del parser
const express = require('express')                  //Importe de express
const cors = require('cors');                       //Importe de politicas cors
const { Ambito } = require('./Extra/Ambito');       //Importe para el ambito global

const app = express();

app.use(express.json(), cors());
const PORT = 4000;

app.post('/', (req, res) => {
    const exp = req.body.value;

    console.log("\n-----------------------------------");

    console.log("Entrada: ", exp);

    console.log("-----------------------------------\n");

    const ambito = new Ambito(null);    //Ambito global
    let result = "";                    //Aquí se almacena el resultado del parser
    let lista = [];                     //Lista en donde se almacenan las salidas del código

    try{
        result = parser.parse(exp);
        console.log("Resultado:\n",result,"\nFin resultado.");
        for (const res of result) {
            
            let aux = res.execute(ambito);
            if (aux != undefined) lista.push(aux);
        }
        
    } catch (e) {
        console.log(e)
        return res.send({
            "message":"Failed",
            "result":"Error al intentar analizar el código.",
            "error":e
        });
    }

    let objeto = {
        "message":"Success",
        "result": result,
        "lista": lista
    };
    
    return res.send(objeto);
});
app.listen(PORT, ()=> console.log('server running on port: ' + PORT));

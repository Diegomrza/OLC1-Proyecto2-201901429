import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import './App.css';

import Imagenes from './components/Imagenes.jsx';

function App() {
    const [entrada, setEntrada] = useState('');
    const [resultado, setResultado] = useState('');

    const handlePostData = () => {
        postData();
    };

    async function postData() {
        const options = {
            method: 'POST',
            body: JSON.stringify({ value: entrada }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('http://localhost:4000/', options);
        const data = await response.json();
        console.log(data);
        if (data.message == 'Success') {
            let texto = "";

            if (data.errores.length !== 0) {
                texto = data.errores
                    .map(error => `${error.tipo}: ${error.mensaje} Linea: ${error.line} Columna: ${error.column}`)
                    .join('\n');
            } else {
                texto = data.lista
                    .flatMap(item => item) // Aplanar la lista
                    .join('');
            }

            setResultado(texto);
        } else {
            setResultado(data.result);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        var allowedExtension = /\.olc1$/i;
        if (!allowedExtension.exec(file.name)) {
            alert('El archivo seleccionado no es un archivo de comandos');
            e.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            setEntrada(event.target.result);
        };
        if (file) {
            reader.readAsText(file);
        }
    };

    return (
        <>
            <div className='div-entrada-salida'>
                <div className='editor-comandos'>
                    <label style={{ fontSize: "2em" }}>Entrada</label>
                    <Editor
                        height="80%"
                        width="90%"
                        defaultLanguage="java"
                        value={entrada}
                        onChange={(value) => setEntrada(value)}
                        options={{ autoIndent: "full", minimap: true }}
                        theme="vs-dark"
                    />
                </div>

                <div className='consola-comandos'>
                    <label style={{ fontSize: "2em" }}>Salida</label>
                    <Editor
                        height="80%"
                        width="90%"
                        options={{ readOnly: true, autoIndent: "full", minimap: true }}
                        defaultLanguage="java"
                        value={resultado}
                        theme="vs-dark"
                    />
                </div>
            </div>

            <div className="div-acciones">
                <div className='botones-comandos'>
                    <input
                        accept=".olc1"
                        onChange={handleFileChange}
                        className="input-comando"
                        type="file"
                        value=""
                    />

                    {/* <button
                    >Guardar archivo</button>

                    <button
                    >Crear archivo</button> */}

                </div>
                <button onClick={handlePostData}>Ejecutar</button>
                <div className='imagenes-comandos'>
                    <Imagenes />
                </div>
            </div>

        </>
    );
};

export default App;

// fetch('http://localhost:4000/', {
//     method: 'POST',
//     body: JSON.stringify({ value: entrada }),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }).then(res => res.json())
//     .catch(err => {
//         console.error('Error:', err)
//         window.alert("ocurrio un error, ver consola")
//     })
//     .then(response => {
//         console.log("Respuesta: ", response);
//         if (response.message == "Success") {
//             let texto = "";
//             if (response.errores.length !== 0) {
//                 texto = response.errores
//                     .map(error => `${error.tipo}: ${error.mensaje} Linea: ${error.line} Columna: ${error.column}`)
//                     .join('\n');
//             } else {
//                 texto = response.lista
//                     .flatMap(item => item) // Aplanar la lista
//                     .join('');
//             }
//             setResultado(texto);
//         } else {
//             setResultado(response.result);
//         }
//     });
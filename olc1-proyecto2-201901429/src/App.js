import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import './App.css';

export function App() {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        if (editorRef.current.getValue() == '') {
            window.alert("Ingrese una entrada. c:");
        } else {
            let objeto = { value: editorRef.current.getValue() }
            fetch('http://localhost:4000/', {
                method: 'POST',
                body: JSON.stringify(objeto),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(err => {
                    console.error('Error', err)
                    window.alert("ocurrio un error, ver consola")
                })
                .then(response => {
                    console.log("Respuesta: ", response);
                    if (response.message == "Success") {
                        let consola = document.getElementById('consola');
                        let texto = "";
                        if (response.errores.length != 0) {
                            for (const i of response.errores) {
                                texto += i.tipo + ": " + i.mensaje;
                            }
                        } else {
                            for (const i of response.lista) {
                                for (const j of i) {
                                    texto += j;
                                }
                            }
                        }
                        consola.innerHTML = texto;
                    } else { //Error
                        let consola = document.getElementById('consola');
                        consola.innerText = response.result;
                    }
                })
        }

    }
    return (
        <div className='min-h-screen min-w-full  flex justify-center items-center flex-col gap-10'>
            <button onClick={showValue} className="p-2 text-white rounded-xl hover:scale-110 btn" style={{ transition: 'all 2seg', marginLeft: 920, width: 500, backgroundColor: 'rgb(80,80,80)' }}>Ejecutar</button>
            <div className='max-w-[60rem] w-full flex flex-col gap-5'>
                <div className='w-full rounded-xl'>
                    <div className='text-white text-2xl font-bold' style={{ textAlign: 'center', fontSize: 50, marginBottom: 20 }}>Compscript</div>
                    <Editor
                        height="80vh"
                        defaultLanguage="java"
                        defaultValue=""
                        onMount={handleEditorDidMount}
                        className={'rounded-xl'}
                        theme="vs-dark"
                    />
                </div>

            </div>
        </div>
    );
}

export function Consola() {
    return (
        <div className='min-h-screen min-w-full  flex justify-center items-center flex-col gap-10'>
            <div className='w-full rounded-xl' style={{ marginTop: 80 }}>
                <div className='text-white text-2xl font-bold' style={{ textAlign: 'center', fontSize: 50, marginBottom: 20 }}>Consola</div>
                <textarea id='consola' readOnly style={{ width: 870, height: 746, backgroundColor: 'rgb(35, 35, 35)', color: 'white', resize:'none'}}>
                </textarea>
            </div>
        </div>
    );
}

export function Botones() {
    return (
        <div>
            <button className="p-2 text-white rounded-xl hover:scale-110 btn" style={{ backgroundColor: 'rgb(80,80,80)', color: 'white', padding: 5, transition: 'all 2seg', marginLeft: 685, width: 500, marginBottom: 5 }}>Leer archivo</button>
            <button className="p-2 text-white rounded-xl hover:scale-110 btn" style={{ backgroundColor: 'rgb(80,80,80)', color: 'white', padding: 5, transition: 'all 2seg', marginLeft: 685, width: 500, marginBottom: 5 }}>Guardar archivo</button>
            <button className="p-2 text-white rounded-xl hover:scale-110 btn" style={{ backgroundColor: 'rgb(80,80,80)', color: 'white', padding: 5, transition: 'all 2seg', marginLeft: 685, width: 500, marginBottom: 5 }}>Crear archivo</button>
        </div>
    )
}

//export default App;
import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import './App.css';

function App() {

    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {

        let objeto = {
            value: editorRef.current.getValue()
        }

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
                            
                                texto += i.tipo +": "+ i.mensaje;
                            
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


    return (
        <div className='min-h-screen min-w-full bg-gray-500 flex justify-center items-center flex-col gap-10'>
            <div className='text-white text-2xl font-bold'>Compscript</div>
            <div className='max-w-[60rem] w-full flex flex-col gap-5'>
                <button onClick={showValue} className="p-2 bg-black text-white rounded-xl hover:scale-110 btn" style={{ transition: 'all 2seg' }}>Ejecutar</button>
                <div className='w-full rounded-xl'>
                    <Editor
                        height="50vh"
                        defaultLanguage="java"
                        defaultValue=""
                        onMount={handleEditorDidMount}
                        className={'rounded-xl'}
                        theme="vs-dark"
                    />
                </div>
            </div>
            <div>
                <textarea readOnly id="consola" cols="129" rows="10"></textarea>
            </div>
        </div>
    );
}

export default App;
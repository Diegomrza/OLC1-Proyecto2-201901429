import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App, Botones, Consola, Imagenes } from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(< App />);

const root2 = ReactDOM.createRoot(document.getElementById("root2"));
root2.render(< Consola />);

const root3 = ReactDOM.createRoot(document.getElementById("botones"));
root3.render(< Botones />);

const imagen = ReactDOM.createRoot(document.getElementById('imagenes'));
imagen.render(<Imagenes />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

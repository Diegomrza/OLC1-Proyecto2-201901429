import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Switch extends Instruccion {
    constructor(line:number, column:number) {
        super(line, column);
    }

    public execute(ambito: Ambito) {
        
    }
    
}
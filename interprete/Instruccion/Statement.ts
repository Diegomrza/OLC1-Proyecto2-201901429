import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Statement extends Instruccion {
    constructor(private code: Instruccion[], line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const newAmb = new Ambito(ambito)
        let lista = [];
        for (const inst of this.code) {
            try {
                const element = inst.execute(newAmb)

                if (element != null && element != undefined) lista.push(element)

            } catch (error) {
                console.log(error)
            }
        }

        return lista;
    }
}
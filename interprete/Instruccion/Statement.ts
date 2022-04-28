import { Ambito } from "../Extra/Ambito";
import { Singleton } from "../Singleton";
import { Increment_Decrement } from "./Increment_Decrement";
import { Instruccion } from "./Instruccion";

export class Statement extends Instruccion {
    constructor(private code: Instruccion[], line: number, column: number) {
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const newAmb = new Ambito(ambito);
        for (const inst of this.code) {
            try {
                const element = inst.execute(newAmb)
                if (element != null && element != undefined) {
                    if (element.type == "Return" || element.type == "Continue" || element.type == "Break") {
                        return element
                    }
                }
            } catch (error) {
                new Singleton().pushError(error);
            }
        }
    }

    public grafo(): string {
        return "";
    }
}
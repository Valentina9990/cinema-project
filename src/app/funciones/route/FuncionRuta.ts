import { Router } from "express";
import funcionControlador from "../controller/FuncionControlador";

class FuncionRuta {
    public apiRutaFuncion: Router;

    constructor(){
        this.apiRutaFuncion = Router();
        this.apiRutaFuncion.get("/", funcionControlador.getAll);
        this.apiRutaFuncion.post("/", funcionControlador.add);
        this.apiRutaFuncion.delete("/:idFuncion", funcionControlador.delete);
        this.apiRutaFuncion.put("/", funcionControlador.update);
    }
}

const funcionRuta = new FuncionRuta().apiRutaFuncion;
export default funcionRuta;
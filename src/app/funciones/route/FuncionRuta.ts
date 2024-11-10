import { Router } from "express";
import funcionControlador from "../controller/FuncionControlador";

class FuncionRuta {
    public apiRutaFuncion: Router;

    constructor(){
        this.apiRutaFuncion = Router();
        this.apiRutaFuncion.get("/", funcionControlador.getAll);
        this.apiRutaFuncion.post("/", funcionControlador.add);
        this.apiRutaFuncion.post("/add-multiple", funcionControlador.addMultiple);
        this.apiRutaFuncion.delete("/:idFuncion", funcionControlador.delete);
        this.apiRutaFuncion.put("/", funcionControlador.update);
        this.apiRutaFuncion.put("/update-all-rooms", funcionControlador.updateAllRooms);
        this.apiRutaFuncion.delete("/delete-by-room/:idSala", funcionControlador.deleteByRoom);
    }
}

const funcionRuta = new FuncionRuta().apiRutaFuncion;
export default funcionRuta;
import { Router } from "express";
import comidaControlador from "../controller/comidaControlador";

class ComidaRuta{
    public apiRutaComida: Router;
    constructor(){
        this.apiRutaComida = Router();
        this.apiRutaComida.get("/getall",comidaControlador.dameComida);
        this.apiRutaComida.post("/add",comidaControlador.cogeTuComida);
        this.apiRutaComida.delete("/delete/:idComida",comidaControlador.borrarTuComida);
        this.apiRutaComida.put("/update",comidaControlador.actualizarComida);
        this.apiRutaComida.put("/updateMany",comidaControlador.actualizarMuchasComidas);
        this.apiRutaComida.get("/page", comidaControlador.obtenerComidasPaginadas);
        this.apiRutaComida.get("/get/:idComida",comidaControlador.obtenerComidaPorId);
    }
}

const comidaRuta = new ComidaRuta().apiRutaComida;
export default comidaRuta;  
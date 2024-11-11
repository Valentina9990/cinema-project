import { Router } from "express";
import comidaControlador from "../controller/comidaControlador";
import comida from "../entity/comida";

class ComidaRuta{
    public apiRutaComida: Router;
    constructor(){
        this.apiRutaComida = Router();
        this.apiRutaComida.get("/getall",comidaControlador.dameComida);
        this.apiRutaComida.post("/addFood",comidaControlador.cogeTuComida);
        this.apiRutaComida.delete("/delete/:idComida",comidaControlador.borrarTuComida);
        this.apiRutaComida.put("/update",comidaControlador.actualizaTuComida);
        this.apiRutaComida.get("/page", comidaControlador.obtenerComidasPaginadas);
    }
}

const comidaRuta = new ComidaRuta().apiRutaComida;
export default comidaRuta;
import { Router } from "express";
import comidaControlador from "../controller/comidaControlador";
import comida from "../entity/comida";

class ComidaRuta{
    public apiRutaComida: Router;
    
    constructor(){
        this.apiRutaComida = Router();
        this.apiRutaComida.get("/getall", comidaControlador.obtenerComidas);
        this.misRutas();
    }

    private misRutas():void{
        this.apiRutaComida.get("/getall", comidaControlador.obtenerComidas);
        this.apiRutaComida.post("/add", comidaControlador.crearComida);
        this.apiRutaComida.delete("/delete/:idComida",comidaControlador.eliminarComida);
        this.apiRutaComida.put("/update",comidaControlador.actualizarComida);
        this.apiRutaComida.put("/updateMany",comidaControlador.actualizarMuchasComidas);
        this.apiRutaComida.get("/get/:idComida",comidaControlador.obtenerComidaPorId);
        this.apiRutaComida.get("/getByName", comidaControlador.obtenerComidasPorNombre);
    }
}

const comidaRuta = new ComidaRuta();
export default comidaRuta.apiRutaComida;
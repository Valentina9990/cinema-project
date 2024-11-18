import cineControlador from "../controller/CineControlador";
import { Router } from "express";

class CineRuta{
    public apiRutaCine:Router;

    constructor(){
        this.apiRutaCine = Router();
        this.apiRutaCine.get("/", cineControlador.damecines);
        this.apiRutaCine.post("/", cineControlador.cogeTuSala);
        this.apiRutaCine.delete("/:idCine", cineControlador.borraTuSala);
        this.apiRutaCine.put("/", cineControlador.actualizaTuSala);
        this.apiRutaCine.get("/getPaginados", cineControlador.obtenerCinesPaginados);
    }
   
};

const cineRuta = new CineRuta().apiRutaCine;
export default cineRuta;

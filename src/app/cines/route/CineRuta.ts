import cineControlador from "../controller/CineControlador";
import { Router } from "express";

class CineRuta{
    public apiRutaCine:Router;

    constructor() {
        this.apiRutaCine = Router();
        this.apiRutaCine.get("/", cineControlador.damecines);
        this.apiRutaCine.post("/add", cineControlador.cogeTuCine);
        this.apiRutaCine.delete("/:idCine", cineControlador.borraTuCine);
        this.apiRutaCine.put("/:idCine", cineControlador.modificarCine);
        this.apiRutaCine.get("/getPaginados", cineControlador.obtenerCinesPaginados);
      }
   
};

const cineRuta = new CineRuta().apiRutaCine;
export default cineRuta;

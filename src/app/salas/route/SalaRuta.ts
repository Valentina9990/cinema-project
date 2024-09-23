import { Router } from "express"; 
import salaControlador from "../controller/SalaControlador";

class SalaRuta {
    public apiRutaSala: Router;

    constructor(){
        this.apiRutaSala = Router();
        this.apiRutaSala.get("/getall", salaControlador.dameSalas);
        this.apiRutaSala.post("/addcito", salaControlador.cogeTuSala);
        this.apiRutaSala.delete("/delete/:idSala", salaControlador.borraTuSala);
        this.apiRutaSala.put("/update", salaControlador.actualizaTuSala);
    }

}

const salaRuta = new SalaRuta().apiRutaSala; 
export default salaRuta;
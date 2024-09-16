import { Router } from "express"; 
import salaControlador from "../controller/SalaControlador";

class SalaRuta {
    public apiRutaSala: Router;

    constructor(){
        this.apiRutaSala = Router();
        this.apiRutaSala.get("/getall", salaControlador.dameSalas);
    }

}

const salaRuta = new SalaRuta().apiRutaSala; 
export default salaRuta;
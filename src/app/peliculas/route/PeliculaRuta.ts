import { Router } from "express";
import peliculaControlador from "../controller/PeliculaControlador";


class PeliculaRuta{

    public apiRutaPelicula : Router;

    constructor(){
        this.apiRutaPelicula = Router();
        this.apiRutaPelicula.get("/getall", peliculaControlador.damePeliculas);
        this.apiRutaPelicula.post("/addcito", peliculaControlador.cogeTuPelicula);
    }
}


const peliculaRuta = new PeliculaRuta().apiRutaPelicula;
export default peliculaRuta;
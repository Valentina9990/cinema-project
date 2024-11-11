import { Router } from "express";
import peliculaControlador from "../controller/PeliculaControlador";


class PeliculaRuta{

    public apiRutaPelicula : Router;

    constructor(){
        this.apiRutaPelicula = Router();
        this.apiRutaPelicula.get("/", peliculaControlador.getAllWithShows);
        this.apiRutaPelicula.get("/:idPelicula", peliculaControlador.getById);
        this.apiRutaPelicula.post("/", peliculaControlador.cogeTuPelicula);
        this.apiRutaPelicula.delete("/:idPelicula", peliculaControlador.borraTuPelicula);
        this.apiRutaPelicula.put("/", peliculaControlador.actualizaTuPelicula);
        this.apiRutaPelicula.put("/updateall", peliculaControlador.actualizaTodasLasPeliculas);
    }
}


const peliculaRuta = new PeliculaRuta().apiRutaPelicula;
export default peliculaRuta;
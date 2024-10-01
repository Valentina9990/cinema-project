import { Router } from "express";
import peliculaControlador from "../controller/PeliculaControlador";


class PeliculaRuta{

    public apiRutaPelicula : Router;

    constructor(){
        this.apiRutaPelicula = Router();
        this.apiRutaPelicula.get("/getall", peliculaControlador.damePeliculas);
        this.apiRutaPelicula.get("/paginar", peliculaControlador.paginaPeliculas);
        this.apiRutaPelicula.post("/addcito", peliculaControlador.cogeTuPelicula);
        this.apiRutaPelicula.delete("/delete/:idPelicula", peliculaControlador.borraTuPelicula);
        this.apiRutaPelicula.put("/update", peliculaControlador.actualizaTuPelicula);
        this.apiRutaPelicula.put("/updateall", peliculaControlador.actualizaTodasLasPeliculas);
    }
}


const peliculaRuta = new PeliculaRuta().apiRutaPelicula;
export default peliculaRuta;
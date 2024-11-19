import { Router } from "express";
import peliculaControlador from "../controller/PeliculaControlador";

class PeliculaRuta {
    public apiRutaPelicula: Router;

    constructor() {
        this.apiRutaPelicula = Router();
        
        this.configurarRutas();
    }

    private configurarRutas(): void {
        this.apiRutaPelicula.get("/getall", peliculaControlador.damePeliculas);
        this.apiRutaPelicula.get("/search/:nombrePelicula", peliculaControlador.buscarPelicula);
        this.apiRutaPelicula.get("/", peliculaControlador.getAllWithShows);
        this.apiRutaPelicula.get("/get/:idPelicula", peliculaControlador.getById);
        this.apiRutaPelicula.post("/add", peliculaControlador.cogeTuPelicula);
        this.apiRutaPelicula.delete("/delete/:idPelicula", peliculaControlador.borraTuPelicula);
        this.apiRutaPelicula.put("/update", peliculaControlador.actualizaTuPelicula);
        this.apiRutaPelicula.put("/updateall", peliculaControlador.actualizaTodasLasPeliculas);
    }
}

const peliculaRuta = new PeliculaRuta().apiRutaPelicula;
export default peliculaRuta;
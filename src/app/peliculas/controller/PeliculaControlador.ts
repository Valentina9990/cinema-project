import { Response, Request } from "express";
import Pelicula from "../entity/Pelicula";
import PeliculaDAO from "../dao/PeliculaDAO"

class PeliculaControlador extends PeliculaDAO{

    public damePeliculas(req:Request, res:Response){
        PeliculaDAO.obtenerTodo([], res);
    }
}


const peliculaControlador = new PeliculaControlador();
export default peliculaControlador;
import { Response, Request } from "express";
import Pelicula from "../entity/Pelicula";
import PeliculaDAO from "../dao/PeliculaDAO"
import SalaDAO from "../../salas/dao/SalaDAO";

class PeliculaControlador extends PeliculaDAO{

    public damePeliculas(req:Request, res:Response){
        PeliculaDAO.obtenerTodo([], res);
    }

    public cogeTuPelicula(req:Request, res: Response):void{
        const objPel : Pelicula = new Pelicula(0, "", 0, 0, "");
        objPel.nombrePelicula = req.body.nombrePelicula;
        objPel.idGenero = req.body.idGenero;
        objPel.duracionPelicula = req.body.duracionPelicula;
        objPel.idioma = req.body.idioma;
        PeliculaDAO.grabeloYa(objPel, res);
    }
}


const peliculaControlador = new PeliculaControlador();
export default peliculaControlador;
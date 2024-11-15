import { Request, Response } from "express";
import PeliculaDAO from "../dao/PeliculaDAO";
import Pelicula from "../entity/Pelicula";

class PeliculaControlador extends PeliculaDAO {
    public damePeliculas(req: Request, res: Response) {
        PeliculaDAO.obtenerTodo([], res);
    }

    public cogeTuPelicula(req: Request, res: Response): void {
        const objPel: Pelicula = new Pelicula(0, "", 0, 0, "", "", "");
        objPel.nombrePelicula = req.body.nombrePelicula;
        objPel.idGenero = req.body.idGenero;
        objPel.duracionPelicula = req.body.duracionPelicula;
        objPel.idioma = req.body.idioma;
        PeliculaDAO.grabeloYa(objPel, res);
    }

    public paginaPeliculas(req: Request, res: Response): void {
        const limit = parseInt(req.query.limit as string); 
        const offset = parseInt(req.query.offset as string); 
        PeliculaDAO.ObtenerConPaginacion({ limit, offset }, res);
    }

    public borraTuPelicula(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idGenero))) {
            res.status(400).json({ respuesta: "¿Y el codigo?" });
        } else {
            const codigo = Number(req.params.idPelicula);
            const objCubi: Pelicula = new Pelicula(codigo, "", 0, 0, "", "", "");
            PeliculaDAO.borreloYa(objCubi, res);
        }
    }

    public actualizaTuPelicula(req: Request, res: Response): void {
        const objCubi: Pelicula = new Pelicula(0, "", 0, 0, "", "", "");
        objCubi.idPelicula = req.body.idPelicula;
        objCubi.nombrePelicula = req.body.nombrePelicula;
        objCubi.idGenero = req.body.idGenero;
        objCubi.duracionPelicula = req.body.duracionPelicula;
        objCubi.idioma = req.body.idioma;
        PeliculaDAO.actualiceloYa(objCubi, res);
    }

    public actualizaTodasLasPeliculas(req: Request, res: Response): void {
        const objCubi: Pelicula = new Pelicula(0, "", 0, 0, "", "", "");
        objCubi.idioma = req.body.idioma;
        PeliculaDAO.actualizaTodo(objCubi, res);
    }

    public getAllWithShows(req: Request, res: Response): void {
        const limit = parseInt(req.query.limit as string);
        const offset = parseInt(req.query.offset as string);

        PeliculaDAO.obtenerConFuncionesPaginadas({ limit, offset }, res);
    }

    public getById(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idPelicula))) {
            res.status(400).json({ respuesta: "¿Y el codigo?" });
        } else {
            PeliculaDAO.obtenerPeliculaConFunciones(req.params, res);
        }
    }
}

const peliculaControlador = new PeliculaControlador();
export default peliculaControlador;

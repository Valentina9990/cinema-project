import { Response, Request } from "express";
import menu from "../entity/menu_cine";
import menu_cineDao from "../dao/menu_cineDao";

class menu_cineControlador extends menu_cineDao{

    public dameMenu_cine(req: Request, res: Response){
        menu_cineDao.obtenerTodo([],res);
    }

    public cogeTuMenu(req: Request, res:Response): void{
        const objCubi : menu  = new menu(0,0,0,0,true);
        objCubi.idMenuCine= req.body.idMenuCine;
        objCubi.idComida = req.body.idComida;
        objCubi.idCine = req.body.idCine;
        objCubi.precio = req.body.precio;
        objCubi.disponibilidad = req.body.disponibilidad;
        menu_cineDao.grabeloYa(objCubi,res);
    }


    public borrarTuComida(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idMenuCine))) {
            res.status(400).json({ respuesta: "y el código mi vale?" });
        } else {
            const codiguito = Number(req.params.idMenuCine);
    
            const objCubi: menu = new menu(codiguito,0,0,0,true); 
                menu_cineDao.borreloYa(objCubi, res);
        }
    }

    public actualizaTuMenu(req: Request, res: Response): void {
        const nuevoPrecio = req.body.precio;    
        menu_cineDao.actualizaloYa(nuevoPrecio, res);
    }
    
    public obtenerMenuPaginadas(req: Request, res: Response): void {
        const limit = Number(req.query.limit) || 10;  // canditad de filas a mostras
        const offset = Number(req.query.offset) || 0; // desde que fila empezar
    
        menu_cineDao.MenuPaginadas(limit, offset, res);
    }



}

const menu_CineControlador = new menu_cineControlador ();
export default menu_CineControlador ;
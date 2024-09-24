import { Request, Response } from "express";
import FuncionDAO from "../dao/FuncionDAO";
import Funcion from "../entity/Funcion";

class FuncionControlador extends FuncionDAO{
    public getAll(req:Request, res:Response) {
        FuncionDAO.getAll([], res);
    }

    public add(req: Request, res: Response): void {
        const obj: Funcion = new Funcion(0,0,0,"","");
        obj.idSala = Number(req.body.id_sala);
        obj.idPelicula = Number(req.body.id_pelicula);
        obj.fechaFuncion = req.body.fecha_funcion;
        obj.horaInicioFuncion = req.body.hora_inicio_funcion;
        FuncionDAO.add(obj, res);
    }

    public delete(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idFuncion))){
            res.status(400).json({response: "Falta el id"});
        }else{
            const id = Number(req.params.idFuncion);
            const obj: Funcion = new Funcion(id,0,0,"","");
            FuncionDAO.delete(obj,res);
        }
    }

    public update(req: Request, res: Response): void {
        const obj: Funcion = new Funcion(0,0,0,"","");
        obj.idFuncion = Number(req.body.id_funcion);
        obj.idSala = Number(req.body.id_sala);
        obj.idPelicula = Number(req.body.id_pelicula);
        obj.fechaFuncion = req.body.fecha_funcion;
        obj.horaInicioFuncion = req.body.hora_inicio_funcion;
        FuncionDAO.update(obj, res);
    }
}

const funcionControlador = new FuncionControlador();
export default funcionControlador;
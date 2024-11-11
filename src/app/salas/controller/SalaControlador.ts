import { Response, Request, json } from "express";
import SalaDao from "../dao/SalaDAO";
import Sala from "../entity/Sala";

class SalaControlador extends SalaDao {
  
  public dameSalas(req: Request, res: Response) {
    SalaDao.obtenerTodo([], res);
  }

  public cogeTuSala(req: Request, res: Response): void {
    const objCubi: Sala = new Sala(0, "", 0, 0, 0);
    objCubi.idSala = req.body.idSala;
    objCubi.nombreSala = req.body.nombreSala;
    objCubi.capacidad = req.body.capacidad;
    objCubi.idCine = req.body.idCine;
    objCubi.idTipoSala = req.body.idTipoSala;
    SalaDao.grabeloYa(objCubi, res);
  }

  public borrarTuSala(req: Request, res:Response): void{
    if(isNaN(Number(req.params.idSala))){
        res.status(400).json({respuesta: "y el codigo mi vale?"});
    }else{
        const codiguito = Number(req.params.idSala);
        const objCubi : Sala = new Sala(codiguito,"",0,0,0);
        SalaDao.borreloYa(objCubi,res);
    }
  }

  public actualizaTuSala(req: Request, res: Response): void {
    const objCubi: Sala = new Sala(0,"",0,0,0);
    objCubi.idSala = req.body.idSala;
    objCubi.nombreSala = req.body.nombreSala;
    objCubi.capacidad= req.body.capacidad;
    objCubi.idCine = req.body.idCine;
    objCubi.idTipoSala = req.body.idTipoSala;
    SalaDao.actualiceloYa(objCubi, res);
}


}

const salaControlador = new SalaControlador();
export default salaControlador;

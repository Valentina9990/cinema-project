import { Response, Request } from "express";
import SalaDAO from "../dao/SalaDAO";
import Sala from "../entity/Sala";

class SalaControlador extends SalaDAO{
    public dameSalas(req:Request, res:Response){
        SalaDAO.obtenerTodo([], res);
    }

    public cogeTuSala(req: Request, res: Response): void {
        const objCubi: Sala = new Sala(0,"",0,0,0);
        objCubi.nombreSala = req.body.nombre_sala;
        objCubi.capacidadSala= req.body.sala_capacidad;
        objCubi.idCine = req.body.id_cine;
        objCubi.tipoSala = req.body.id_tipo_sala;
        SalaDAO.grabeloYa(objCubi, res);
    }

    public borraTuSala(req: Request, res: Response): void {
        if(isNaN(Number(req.params.idSala))){
            res.status(400).json({respuesta: "Y el codigo?"});
        }else{
            const codigo = Number(req.params.idSala);
            const objCubi: Sala = new Sala(codigo,"",0,0,0);
            SalaDAO.borreloYa(objCubi,res);
        }
    }

    public actualizaTuSala(req: Request, res: Response): void {
        const objCubi: Sala = new Sala(0,"",0,0,0);
        objCubi.idSala = Number(req.body.id_sala)
        objCubi.nombreSala = String(req.body.nombre_sala);
        objCubi.capacidadSala= Number(req.body.sala_capacidad);
        objCubi.idCine =  Number(req.body.id_cine);
        objCubi.tipoSala = Number(req.body.id_tipo_sala);
        SalaDAO.actualiceloYa(objCubi, res);
    }
    
}


const salaControlador = new SalaControlador();
export default salaControlador;

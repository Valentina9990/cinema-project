import { Response, Request } from "express";
import Cine from "../entity/Cine";
import CineDAO from "../dao/CineDAO";

class CineControlador extends CineDAO {
  public damecines(req: Request, res: Response) {
    const { limit = 100, offset = 0 } = req.query;
    const params = [Number(limit), Number(offset)];
    CineDAO.obtenerTodo(params, res);
  }

  public obtenerCinesPaginados(req: Request, res: Response): void {
    const limit = Number(req.query.limit) || 10;    public damecines(req: Request, res: Response){
        const { limit = 100, offset = 0 } = req.query;
        const params = [Number(limit), Number(offset)];

        CineDAO.obtenerTodo(params,res);
    }

    public obtenerCinesPaginados(req: Request, res: Response): void {
        const limit = Number(req.query.limit) || 10;  // canditad de filas a mostras
        const offset = Number(req.query.offset) || 0; // desde que fila empezar
    
        CineDAO.obtenerCinesPaginados(limit, offset, res);
    }


    public cogeTuSala(req: Request, res: Response): void{
        const objCubi: Cine = new Cine(0,"",0,"");
        objCubi.idCine = req.body.idCine;
        objCubi.telefonoCine = req.body.telefonoCine;
        objCubi.idUbicacion = req.body.idUbicacion;
        objCubi.nombreCine = req.body.nombreCine;
        CineDAO.grabaloYa(objCubi, res);
    }

    public borraTuSala(req: Request, res: Response): void{
        if(isNaN(Number(req.params.idCine))){
            res.status(400).json({respuesta: "Y el codigo mano?"});
        }else{
            const codiguito = Number(req.params.idCine);
            const objCubi: Cine = new Cine(codiguito, "", 0 , "");
            CineDAO.borreloYa(objCubi, res);
        }
    }

    public actualizaTuSala(req: Request, res: Response): void{
        const objCubi: Cine = new Cine(0,"",0,"");
        objCubi.idUbicacion = Number(req.body.idUbicacion);
        objCubi.nombreCine = String(req.body.nombreCine);
        objCubi.telefonoCine = String(req.body.telefonoCine);
        const patron = String(req.body.patron);
        CineDAO.actualizaloYa(patron, objCubi, res);
    }

};

const cineControlador  = new CineControlador();
export default cineControlador;

    const offset = Number(req.query.offset) || 0;
    CineDAO.obtenerCinesPaginados(limit, offset, res);
  }

  public cogeTuCine(req: Request, res: Response): void {
    const objCubi: Cine = new Cine(0, req.body.idUbicacion, req.body.nombreCine,  req.body.telefonoCine);
    CineDAO.grabaloYa(objCubi, res);
  }

  public borraTuCine(req: Request, res: Response): void {
    const idCine = Number(req.params.idCine);
    if (isNaN(idCine)) {
      res.status(400).json({ respuesta: "ID inválido" });
      return; // Terminas la ejecución sin devolver un valor
    }
    CineDAO.borreloYa(idCine, res);
  }
  

  public async modificarCine(req: Request, res: Response): Promise<void> {
    const idCine = Number(req.params.idCine);
    const { nombreCine, telefonoCine, idUbicacion } = req.body; // Asegurándote de obtener `idUbicacion`
  
    
    const cineModificado: Cine = {
      idCine,
      nombreCine,
      telefonoCine,
      idUbicacion // Añadiendo idUbicacion
    };
  
    try {
      // Llamar al DAO para actualizar el cine
      await CineDAO.modificarCine(cineModificado, res);
    } catch (error) {
      res.status(400).json({ respuesta: "Error al actualizar el cine" });
    }
  }
  
  
  
  
}

const cineControlador = new CineControlador();
export default cineControlador;

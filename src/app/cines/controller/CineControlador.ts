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
    const limit = Number(req.query.limit) || 10;
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
    const { nombreCine, telefonoCine, idUbicacion } = req.body; 
  
    
    const cineModificado: Cine = {
      idCine,
      nombreCine,
      telefonoCine,
      idUbicacion 
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

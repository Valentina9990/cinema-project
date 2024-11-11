import { Response, Request } from "express";
import comida from "../entity/comida";
import comidaDao from "../dao/comidaDao";


class ComidaControlador extends comidaDao{

    public dameComida(req:Request, res:Response){
        comidaDao.obtenerTodo([],res);
    }

    public cogeTuComida(req:Request, res:Response): void{
        const objCubi : comida = new comida(0,"");
        objCubi.idComida= req.body.idComida;
        objCubi.nombreComida = req.body.nombreComida;
        comidaDao.grabeloYa(objCubi,res);
    }

    public borrarTuComida(req: Request, res: Response): void {
        // Validar si el parámetro idComida es un número
        if (isNaN(Number(req.params.idComida))) {
            res.status(400).json({ respuesta: "y el código mi vale?" });
        } else {
            // Obtener el idComida del request params
            const codiguito = Number(req.params.idComida);
    
            // Crear un objeto comida con el idComida correcto
            const objCubi: comida = new comida(codiguito, ""); // El nombre se puede dejar vacío, solo interesa el ID
    
            // Llamar al método para eliminar la comida
            comidaDao.borreloYa(objCubi, res);
        }
    }
    public actualizaTuComida(req: Request, res: Response) {
        const nuevoNombre = req.body.nombre_comida;
    
        if (!nuevoNombre) {
            return res.status(400).json({ error: "El nombre de la comida no puede ser nulo o vacío" });
        }
    
        comidaDao.actualizaloYa(nuevoNombre, res);
    }
    
    
    public obtenerComidasPaginadas(req: Request, res: Response): void {
        const limit = Number(req.query.limit) || 10;  // canditad de filas a mostras
        const offset = Number(req.query.offset) || 0; // desde que fila empezar
    
        comidaDao.obtenerComidasPaginadas(limit, offset, res);
    }
    



}
const comidaControlador = new ComidaControlador ();
export default comidaControlador;
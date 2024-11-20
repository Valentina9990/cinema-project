import { Response, Request } from "express";
import comida from "../entity/comida";
import comidaDao from "../dao/comidaDao";


class ComidaControlador extends comidaDao{

    public dameComida(req:Request, res:Response){
        comidaDao.obtenerTodo([],res);
    }

    public cogeTuComida(req:Request, res:Response): void{
        const objComida : comida = new comida(0,"",0);
        objComida.nombreComida = req.body.nombreComida;
        objComida.precioComida = req.body.precioComida;
        comidaDao.saveOne(objComida,res);
    }

    public borrarTuComida(req: Request, res: Response): void {
        if (isNaN(Number(req.params.idComida))) {
            res.status(400).json({ respuesta: "y el código mi vale?" });
        } else {
            const codiguito = Number(req.params.idComida);
            const objComida: comida = new comida(codiguito, "",0);
            comidaDao.borreloYa(objComida, res);
        }
    }

    public actualizarComida(req: Request, res: Response){
        if(isNaN(Number(req.body.idComida))){
            res.status(400).json({respouesta: "Codigo de entrada invalido"});
        }
        else{
            const num = Number(req.body.idComida);
            const objComida: comida = new comida(num,req.body.nombreComida,req.body.precioComida);
            comidaDao.actualizarUno(objComida, res)
        }   
    }
    public actualizarMuchasComidas(req: Request, res: Response){
        const objComida: comida = new comida(0,req.body.nombreComida,req.body.precioComida);
        comidaDao.actualizarMuchos(objComida, res);
    }
    
    public obtenerComidasPaginadas(req: Request, res: Response): void {
        const limit = Number(req.query.limit) || 10;  // canditad de filas a mostras
        const offset = Number(req.query.offset) || 0; // desde que fila empezar a mostrar
        comidaDao.obtenerComidasPaginadas(limit, offset, res);
    }
    
    public obtenerComidaPorId(req:Request, res:Response){
        if(isNaN(Number(req.params.idComida))){
            res.status(400).json({respouesta: "Codigo de entrada invalido"});
        }
        else{
            const num = Number(req.params.idComida);
            const objComida: comida = new comida(num,"",0);
            comidaDao.getOneById(objComida, res);
        }
    }

}
const comidaControlador = new ComidaControlador ();
export default comidaControlador;
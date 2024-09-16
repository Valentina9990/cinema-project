import { Response, Request } from "express";
import SalaDAO from "../dao/SalaDAO";

class SalaControlador extends SalaDAO{
    public dameSalas(req:Request, res:Response){
        SalaDAO.obtenerTodo([], res);

    }
}

//controlador exporta la instancia del objeto
const salaControlador = new SalaControlador();
export default salaControlador;

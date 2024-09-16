import { Response } from "express";
import { SQL_SALAS } from "../repository/sala_sql";
import pool from "../../../config/connection/db-connection";


class SalaDAO{
    protected static async obtenerTodo(params:any, res: Response){
        await pool
        .result(SQL_SALAS.GET_ALL, params)
        .then((resultado)=> {
            res.status(200).json(resultado.rows);
        }) 
        .catch((miError) => {
            console.log(miError);
            res.status(400).json({
                "respuesta": "Error al obtener los datos"
            }); 
        });
    }
}

export default SalaDAO;
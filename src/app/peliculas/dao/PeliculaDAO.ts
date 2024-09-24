import { Response } from "express";
import { SQL_PELICULAS } from "../repository/pelicula_sql";
import pool from "../../../config/connection/db-connection";
import Pelicula from "../entity/Pelicula";


class PeliculaDAO{

    protected static async obtenerTodo(params:any, res:Response){
        await pool
        .result(SQL_PELICULAS.GET_ALL, params)
        .then((resultado)=>{
            res.status(200).json(resultado.rows);
        })
        .catch((miError)=>{
            console.log(miError);
            res.status(400).json({
                respuesta:"Error al obtener datos"
            });
        });
    }



    
}

export default PeliculaDAO;
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


    protected static async grabeloYa(datos: Pelicula, res: Response): Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 2;
            let respuBase :any;
            respuBase = await consulta.one(SQL_PELICULAS.ADD, [
                datos.nombrePelicula,
                datos.idGenero,
                datos.duracionPelicula,
                datos.idioma
            ]);
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1:
                    res.status(400).json({ respuesta: "Ya existe esta pelicula" });
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError:any)=>{
            console.log(miError);
            res.status(400).json({respuesta:"No se puede procesar la solicitud"});
        });
    }

    
}

export default PeliculaDAO;
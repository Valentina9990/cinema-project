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

    protected static async ObtenerConPaginacion(params:any, res:Response){
        const { limit, offset} =params;
        await pool
        .result(SQL_PELICULAS.PAGINACION, [limit, offset])
        .then((resultado)=>{
            res.status(200).json(resultado.rows);
        })
        .catch((miError)=>{
            console.log(miError);
            res.status(400).json({respuesta: "Error al obtener los datos"});
        });
    }


    //Realizar restricción  en el agregar que no permita repetidos, hacer la restricción por nombres
    protected static async grabeloYa(datos: Pelicula, res: Response):Promise<any>{
        await pool.task(async(consulta)=>{
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_PELICULAS.HOW_MANY_NAME, [datos.nombrePelicula]);
            if(cubi.existe==0){
                queHacer=2;
                respuBase = await consulta.one(SQL_PELICULAS.ADD, [datos.nombrePelicula, datos.idGenero, datos.duracionPelicula, datos.idioma]);
            }
            return  {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1:
                    res.status(400).json({respuesta : "Ya existe una pelicula con este mismo nombre"});
                    break;
                default:
                    res.status(200).json(respuBase);
                    break;
            }
        }).catch((miError:any)=>{
            console.log(miError);
            res.status(400).json({respuesta : "No se puede procesar la solicitud"});
        });
    }


    



    protected static async borreloYa(datos: Pelicula, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                const pelicula = await consulta.oneOrNone(SQL_PELICULAS.HOW_MANY_GENERO, [datos.idGenero]);
    
                if (pelicula) {
                    return consulta.result(SQL_PELICULAS.DELETE, [datos.idGenero]);
                } else {
                    return null;
                }
            })
            .then((respuesta) => {
                if (respuesta && respuesta.rowCount > 0) {
                    res.status(200).json({
                        respuesta: "Pelicula eliminada correctamente",
                        info: respuesta.rowCount,
                    });
                } else {
                    res.status(404).json({
                        respuesta: "No se encontró la pelicula o no pertenece al género especificado",
                    });
                }
            })
            .catch((miErrorcito) => {
                if (miErrorcito) {
                    // Error de violación de integridad referencial (ON DELETE RESTRICT)
                    res.status(400).json({
                        respuesta: "No se puede eliminar la película porque está relacionada con otra tabla.",
                    });
                } else {
                    res.status(400).json({
                        respuesta: "Error al intentar eliminar la película",
                        detalle: miErrorcito.message,
                    });
                }
            });
    }
    



    //ACTUALIZAR UN REGISTRO POR ID
    public static async actualiceloYa(datos: Pelicula, res:Response):Promise<any>{
        await pool
        .task(async(consulta)=>{
            let queHacer = 1;
            let respuBase:any;
            const cubi = await consulta.one(SQL_PELICULAS.HOW_MANY, [datos.idPelicula]);
            if(cubi.existe>0){
                queHacer = 2;
                respuBase = await consulta.one(SQL_PELICULAS.UPDATE, [datos.idPelicula, datos.nombrePelicula, datos.idGenero, datos.duracionPelicula, datos.idioma]);
            }
            return {queHacer, respuBase};
        })
        .then(({queHacer, respuBase})=>{
            switch(queHacer){
                case 1:
                    res.status(400).json({respuesta:"No se encontró la pelicula"});
                    break;
                default:
                    res.status(200).json({respuesta: "Se actualizó correctamente la pelicula", respuBase});
                    break;
            }
        })
        .catch((miErrorcito)=>{
            console.log(miErrorcito);
            res.status(400).json({respuesta:"No se puede procesar la solicitud de actualización"});
        });
    }


    //ACTUALIZAR TODOS LOS GENEROS DE LOS REGISTROS POR UNO ESPECIFICO
    public static async actualizaTodo(datos:Pelicula , res: Response):Promise<any>{
        await pool
        .task(async (consulta)=>{
            const respuBase = await consulta.any(SQL_PELICULAS.UPDATE_ALL, [datos.idGenero]);
            return {respuBase};
        })
        .then(({respuBase})=>{
            if(respuBase.length>0){
                res.status(200).json({respuesta: "Los generos de todas las peliculas fueron actualizados"});
            }else{
                res.status(400).json({respuesta:"No se lograron actualizar los generos de las peliculas"});
            }
        })
        .catch((miErrorcito)=>{
            console.log(miErrorcito);
            res.status(400).json({respuesta:"No se puede procesar la solicitud de actualización"});
        });
    }


    
}

export default PeliculaDAO;

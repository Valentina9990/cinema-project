import { Response } from "express";
import { Sql_cines } from "../repository/sql_cine";
import Cine from "../entity/Cine";
import pool from "../../../config/connection/db-connection";

class CineDAO {
    protected static async obtenerTodo(params: any, res: Response){
        try {
            // Primero, obtener el total de usuarios
            const totalQuery = 'SELECT COUNT(*) as total FROM cines';
            const totalResult = await pool.one(totalQuery);
            
            // Luego, obtener los usuarios paginados
            const cines = await pool.result(Sql_cines.GET_ALL, params);
            
            res.status(200).json({
              rows: cines.rows,
              total: parseInt(totalResult.total)
            });
          } catch (error) {
            console.error(error);
            res.status(400).json({
              respuesta: "Error al obtener los cines",
            });
          }
    }


    protected static async obtenerCinesPaginados(limit: number, offset: number, res: Response): Promise<any> {
        await pool
            .any("SELECT * FROM cines ORDER BY nombre_cine LIMIT $1 OFFSET $2", [limit, offset])
            .then((cines) => {
                res.status(200).json(cines);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error al consultar cines paginados"});
    });
}
    protected static async grabaloYa(datos: Cine, res: Response): Promise<any>{
        await pool
            .task(async (consulta) =>{
                let queHacer = 1;
                let respuBase: any;
                const cubi = await consulta.one(Sql_cines.HOW_MANY,[datos.nombreCine]);
                if(cubi.existe == 0){
                    queHacer = 2;
                    respuBase = await consulta.one(Sql_cines.ADD, [
                        datos.idCine,
                        datos.idUbicacion,
                        datos.nombreCine,
                        datos.telefonoCine
                    ]);
                }
                return{queHacer, respuBase};
            })
            .then(({queHacer, respuBase}) =>{
                switch(queHacer){
                    case 1:
                        res.status(400).json({respuesta:"Ya existe el cine con ese nombre"});
                        break;
                    default:
                        res.status(200).json(respuBase);
                }
            })
            .catch((miError: any) =>{
                console.log(miError);
                res.status(400).json({respuesta:"Se jodio mano"});
            });
    }

    protected static async borreloYa(datos: Cine, res: Response): Promise<any>{
        pool
        .task((consulta) => {
            return consulta.result(Sql_cines.DELETE,[datos.idCine]);
        })
        .then((respuesta) => {
            res.status(200).json({
                respuesta: "Lo borre sin miedo",
                info: respuesta.rowCount,
            });
        })
        .catch((miErrocito) =>{
            console.log(miErrocito);
            res.status(400).json({ respuesta: "Pailas, sql totiado"});
        });
    }

    protected static async actualizaloYa(patron:string, datos: Cine, res: Response): Promise<any>{
        pool
            .task(async (consulta) => {
                let respuBase: any;

            
            respuBase = await consulta.none(Sql_cines.UPDATE_MASIVO, [
                datos.idUbicacion,
                datos.nombreCine, 
                datos.telefonoCine,
                
                `${patron}%` 
            ]);

            return respuBase;
        })
        .then(() => {
            
            res.status(200).json({ respuesta: "Salas actualizadas exitosamente" });
        })
        .catch((miErrorcito: any) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Se totió mano" });
        });
    }
}

export default CineDAO;

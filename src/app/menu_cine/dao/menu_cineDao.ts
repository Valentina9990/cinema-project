import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import menu from "../entity/menu_cine";
import { SQL_MENU_CINE } from "../repository/menu_cine_sql";


class menu_cineDao{
    protected static async obtenerTodo(params: any, res: Response){
        await pool
            .result(SQL_MENU_CINE.GET_ALL,params)
            .then((resultado)=>{
                res.status(200).json(resultado.rows);
            })
            .catch((miError)=>{
                console.log(miError);
                res.status(400).json({
                    respuesta: "Error al obtener los datos",
                });
            });
    }

    protected static async grabeloYa(datos: menu, res: Response): Promise<any> {
        await pool
          .task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
            const cubi = await consulta.one(SQL_MENU_CINE.HOW_MANY, [datos.idMenuCine]);
            if (cubi.existe == 0) {
              queHacer = 2;
              respuBase = await consulta.one(SQL_MENU_CINE.ADD, [ datos.idMenuCine,datos.idComida,datos.idCine,datos.precio, datos.disponibilidad]);
            }
            return { queHacer, respuBase };
          })
          .then(({ queHacer, respuBase }) => {
            switch (queHacer) {
              case 1:
                res.status(400).json({ respuesta: "Compita ya existe el menu" });
                break;
              default:
                res.status(200).json(respuBase);
                break;
            }
          })
          .catch((miError: any) => {
            console.log(miError);
            res.status(400).json({ respuesta: "se totió mano" });
          });
    }


    protected static async borreloYa(datos: menu, res: Response): Promise<any> {
        await pool
            .task((consulta) => {
                return consulta.result(SQL_MENU_CINE.DELETE, [datos.idMenuCine]);
            })
            .then((respuesta) => {
                if (respuesta.rowCount > 0) {
                    res.status(200).json({
                        respuesta: "Menu eliminada correctamente",
                        info: respuesta.rowCount,
                    });
                } else {
                    res.status(404).json({
                        respuesta: "No se encontró el menu",
                    });
                }
            })
            .catch((miErrorcito) => {
                console.log(miErrorcito);
                if (miErrorcito.code === '23503') {
                    // Error de violación de integridad referencial (ON DELETE RESTRICT)
                    res.status(400).json({
                        respuesta: "No se puede eliminar el menu porque está relacionada con una reservacion",
                    });
                } else {
                    res.status(400).json({
                        respuesta: "Error al intentar eliminar el menu",
                        detalle: miErrorcito.message,
                    });
                }
            });
  }

  protected static async actualizaloYa(nuevoPrecio: string, res: Response): Promise<any> {
    pool
        .task(async (consulta) => {
            // Actualiza el precio de todos los registros en la tabla Menu_cine
            await consulta.none(SQL_MENU_CINE.UPDATE_MASIVO, [nuevoPrecio]);
        })
        .then(() => {
            res.status(200).json({ respuesta: "Precios actualizados exitosamente" });
        })
        .catch((miErrorcito: any) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Se totió mano" });
        });
    }


    protected static async MenuPaginadas(limit: number, offset: number, res: Response): Promise<any> {
        await pool
            .any(    "SELECT * FROM comidas ORDER BY precio LIMIT 10 OFFSET 0", [limit, offset])
            .then((menu) => {
                res.status(200).json(menu);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error al consultar comidas paginadas" });
            });
    }
    





}
export default menu_cineDao;
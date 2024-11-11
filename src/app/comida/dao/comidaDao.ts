import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import comida from "../entity/comida";
import { SQL_COMIDAS } from "../repository/comida_sql";

class comidaDao{
    protected static async obtenerTodo(params: any, res: Response){
        await pool
            .result(SQL_COMIDAS.GET_ALL,params)
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

    protected static async grabeloYa(datos: comida, res: Response): Promise<any> {
        await pool
          .task(async (consulta) => {
            let queHacer = 1;
            let respuBase: any;
      
            // Verificar si el idComida ya existe
            const cubiId = await consulta.one(SQL_COMIDAS.HOW_MANY, [datos.idComida]);
            if (cubiId.existe == 0) {
              // Verificar si el nombre de la comida ya existe
              const cubiNombre = await consulta.one(SQL_COMIDAS.CHECK_NAME, [datos.nombreComida]);
              if (cubiNombre.existe == 0) {
                queHacer = 2;
                respuBase = await consulta.one(SQL_COMIDAS.ADD, [datos.idComida, datos.nombreComida]);
              } else {
                // Si el nombre de la comida ya existe
                queHacer = 3; 
              }
            }
            return { queHacer, respuBase };
          })
          .then(({ queHacer, respuBase }) => {
            switch (queHacer) {
              case 1:
                res.status(400).json({ respuesta: "Compita ya existe la comida con ese ID" });
                break;
              case 3:
                res.status(400).json({ respuesta: "Compita ya existe una comida con ese nombre" });
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

    protected static async borreloYa(datos: comida, res: Response): Promise<any> {
        await pool
            .task(async (consulta) => {
                const existe = await consulta.one(SQL_COMIDAS.EXITS_IN_MENU,[datos.idComida])
                if(existe != 0){
                  throw new Error("Error al eliminar esta referenciado en la tabla menu")
                }
                return await consulta.result(SQL_COMIDAS.DELETE, [datos.idComida]);
            })
            .then((respuesta) => {
                if (respuesta.rowCount > 0) {
                    res.status(200).json({
                        respuesta: "Comida eliminada correctamente",
                        info: respuesta.rowCount,
                    });
                } else {
                    res.status(404).json({
                        respuesta: "No se encontró la comida",
                    });
                }
            })
            .catch((miErrorcito) => {
                console.log(miErrorcito);
                if (miErrorcito.code === '23503') {
                    // Error de violación de integridad referencial (ON DELETE RESTRICT)
                    res.status(400).json({
                        respuesta: "No se puede eliminar la comida porque está relacionada con un menú de cine.",
                    });
                } else {
                    res.status(400).json({
                        respuesta: "Error al intentar eliminar la comida",
                        detalle: miErrorcito.message,
                    });
                }
            });
  }


  protected static async actualizaloYa(nuevoNombre: string, res: Response): Promise<any> {
    if (!nuevoNombre) {
        return res.status(400).json({ error: "El nombre de la comida no puede ser nulo o vacío" });
    }

    pool
        .task(async (consulta) => {
            await consulta.none(SQL_COMIDAS.UPDATE_MASIVO, [nuevoNombre]);
        })
        .then(() => {
            res.status(200).json({ respuesta: "Nombres actualizados exitosamente" });
        })
        .catch((miErrorcito: any) => {
            console.log(miErrorcito);
            res.status(400).json({ respuesta: "Se totió mano" });
        });
}



  
  protected static async obtenerComidasPaginadas(limit: number, offset: number, res: Response): Promise<any> {
    await pool
        .any("SELECT * FROM comidas ORDER BY nombre_comida LIMIT $1 OFFSET $2", [limit, offset])
        .then((comidas) => {
            res.status(200).json(comidas);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error al consultar comidas paginadas" });
        });


  }


}

export default comidaDao;
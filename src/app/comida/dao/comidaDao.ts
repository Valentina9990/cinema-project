import { Response } from "express";
import pool from "../../../config/connection/db-connection";
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

    protected static async saveOne(params : comida, res: Response): Promise<any>{
      await pool.task (async (response)=>{
          const existe = await response.one(SQL_COMIDAS.HOW_MANY_BY_NAME, [params.nombreComida])
          if(existe.existe >= 1){
              throw new Error("Ya existe una comida con el mismo nombre")
          }
          return await response.one(SQL_COMIDAS.ADD , [params.nombreComida, params.precioComida]);
      })
      .then((response)=>{
          res.status(200).json(response);
      })
      .catch((error)=>{
          console.log(error);
          res.status(400).json({respuestaa: `Error al crear comida : ${error.message}`})  
      })
  }

  protected static async borreloYa(params: comida, res:Response): Promise<any>{
    await pool.task(async (response)=>{
        const existe = await response.one(SQL_COMIDAS.EXITS_IN_MENU, [params.idComida])
        if(existe.existe >= 1){
            throw new Error("La comida esta referenciada en algun menu")
        }
        return response.result(SQL_COMIDAS.DELETE, [params.idComida]);
    })
    .then((response)=>{
        res.status(200).json({respuesta: "La comida se elemino con éxito",
        info: response.rowCount})
    })
    .catch((error)=>{
        console.error(error);
        res.status(400).json({respuesta: `Error al eliminar comida : ${error.message}`})
    })
}

  protected static async actualizarUno(params: comida, res : Response ): Promise<any>{
    await pool.task(async (response)=>{
        const existe = await response.one(SQL_COMIDAS.HOW_MANY, [params.idComida]);
        if(existe.existe == 1){
            return await response.none(SQL_COMIDAS.UPDATE,[params.idComida,params.nombreComida,params.precioComida]);
        }
        else{
            throw new Error("La comida con el codigo suministrado no existe")
        }
    })
    .then((response)=>{
        res.status(200).json({actulizado: "ok, se actualizo la comida"})
    })
    .catch((error)=>{
        console.error(error);
        res.status(400).json({respuesta : `Error al actuaizar comida : ${error.message}`})
    })
  }
  
  protected static async actualizarMuchos(params: comida, res: Response): Promise<any>{
    await pool.task(async (response) => {
        return await response.none(SQL_COMIDAS.UPDATE_MASIVO, ["%"+params.nombreComida+"%",params.precioComida]);
    })
    .then((response)=>{ 
        res.status(200).json({actualizado: "Se actualizaron varias comidas con exito."})
    })
    .catch((error)=>{
        console.error(error);
        res.status(400).json({respuesta: "Error al actualizar varias comidas"})
    })
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

  protected static async getOneById(params:any, res:Response){
    await pool.one(SQL_COMIDAS.GET_ONE_BY_ID,[params.idComida])
    .then((response)=>{ 
        res.status(200).json(response);
        console.log(response)
    })
    .catch((error)=>{
        console.error(error);
        res.status(400).json({respuesta: "Error al obtener información de las comida"})
    })
    }
}

export default comidaDao;
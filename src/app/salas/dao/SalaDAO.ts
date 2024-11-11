import { Response } from "express";
import { SQL_SALAS } from "../repository/sql_sala";
import pool from "../../../config/connection/dbConnection";
import Sala from "../entity/Sala";


class SalaDao {
  protected static async obtenerTodo(params: any, res: Response) {
    await pool
      .result(SQL_SALAS.GET_ALL,params)
      .then((resultado)=>{
        res.status(200).json(resultado.rows);
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({
          respuesta: "ay no sirve",
        });
      }); //pool es la conexion a la bd
  }

  protected static async grabeloYa(datos: Sala, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);
        if (cubi.existe == 0) {
          queHacer = 2;
          respuBase = await consulta.one(SQL_SALAS.ADD, [datos.idSala, datos.nombreSala,datos.idTipoSala,datos.capacidad, datos.idCine]);
        }
        return { queHacer, respuBase };
      })
      .then(({ queHacer, respuBase }) => {
        switch (queHacer) {
          case 1:
            res.status(400).json({ respuesta: "Compita ya existe la sala" });
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
  
  protected static async borreloYa(datos: Sala, res: Response): Promise<any>{
    await pool
      .task((consulta)=>{
        return consulta.result(SQL_SALAS.DELETE, [datos.idSala]);
      })
      .then((respuesta)=>{
        res.status(200).json({
          respuesta: "Lo borre sin miedo",
          info: respuesta.rowCount,
        });
      })
      .catch((miErrorcito)=>{
        console.log(miErrorcito);
        res.status(400).json({respuesta: "Pailas, sql totiado"});
      });

  }

  protected static async actualiceloYa(datos: Sala, res: Response): Promise<any> {
    pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);
        if (cubi.existe == 0) {
          queHacer = 2;
          respuBase = await consulta.none(SQL_SALAS.UPDATE, [datos.idSala, datos.idTipoSala, datos.capacidad,datos.idCine]);
        }
        return { queHacer, respuBase };
      })
      .then(({ queHacer, respuBase }) => {
        switch (queHacer) {
          case 1:
            res.status(400).json({ respuesta: "Compita ya existe" });
            break;
          default:
            res.status(200).json({ actualizado: "ok" });
            break;
        }
      })
      .catch((miErrorcito) => {
        console.log(miErrorcito);
        res.status(400).json({ respuesta: "Pailas, sql totiado" });
      });
  }
  
  
}

export default SalaDao;

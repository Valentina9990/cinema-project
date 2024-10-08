import { Response } from "express";
import { SQL_SALAS } from "../repository/sala_sql";
import pool from "../../../config/connection/db-connection";
import Sala from "../entity/Sala";

class SalaDAO {
  protected static async obtenerTodo(params: any, res: Response) {
    await pool
      .result(SQL_SALAS.GET_ALL, params)
      .then((resultado) => {
        res.status(200).json(resultado.rows);
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({
          respuesta: "Error al obtener los datos",
        });
      });
  }

  protected static async grabeloYa(datos: Sala, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let queHacer = 2;
        let respuBase: any;
        respuBase = await consulta.one(SQL_SALAS.ADD, [
          datos.nombreSala,
          datos.tipoSala,
          datos.capacidadSala,
          datos.idCine
        ]);
        return { queHacer, respuBase };
      })
      .then(({ queHacer, respuBase }) => {
        switch (queHacer) {
          case 1:
            res.status(400).json({ respuesta: "Ya existe la sala" });
            break;
          default:
            res.status(200).json(respuBase);
            break;
        }
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Se totio" });
      });
  }

  protected static async borreloYa(datos: Sala, res: Response): Promise<any> {
    pool
      .task((consulta) => {
        return consulta.result(SQL_SALAS.DELETE, [datos.idSala]);
      })
      .then((respuesta) => {
        res.status(200).json({
          respuesta: "Lo borré sin miedo",
          info: respuesta.rowCount,
        });
      })
      .catch((miErrorcito) => {
        console.log(miErrorcito);
        res.status(400).json({ respuesta: "Pailas, sql totiado" });
      });
  }

  protected static async actualiceloYa(datos: Sala, res: Response) {
    await pool
      .task(async (consulta) => {
        let queHacer = 1;
        let respuBase: any;
        const cubi = await consulta.one(SQL_SALAS.HOW_MANY, [datos.idSala]);

        if (cubi.existe > 0) {
          queHacer = 2;
          respuBase = await consulta.one(SQL_SALAS.UPDATE, [
            datos.nombreSala,
            datos.capacidadSala,
            datos.idCine,
            datos.tipoSala,
            datos.idSala
          ]);
        }
        return { queHacer, respuBase };
      })
      .then(({ queHacer, respuBase }) => {
        switch (queHacer) {
          case 1:
            res.status(400).json({ respuesta: "No se encontro la sala" });
            break;
          default:
            res.status(200).json(respuBase);
            break;
        }
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Se totió mano" });
      });
  }
}

export default SalaDAO;

import { Response } from "express";
import { Sql_cines } from "../repository/sql_cine";
import Cine from "../entity/Cine";
import pool from "../../../config/connection/db-connection";

class CineDAO {
  protected static async obtenerTodo(params: any, res: Response) {
    try {
      const totalQuery = "SELECT COUNT(*) as total FROM cines";
      const totalResult = await pool.one(totalQuery);

      const cines = await pool.result(Sql_cines.GET_ALL, params);

      res.status(200).json({
        rows: cines.rows,
        total: parseInt(totalResult.total, 10),
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        respuesta: "Error al obtener los cines",
      });
    }
  }

  protected static async obtenerCinesPaginados(limit: number, offset: number, res: Response) {
    try {
      const cines = await pool.any("SELECT * FROM cines ORDER BY nombre_cine LIMIT $1 OFFSET $2", [limit, offset]);
      res.status(200).json(cines);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al consultar cines paginados" });
    }
  }

  protected static async grabaloYa(datos: Cine, res: Response) {
    try {
      const resultado = await pool.one(Sql_cines.ADD, [datos.idUbicacion, datos.nombreCine, datos.telefonoCine]);
  
      res.status(201).json({
        respuesta: "Cine agregado exitosamente",
        datos: resultado,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        respuesta: "Error al insertar el cine",
      });
    }
  }
  
  protected static async borreloYa(idCine: number, res: Response) {
    try {
      const resultado = await pool.result(Sql_cines.DELETE, [idCine]);
      if (resultado.rowCount === 0) {
        return res.status(404).json({ respuesta: "Cine no encontrado" });
      }
      res.status(200).json({ respuesta: "Cine eliminado", info: resultado.rowCount });
    } catch (error) {
      console.error(error);
      res.status(400).json({ respuesta: "Error al eliminar el cine" });
    }
  }

  protected static async modificarCine(datos: Cine, res: Response) {
    await pool
      .task(async (consulta) => {
        // Verificar si el cine existe en la base de datos
        const cineExiste = await consulta.one('SELECT COUNT(*) FROM cines WHERE id_cine = $1', [datos.idCine]);
  
        if (cineExiste.count === '0') {
          return { accion: 1 }; // Cine no encontrado
        }
  
        // Realizar la actualización
        const resultadoBase = await consulta.one(
          `UPDATE cines
           SET nombre_cine = $1, telefono_cine = $2, id_ubicacion = $3
           WHERE id_cine = $4
           RETURNING id_cine, nombre_cine, telefono_cine, id_ubicacion;`,
          [datos.nombreCine, datos.telefonoCine, datos.idUbicacion, datos.idCine]
        );
  
        return { accion: 3, resultadoBase };
      })
      .then(({ accion, resultadoBase }) => {
        switch (accion) {
          case 1:
            res.status(404).json({ respuesta: "Cine no encontrado" });
            break;
          default:
            res.status(200).json(resultadoBase); // Datos actualizados correctamente
            break;
        }
      })
      .catch((error: any) => {
        console.error(error);
        res.status(400).json({ respuesta: "Error al actualizar el cine" });
      });
  }
  
  
}

export default CineDAO;


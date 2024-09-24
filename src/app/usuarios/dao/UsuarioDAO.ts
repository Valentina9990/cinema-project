import { Response } from "express";
import pool from "../../../config/connection/db-connection";
import { SQL_USUARIOS } from "../repository/usuario_sql";
import Usuario from "../entity/Usuario";

class UsuarioDAO{

  protected static async obtenerUsuarios(params: any, res: Response) {
    await pool
      .result(SQL_USUARIOS.GET_ALL, params)
      .then((resultado) => {
        res.status(200).json(resultado.rows);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al obtener los usuarios",
        });
      });
  }

  protected static async agregarUsuario(datos: Usuario, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let accion = 2;
        let resultadoBase: any;
        resultadoBase = await consulta.one(SQL_USUARIOS.ADD, [
          datos.nombreUsuario,
          datos.apellidoUsuario,
          datos.contrasenaUsuario,
          datos.fechaCreacion,
          datos.fechaNacimientoUsuario,
          datos.idCine,
          datos.idCargo,
          datos.emailUsuario
        ]);
        return { accion, resultadoBase };
      })
      .then(({ accion, resultadoBase }) => {
        switch (accion) {
          case 1:
            res.status(400).json({ respuesta: "El usuario ya existe" });
            break;
          default:
            res.status(200).json(resultadoBase);
            break;
        }
      })
      .catch((error: any) => {
        console.log(error);
        res.status(400).json({ respuesta: "Error al insertar el usuario" });
      });
  }

  protected static async eliminarUsuario(datos: Usuario, res: Response): Promise<any> {
    pool
      .task((consulta) => {
        return consulta.result(SQL_USUARIOS.DELETE, [datos.idUsuario]);
      })
      .then((respuesta) => {
        res.status(200).json({
          respuesta: "Usuario eliminado correctamente",
          info: respuesta.rowCount,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ respuesta: "Error al eliminar el usuario" });
      });
  }

  protected static async modificarUsuario(datos: Usuario, res: Response) {
    await pool
      .task(async (consulta) => {
        let accion = 1;
        let resultadoBase: any;
        const cubi = await consulta.one(SQL_USUARIOS.HOW_MANY, [datos.idUsuario]);

        if (cubi.existe > 0) {
          accion = 2;
          resultadoBase = await consulta.one(SQL_USUARIOS.UPDATE, [
            datos.nombreUsuario,
            datos.apellidoUsuario,
            datos.contrasenaUsuario,
            datos.fechaCreacion,
            datos.fechaNacimientoUsuario,
            datos.idCine,
            datos.idCargo,
            datos.emailUsuario,
            datos.idUsuario
          ]);
        }
        return { accion, resultadoBase };
      })
      .then(({ accion, resultadoBase }) => {
        switch (accion) {
          case 1:
            res.status(400).json({ respuesta: "Usuario no encontrado" });
            break;
          default:
            res.status(200).json(resultadoBase);
            break;
        }
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al actualizar el usuario" });
      });
  }
}

export default UsuarioDAO;
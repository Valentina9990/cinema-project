import { Response } from "express";
import pool from "../../../config/connection/db-connection";
import { SQL_USUARIOS } from "../repository/usuario_sql";
import Usuario from "../entity/Usuario";

class UsuarioDAO {
  protected static async obtenerUsuarios(params: any, res: Response) {
    try {
      // Primero, obtener el total de usuarios
      const totalQuery = 'SELECT COUNT(*) as total FROM usuarios';
      const totalResult = await pool.one(totalQuery);
      
      // Luego, obtener los usuarios paginados
      const usuarios = await pool.result(SQL_USUARIOS.GET_ALL, params);
      
      res.status(200).json({
        rows: usuarios.rows,
        total: parseInt(totalResult.total)
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        respuesta: "Error al obtener los usuarios",
      });
    }
  }

  protected static async agregarUsuario(
    datos: Usuario,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        // Primero verificamos si el email ya existe
        const emailExistente = await consulta.one(SQL_USUARIOS.CHECK_EMAIL, [
          datos.emailUsuario,
        ]);

        if (emailExistente.existe > 0) {
          return { accion: 1 }; // Email ya existe
        }

        // Si el email no existe, procedemos a insertar
        const resultadoBase = await consulta.one(SQL_USUARIOS.ADD, [
          datos.nombreUsuario,
          datos.apellidoUsuario,
          datos.contrasenaUsuario,
          datos.fechaCreacion,
          datos.fechaNacimientoUsuario,
          datos.idCine,
          datos.idCargo,
          datos.emailUsuario,
        ]);
        return { accion: 2, resultadoBase };
      })
      .then(({ accion, resultadoBase }) => {
        switch (accion) {
          case 1:
            res.status(400).json({ respuesta: "El email ya está registrado" });
            break;
          case 2:
            res.status(201).json({
              respuesta: "Usuario creado exitosamente",
              id: resultadoBase.id_usuario,
            });
            break;
        }
      })
      .catch((error: any) => {
        console.log(error);
        res.status(400).json({ respuesta: "Error al insertar el usuario" });
      });
  }

  protected static async eliminarUsuario(
    idUsuario: number,
    res: Response
  ): Promise<any> {
    pool
      .task(async (consulta) => {
        const usuarioExiste = await consulta.oneOrNone(SQL_USUARIOS.CHECK_ID, [
          idUsuario,
        ]);

        if (!usuarioExiste || usuarioExiste.existe === 0) {
          return { accion: 1, rowCount: 0 };
        }

        const resultado = await consulta.result(SQL_USUARIOS.DELETE, [
          idUsuario,
        ]);
        return { accion: 2, rowCount: resultado.rowCount };
      })
      .then(({ accion, rowCount }) => {
        switch (accion) {
          case 1:
            res.status(404).json({ respuesta: "Usuario no encontrado" });
            break;
          case 2:
            if (rowCount > 0) {
              res.status(200).json({
                respuesta: "Usuario eliminado correctamente",
                info: rowCount,
              });
            } else {
              res.status(400).json({
                respuesta: "No se pudo eliminar el usuario",
              });
            }
            break;
        }
      })
      .catch((error) => {
        if (error.code === "23503") {
          // Personalizar el mensaje cuando hay una referencia en otra tabla
          res.status(400).json({
            respuesta:
              "No se puede eliminar el usuario porque tiene reservaciones activas.",
          });
        } else {
          // Manejar otros errores de manera genérica
          console.log(error);
          res.status(400).json({ respuesta: "Error al eliminar el usuario" });
        }
      });
  }

  protected static async modificarUsuario(datos: Usuario, res: Response) {
    await pool
      .task(async (consulta) => {
        // Verificar si el usuario existe
        const usuarioExiste = await consulta.one(SQL_USUARIOS.CHECK_ID, [
          datos.idUsuario,
        ]);

        if (usuarioExiste.existe === 0) {
          return { accion: 1 };
        }

        // Obtener el correo actual del usuario en la base de datos
        const usuarioActual = await consulta.oneOrNone(
          "SELECT email_usuario FROM Usuarios WHERE id_usuario = $1",
          [datos.idUsuario]
        );
        console.log("Resultado de usuarioActual:", usuarioActual);

        // Validación para correo actual
        if (!usuarioActual) {
          return { accion: 1 }; // Usuario no encontrado en la base de datos
        }
        console.log("Correo actual del usuario:", usuarioActual.emailUsuario); // Accede a emailUsuario

        // Verificar si el correo ha cambiado
        if (usuarioActual.emailUsuario !== datos.emailUsuario) { // Compara con emailUsuario
          // Si el correo ha cambiado, comprobar si ya existe en otro usuario
          const emailExiste = await consulta.oneOrNone(
            "SELECT id_usuario FROM Usuarios WHERE email_usuario = $1",
            [datos.emailUsuario]
          );
          console.log("Email existe en otro usuario:", emailExiste);

          // Si el correo existe y pertenece a otro usuario, retorna error
          if (emailExiste && emailExiste.id_usuario !== datos.idUsuario) {
            return { accion: 3 };
          }
        }

        // Proceder con la actualización si el correo no ha cambiado o no hay conflicto
        const resultadoBase = await consulta.one(SQL_USUARIOS.UPDATE, [
          datos.nombreUsuario,
          datos.apellidoUsuario,
          datos.contrasenaUsuario,
          datos.fechaCreacion,
          datos.fechaNacimientoUsuario,
          datos.idCine,
          datos.idCargo,
          datos.emailUsuario,
          datos.idUsuario,
        ]);
        return { accion: 2, resultadoBase };
      })
      .then(({ accion, resultadoBase }) => {
        switch (accion) {
          case 1:
            res.status(404).json({ respuesta: "Usuario no encontrado" });
            break;
          case 3:
            res.status(400).json({
              respuesta: "El correo electrónico ya está en uso por otro usuario",
            });
            break;
          default:
            res.status(200).json(resultadoBase);
            break;
        }
      })
      .catch((error: any) => {
        console.log(error);
        res.status(400).json({ respuesta: "Error al actualizar el usuario" });
      });
}


}

export default UsuarioDAO;

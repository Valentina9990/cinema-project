import { Response, Request } from "express";
import UsuarioDAO from "../dao/UsuarioDAO";
import Usuario from "../entity/Usuario";
import bcrypt from "bcrypt";

class UsuarioControlador extends UsuarioDAO {
  public obtenerUsuarios(req: Request, res: Response) {
    UsuarioDAO.obtenerUsuarios([], res);
  }

  public async agregarUsuario(req: Request, res: Response): Promise<void> {
    const rondasSal = 10;
    const contrasenaEncriptada = await bcrypt.hash(req.body.contrasena_usuario, rondasSal);

    const nuevoUsuario: Usuario = new Usuario(
      0,
      req.body.nombre_usuario,
      req.body.apellido_usuario,
      contrasenaEncriptada,
      req.body.email_usuario,
      new Date(),
      req.body.fecha_nacimiento_usuario,
      req.body.id_cine,
      req.body.id_cargo
    );

    UsuarioDAO.agregarUsuario(nuevoUsuario, res);
  }

  public eliminarUsuario(req: Request, res: Response): void {
    if (isNaN(Number(req.params.idUsuario))) {
      res.status(400).json({ respuesta: "ID de usuario inválido" });
    } else {
      const idUsuario = Number(req.params.idUsuario);
      const usuarioAEliminar: Usuario = new Usuario(
        idUsuario,
        "",
        "",
        "",
        "",
        new Date(),
        new Date(),
        0,
        0
      );
      UsuarioDAO.eliminarUsuario(usuarioAEliminar, res);
    }
  }

  public async modificarUsuario(req: Request, res: Response): Promise<void> {
    let contrasenaEncriptada = req.body.contrasena_usuario;

    if (req.body.contrasena_usuario) {
      const rondasSal = 10;
      contrasenaEncriptada = await bcrypt.hash(req.body.contrasena_usuario, rondasSal);
    }
  
    const usuarioModificado: Usuario = new Usuario(
      req.body.id_usuario,
      req.body.nombre_usuario,
      req.body.apellido_usuario,
      contrasenaEncriptada,
      req.body.email_usuario,
      new Date(req.body.fecha_creacion),
      req.body.fecha_nacimiento_usuario,
      req.body.id_cine,
      req.body.id_cargo
    );
  
    UsuarioDAO.modificarUsuario(usuarioModificado, res);
  }
  
}

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;

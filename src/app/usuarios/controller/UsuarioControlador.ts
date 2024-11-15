import { Response, Request } from "express";
import UsuarioDAO from "../dao/UsuarioDAO";
import Usuario from "../entity/Usuario";

class UsuarioControlador extends UsuarioDAO {
  public obtenerUsuarios(req: Request, res: Response) {
    const { limit = 100, offset = 0 } = req.query;
    const params = [Number(limit), Number(offset)];

    UsuarioDAO.obtenerUsuarios(params, res);
  }
  
  public async agregarUsuario(req: Request, res: Response): Promise<void> {
    const nuevoUsuario: Usuario = new Usuario(
      null, 
      req.body.nombre_usuario,
      req.body.apellido_usuario,
      req.body.contrasena_usuario,
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
      UsuarioDAO.eliminarUsuario(idUsuario, res);
    }
  }

  public async modificarUsuario(req: Request, res: Response): Promise<void> {
    const usuarioModificado: Usuario = new Usuario(
      Number(req.body.id_usuario),
      req.body.nombre_usuario,
      req.body.apellido_usuario,
      req.body.contrasena_usuario,
      req.body.email_usuario,
      new Date(req.body.fecha_creacion),
      new Date(req.body.fecha_nacimiento_usuario),
      Number(req.body.id_cine),
      Number(req.body.id_cargo)
    );

    UsuarioDAO.modificarUsuario(usuarioModificado, res);
  }
}

const usuarioControlador = new UsuarioControlador();
export default usuarioControlador;

import { Router } from "express";
import usuarioControlador from "../controller/UsuarioControlador";

class UsuarioRuta{
    public apiRutaUsuario: Router;

    constructor(){
        this.apiRutaUsuario = Router();
        this.apiRutaUsuario.get("/", usuarioControlador.obtenerUsuarios);
        this.apiRutaUsuario.post("/", usuarioControlador.agregarUsuario);
        this.apiRutaUsuario.delete("/:idUsuario", usuarioControlador.eliminarUsuario);
        this.apiRutaUsuario.put("/", usuarioControlador.modificarUsuario);
    }
}


const usuarioRuta = new UsuarioRuta().apiRutaUsuario; 
export default usuarioRuta;

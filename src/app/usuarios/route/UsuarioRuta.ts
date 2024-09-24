import { Router } from "express";
import usuarioControlador from "../controller/UsuarioControlador";

class UsuarioRuta{
    public apiRutaUsuario: Router;

    constructor(){
        this.apiRutaUsuario = Router();
        this.apiRutaUsuario.get("/usuarios", usuarioControlador.obtenerUsuarios);
        this.apiRutaUsuario.post("/usuarios", usuarioControlador.agregarUsuario);
        this.apiRutaUsuario.delete("/usuarios/:idUsuario", usuarioControlador.eliminarUsuario);
        this.apiRutaUsuario.put("/usuarios/:idUsuario", usuarioControlador.modificarUsuario);
    }
}


const usuarioRuta = new UsuarioRuta().apiRutaUsuario; 
export default usuarioRuta;

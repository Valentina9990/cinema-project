import cors from "cors";
import express from "express";
import morgan from "morgan";
import apiFuncionRuta from "../../app/funciones/route/FuncionRuta";
import apiPeliculaRuta from "../../app/peliculas/route/PeliculaRuta";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import apiUsuarioRuta from "../../app/usuarios/route/UsuarioRuta";

class Servidor{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndpoint();
        
    }

    public exponerEndpoint():void {
        this.app.use("/api/room", apiSalaRuta);
        this.app.use("/api/users", apiUsuarioRuta); 
        this.app.use("/api/shows", apiFuncionRuta)  
        this.app.use("/api/movies", apiPeliculaRuta)
    }
    
    public cargarConfiguracion():void {
        this.app.set("PORT",3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        this.app.use(cors({
                origin:"*",
                methods:["GET","POST","PUT","DELETE"],
                allowedHeaders:["Content-Type","Authorization"]
            }));
        //tamaño maximo archivo
        this.app.use(express.json({limit:"50mb"}));
        //para que soporte la cantidad de caracteres URL
        this.app.use(express.urlencoded({extended:true}));
    }

    public iniciar():void{
        this.app.listen(this.app.get("PORT"),()=> {
            console.log(`Servidor iniciado en el puerto ${this.app.get("PORT")}`);
        });
    }
}

export default Servidor;
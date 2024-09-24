import cors from "cors";
import express from "express";
import morgan from "morgan";
import apiFuncionRuta from "../../app/funciones/route/FuncionRuta";
import apiSalaRuta from "../../app/salas/route/SalaRuta";

class Servidor{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndpoint();
        
    }

    public exponerEndpoint():void {
        this.app.use("/room", apiSalaRuta)
        this.app.use("/shows", apiFuncionRuta)
    }
    
    public cargarConfiguracion():void {
        this.app.set("PORT",3123);
        this.app.use(cors());
        this.app.use(morgan("dev"));
        //tamaño maximo archivo
        this.app.use(express.json({limit:"50mb"}));
        //para que soporte la cantidad de caracteres URL
        this.app.use(express.urlencoded({extended:true}));
    }

    public iniciar():void{
        this.app.listen(this.app.get("PORT"),()=> {
            //console.log("Listo me fui", this.app.get("PORT"));
            console.log(`Servidor iniciado en el puerto ${this.app.get("PORT")}`);
        });
    }
}

export default Servidor;
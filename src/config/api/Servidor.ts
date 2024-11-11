import cors from "cors";
import  express  from "express";
import morgan from "morgan";
import apiSalaRuta from "../../app/salas/route/SalaRuta";
import apicomidaRuta from "../../app/comida/route/comidaRuta";
import apiMenu_CineRuta from "../../app/menu_cine/route/menu_cineRuta";

class Servidor{
    public app: express.Application;

    constructor(){
        this.app = express();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }
    
    public cargarConfiguracion():void {
        this.app.set("PORT",3123);    
        this.app.use(cors());
        this.app.use(morgan("dev"));
        //tamaño maximo de archivo
        this.app.use(express.json({limit:"50mb"})); 
        //para que soporte la cantidad de caracteres URL
        this.app.use(express.urlencoded({extended:true}));
    }

    public exponerEndPoint():void {
        this.app.use("/room",apiSalaRuta);
        this.app.use("/meal",apicomidaRuta);
        this.app.use("/menu",apiMenu_CineRuta);
    }

    public iniciar():void{
        this.app.listen(this.app.get("PORT"),()=>{
            console.log("Listo me fui",this.app.get("PORT"));
        });
    }

}


export default Servidor;


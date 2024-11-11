import { Router } from "express";
import menu_cineControlador from "../controller/menu_cineControlador";
import menu from "../entity/menu_cine";
import menu_CineControlador from "../controller/menu_cineControlador";
import comidaControlador from "../../comida/controller/comidaControlador";

class menu_cineRuta{
    public apiMenu_CineRuta: Router;
    constructor(){
        this.apiMenu_CineRuta = Router();
        this.apiMenu_CineRuta.get("/getall",menu_CineControlador.dameMenu_cine);
        this.apiMenu_CineRuta.post("/addMenu",menu_CineControlador.cogeTuMenu);
        this.apiMenu_CineRuta.delete("/delete/:idMenuCine",menu_CineControlador.borrarTuComida);
        this.apiMenu_CineRuta.put("/update",menu_CineControlador.actualizaTuMenu);
        this.apiMenu_CineRuta.get("/page",menu_CineControlador.obtenerMenuPaginadas);
    }
    

}
const menu_CineRuta = new menu_cineRuta().apiMenu_CineRuta;
export default menu_CineRuta;
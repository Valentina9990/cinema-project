"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const menu_cineControlador_1 = __importDefault(require("../controller/menu_cineControlador"));
class menu_cineRuta {
    constructor() {
        this.apiMenu_CineRuta = (0, express_1.Router)();
        this.apiMenu_CineRuta.get("/getall", menu_cineControlador_1.default.dameMenu_cine);
        this.apiMenu_CineRuta.post("/addMenu", menu_cineControlador_1.default.cogeTuMenu);
        this.apiMenu_CineRuta.delete("/delete/:idMenuCine", menu_cineControlador_1.default.borrarTuComida);
        this.apiMenu_CineRuta.put("/update", menu_cineControlador_1.default.actualizaTuMenu);
        this.apiMenu_CineRuta.get("/page", menu_cineControlador_1.default.obtenerMenuPaginadas);
    }
}
const menu_CineRuta = new menu_cineRuta().apiMenu_CineRuta;
exports.default = menu_CineRuta;

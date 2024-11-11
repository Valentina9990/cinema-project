"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comidaControlador_1 = __importDefault(require("../controller/comidaControlador"));
class ComidaRuta {
    constructor() {
        this.apiRutaComida = (0, express_1.Router)();
        this.apiRutaComida.get("/getall", comidaControlador_1.default.dameComida);
        this.apiRutaComida.post("/addFood", comidaControlador_1.default.cogeTuComida);
        this.apiRutaComida.delete("/delete/:idComida", comidaControlador_1.default.borrarTuComida);
        this.apiRutaComida.put("/update", comidaControlador_1.default.actualizaTuComida);
        this.apiRutaComida.get("/page", comidaControlador_1.default.obtenerComidasPaginadas);
    }
}
const comidaRuta = new ComidaRuta().apiRutaComida;
exports.default = comidaRuta;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PeliculaControlador_1 = __importDefault(require("../controller/PeliculaControlador"));
class PeliculaRuta {
    constructor() {
        this.apiRutaPelicula = (0, express_1.Router)();
        this.apiRutaPelicula.get("/getall", PeliculaControlador_1.default.damePeliculas);
    }
}
const peliculaRuta = new PeliculaRuta().apiRutaPelicula;
exports.default = peliculaRuta;

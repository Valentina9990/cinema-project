"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pelicula_1 = __importDefault(require("../entity/Pelicula"));
const PeliculaDAO_1 = __importDefault(require("../dao/PeliculaDAO"));
class PeliculaControlador extends PeliculaDAO_1.default {
    damePeliculas(req, res) {
        PeliculaDAO_1.default.obtenerTodo([], res);
    }
    cogeTuPelicula(req, res) {
        const objPel = new Pelicula_1.default(0, "", 0, 0, "");
        objPel.nombrePelicula = req.body.nombrePelicula;
        objPel.idGenero = req.body.idGenero;
        objPel.duracionPelicula = req.body.duracionPelicula;
        objPel.idioma = req.body.idioma;
        PeliculaDAO_1.default.grabeloYa(objPel, res);
    }
    paginaPeliculas(req, res) {
        const limit = parseInt(req.query.limit); // Default limit to 10
        const offset = parseInt(req.query.offset); // Default offset to 0
        PeliculaDAO_1.default.ObtenerConPaginacion({ limit, offset }, res);
    }
    borraTuPelicula(req, res) {
        if (isNaN(Number(req.params.idPelicula))) {
            res.status(400).json({ respuesta: "¿Y el codigo?" });
        }
        else {
            const codigo = Number(req.params.idPelicula);
            const objCubi = new Pelicula_1.default(codigo, "", 0, 0, "");
            PeliculaDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuPelicula(req, res) {
        const objCubi = new Pelicula_1.default(0, "", 0, 0, "");
        objCubi.idPelicula = req.body.idPelicula;
        objCubi.nombrePelicula = req.body.nombrePelicula;
        objCubi.idGenero = req.body.idGenero;
        objCubi.duracionPelicula = req.body.duracionPelicula;
        objCubi.idioma = req.body.idioma;
        PeliculaDAO_1.default.actualiceloYa(objCubi, res);
    }
    actualizaTodasLasPeliculas(req, res) {
        const objCubi = new Pelicula_1.default(0, "", 0, 0, "");
        objCubi.idioma = req.body.idioma;
        PeliculaDAO_1.default.actualizaTodo(objCubi, res);
    }
}
const peliculaControlador = new PeliculaControlador();
exports.default = peliculaControlador;
